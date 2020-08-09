import Rover from './lib/rover';
import {Grid} from './lib/grid';

const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

const inputArray = input.split('\n');
const gridInput = inputArray[0].split(' ');
const robotInstructions = inputArray.slice(1);

const grid = new Grid(gridInput[0], gridInput[1]);
let output = '';

for (let i = 0; i < robotInstructions.length; i++) {
  if (i % 2 === 0) {
    const robotInput = robotInstructions[i].split(' ');
    const rover = new Rover(
      Number(robotInput[0]),
      Number(robotInput[1]),
      robotInput[2],
      grid
    );
    const result = rover.command(robotInstructions[i + 1]);
    output += `${result}\n`;
  }
}

// tslint:disable-next-line: no-console
console.log(output);
