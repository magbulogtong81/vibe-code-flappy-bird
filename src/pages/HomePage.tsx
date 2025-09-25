import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useGameStore, Bird, Pipe } from '@/hooks/useGameStore';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  BIRD_SIZE,
  PIPE_WIDTH,
  PIPE_GAP,
} from '@/styles/game-constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RotateCw } from 'lucide-react';
const BirdComponent: React.FC<{ bird: Bird }> = React.memo(({ bird }) => {
  const rotation = Math.min(Math.max(-25, bird.velocityY * 5), 90);
  return (
    <div
      className="absolute bg-funster-bird rounded-full flex items-center justify-center transition-transform duration-100"
      style={{
        left: bird.x - BIRD_SIZE / 2,
        top: bird.y - BIRD_SIZE / 2,
        width: BIRD_SIZE,
        height: BIRD_SIZE,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="w-2 h-2 bg-gray-900 rounded-full ml-2 mb-1"></div>
    </div>
  );
});
const PipeComponent: React.FC<{ pipe: Pipe }> = React.memo(({ pipe }) => (
  <>
    {/* Top Pipe */}
    <div
      className="absolute bg-funster-pipe border-2 border-gray-800 rounded-md"
      style={{
        left: pipe.x,
        top: 0,
        width: PIPE_WIDTH,
        height: pipe.topHeight,
      }}
    />
    {/* Bottom Pipe */}
    <div
      className="absolute bg-funster-pipe border-2 border-gray-800 rounded-md"
      style={{
        left: pipe.x,
        top: pipe.topHeight + PIPE_GAP,
        width: PIPE_WIDTH,
        height: GAME_HEIGHT - pipe.topHeight - PIPE_GAP,
      }}
    />
  </>
));
const GameUI: React.FC = () => {
  const status = useGameStore((state) => state.status);
  const score = useGameStore((state) => state.score);
  const highScore = useGameStore((state) => state.highScore);
  const startGame = useGameStore((state) => state.startGame);
  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.2 } },
  };
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      {status === 'playing' && (
        <div className="absolute top-12 text-6xl font-display font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          {score}
        </div>
      )}
      <AnimatePresence>
        {status === 'idle' && (
          <motion.div
            key="start-screen"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center pointer-events-auto"
          >
            <h1 className="text-8xl font-display font-extrabold text-white mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>
              Flappy Funster
            </h1>
            <Button
              size="lg"
              onClick={startGame}
              className="px-8 py-6 text-2xl font-bold shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              <Play className="mr-2 h-8 w-8" /> Play
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {status === 'gameOver' && (
          <motion.div
            key="game-over-screen"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto"
          >
            <Card className="w-80 text-center shadow-2xl border-4 border-gray-800">
              <CardHeader>
                <CardTitle className="text-4xl font-display font-bold">Game Over</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-around text-lg">
                  <div>
                    <p className="font-semibold text-muted-foreground">Score</p>
                    <p className="text-4xl font-bold font-display">{score}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">High Score</p>
                    <p className="text-4xl font-bold font-display">{highScore}</p>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={startGame}
                  className="w-full py-6 text-xl font-bold transform hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <RotateCw className="mr-2 h-6 w-6" /> Play Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const GameElements = React.memo(() => {
  const bird = useGameStore((state) => state.bird);
  const pipes = useGameStore((state) => state.pipes);
  return (
    <>
      <BirdComponent bird={bird} />
      {pipes.map((pipe) => (
        <PipeComponent key={pipe.id} pipe={pipe} />
      ))}
    </>
  );
});
export function HomePage() {
  const status = useGameStore((state) => state.status);
  const flap = useGameStore((state) => state.flap);
  const runGameLoop = useGameStore((state) => state.runGameLoop);
  const loadHighScore = useGameStore((state) => state.loadHighScore);
  const startGame = useGameStore((state) => state.startGame);
  const gameLoopRef = useRef<number>();
  useEffect(() => {
    loadHighScore();
  }, [loadHighScore]);
  useEffect(() => {
    const loop = () => {
      runGameLoop();
      gameLoopRef.current = requestAnimationFrame(loop);
    };
    if (status === 'playing') {
      gameLoopRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [status, runGameLoop]);
  const handleUserAction = useCallback((e?: React.PointerEvent | KeyboardEvent) => {
    if (e) e.preventDefault();
    if (status === 'playing') {
      flap();
    } else if (status === 'idle' || status === 'gameOver') {
      startGame();
    }
  }, [status, flap, startGame]);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleUserAction();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleUserAction]);
  return (
    <div className="w-screen h-screen bg-background flex items-center justify-center font-sans">
      <div
        className="relative bg-funster-sky overflow-hidden touch-none"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onPointerDown={handleUserAction}
      >
        <GameElements />
        <GameUI />
      </div>
    </div>
  );
}