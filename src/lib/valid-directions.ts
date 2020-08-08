export const validDirections = {
  N: {moveX: 0, moveY: 1},
  E: {moveX: 1, moveY: 0},
  S: {moveX: 0, moveY: -1},
  W: {moveX: -1, moveY: 0},
};

export type Direction = 'N' | 'E' | 'S' | 'W';
