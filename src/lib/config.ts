export const config = {
  validDirections: {
    N: {move: [0, 1]},
    E: {move: [1, 0]},
    S: {move: [0, -1]},
    W: {move: [-1, 0]},
  },
  inputParser: {
    maxCommandLength: 99,
    validRoverCommands: 'FLR',
    maxGridSize: 50,
  },
};
