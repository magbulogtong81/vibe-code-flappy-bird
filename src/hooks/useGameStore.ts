import { create } from 'zustand';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  BIRD_SIZE,
  BIRD_START_X,
  BIRD_START_Y,
  GRAVITY,
  JUMP_STRENGTH,
  PIPE_WIDTH,
  PIPE_GAP,
  PIPE_SPEED,
  PIPE_SPAWN_FRAME_COUNT,
} from '@/styles/game-constants';
export interface Bird {
  x: number;
  y: number;
  velocityY: number;
}
export interface Pipe {
  id: number;
  x: number;
  topHeight: number;
  scored: boolean;
}
export type GameStatus = 'idle' | 'playing' | 'gameOver';
export interface GameState {
  status: GameStatus;
  bird: Bird;
  pipes: Pipe[];
  score: number;
  highScore: number;
  frameCount: number;
}
export interface GameActions {
  startGame: () => void;
  flap: () => void;
  runGameLoop: () => void;
  loadHighScore: () => void;
}
const initialState: Omit<GameState, 'highScore'> = {
  status: 'idle',
  bird: {
    x: BIRD_START_X,
    y: BIRD_START_Y,
    velocityY: 0,
  },
  pipes: [],
  score: 0,
  frameCount: 0,
};
export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,
  highScore: 0,
  loadHighScore: () => {
    const storedHighScore = localStorage.getItem('flappy-funster-highscore');
    if (storedHighScore) {
      set({ highScore: parseInt(storedHighScore, 10) });
    }
  },
  startGame: () => {
    // Preserve high score when starting a new game
    set(state => ({
      ...initialState,
      highScore: state.highScore, // Keep existing high score
      status: 'playing',
    }));
  },
  flap: () => {
    const { status, bird } = get();
    if (status === 'playing') {
      set({
        bird: {
          ...bird,
          velocityY: JUMP_STRENGTH,
        },
      });
    }
  },
  runGameLoop: () => {
    const { status, bird, pipes, score, highScore } = get();
    if (status !== 'playing') return;
    // --- Bird Physics ---
    const newVelocityY = bird.velocityY + GRAVITY;
    const newBirdY = bird.y + newVelocityY;
    // --- Pipe Logic ---
    let newPipes = pipes
      .map(pipe => ({ ...pipe, x: pipe.x + PIPE_SPEED }))
      .filter(pipe => pipe.x > -PIPE_WIDTH);
    const newFrameCount = get().frameCount + 1;
    if (newFrameCount % PIPE_SPAWN_FRAME_COUNT === 0) {
      const topHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 200) + 100;
      newPipes.push({ id: Date.now(), x: GAME_WIDTH, topHeight, scored: false });
    }
    // --- Scoring ---
    let newScore = score;
    newPipes.forEach(pipe => {
      if (!pipe.scored && pipe.x + PIPE_WIDTH < bird.x) {
        pipe.scored = true;
        newScore++;
      }
    });
    // --- Collision Detection ---
    let isGameOver = false;
    // Ground and Ceiling collision
    if (
      newBirdY + BIRD_SIZE / 2 > GAME_HEIGHT ||
      newBirdY - BIRD_SIZE / 2 < 0
    ) {
      isGameOver = true;
    }
    // Pipe collision
    for (const pipe of newPipes) {
      const birdRight = bird.x + BIRD_SIZE / 2;
      const birdLeft = bird.x - BIRD_SIZE / 2;
      const birdTop = newBirdY - BIRD_SIZE / 2;
      const birdBottom = newBirdY + BIRD_SIZE / 2;
      const pipeRight = pipe.x + PIPE_WIDTH;
      const pipeLeft = pipe.x;
      const pipeTopEnd = pipe.topHeight;
      const pipeBottomStart = pipe.topHeight + PIPE_GAP;
      if (
        birdRight > pipeLeft &&
        birdLeft < pipeRight &&
        (birdTop < pipeTopEnd || birdBottom > pipeBottomStart)
      ) {
        isGameOver = true;
        break;
      }
    }
    if (isGameOver) {
      if (newScore > highScore) {
        localStorage.setItem('flappy-funster-highscore', newScore.toString());
        set({ highScore: newScore });
      }
      set({ status: 'gameOver' });
      return;
    }
    set({
      bird: { ...bird, y: newBirdY, velocityY: newVelocityY },
      pipes: newPipes,
      score: newScore,
      frameCount: newFrameCount,
    });
  },
}));