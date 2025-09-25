// src/styles/game-constants.ts
// All dimensions are in pixels unless otherwise specified.
// Game Area
export const GAME_WIDTH = 500;
export const GAME_HEIGHT = 800;
// Bird
export const BIRD_SIZE = 30;
export const BIRD_START_X = GAME_WIDTH / 4;
export const BIRD_START_Y = GAME_HEIGHT / 2;
// Physics
export const GRAVITY = 0.5;
export const JUMP_STRENGTH = -8;
// Pipes
export const PIPE_WIDTH = 80;
export const PIPE_GAP = 200;
export const PIPE_SPEED = -3;
export const PIPE_SPAWN_FRAME_COUNT = 100; // Spawn a new pipe every 100 frames