import Rover from './rover';
import {Grid} from './grid';
import {parseInput, ValidationError} from './parse-input';

export default function(input: string): string {
  let output = '';
  try {
    const {gridInputs, roversInputs} = parseInput(input);
    const grid = new Grid(gridInputs.size);
    roversInputs.forEach(roverInput => {
      const rover = new Rover(
        roverInput.startPosition,
        roverInput.direction,
        grid
      );
      const result = rover.command(roverInput.command);
      output += `${result}\n`;
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      output = `Oops invalid input: ${err.message}, bye!`;
    } else {
      throw err;
    }
  }
  return output.replace(/\n$/, '');
}
