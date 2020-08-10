export const validDirections = {
  N: {move: [0, 1]},
  E: {move: [1, 0]},
  S: {move: [0, -1]},
  W: {move: [-1, 0]},
};

export type Direction = 'N' | 'E' | 'S' | 'W';
