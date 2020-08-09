import Rover from './lib/rover';
import {Grid} from './lib/grid';
import parseInput from './lib/parse-input';

const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

const {gridInputs, roversInputs} = parseInput(input);

const grid = new Grid(gridInputs.sizeX, gridInputs.sizeY);
let output = '';

roversInputs.forEach((roverInput) => {
  const rover = new Rover(
    roverInput.startX,
    roverInput.startY,
    roverInput.direction,
    grid
  );
  const result = rover.command(roverInput.command);
  output += `${result}\n`;
});

// tslint:disable-next-line: no-console
console.log(output);
