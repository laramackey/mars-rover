import Rover from './rover';
import {Grid} from './grid';
import parseInput from './parse-input';

export default function(input: string): string {
  const {gridInputs, roversInputs} = parseInput(input);

  const grid = new Grid(gridInputs.sizeX, gridInputs.sizeY);
  let output = '';

  roversInputs.forEach((roverInput) => {
    const rover = new Rover(
      roverInput.startPosition,
      roverInput.direction,
      grid
    );
    const result = rover.command(roverInput.command);
    output += `${result}\n`;
  });
  return output.replace(/\n$/, '');
}
