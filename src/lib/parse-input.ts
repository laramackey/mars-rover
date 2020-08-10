import {validDirections, Direction} from './valid-directions';

export default function(input: string): ParsedInput {
  const inputArray = input.split('\n');
  const gridInputs = parseGrid(inputArray[0]);
  const roversInputs = parseRovers(inputArray.slice(1));
  return {
    gridInputs,
    roversInputs,
  };
}

function parseGrid(gridString: string): ParsedGrid {
  const gridArray = gridString.split(' ');
  if (gridArray.length !== 2) {
    throw new Error('Must have two arguments for the grid coordinate size');
  }
  const sizeX = Number(gridArray[0]);
  const sizeY = Number(gridArray[1]);
  if (isNaN(sizeX) || isNaN(sizeY)) {
    throw new Error('Grid coordinates must be numbers');
  }
  if (sizeX > 50 || sizeY > 50) {
    throw new Error('Maximum value for grid coordinates is 50');
  }
  return {
    sizeX,
    sizeY,
  };
}

function parseRovers(roverArray: string[]): ParsedRovers {
  if (roverArray.length % 2 === 1) {
    throw new Error('Must have an even number of lines for Robot Instructions');
  }
  const parsedRovers = [];
  for (let i = 0; i < roverArray.length; i++) {
    if (i % 2 === 0) {
      const robotInput = roverArray[i].split(' ');
      if (robotInput.length !== 3) {
        throw new Error(
          'Must have three arguments for the rover starting position'
        );
      }
      const startX = Number(robotInput[0]);
      const startY = Number(robotInput[1]);
      const direction = robotInput[2] as Direction;
      const command = roverArray[i + 1];
      if (command.length > 100) {
        throw new Error('Maximum command length is 100');
      }
      if (isNaN(startX) || isNaN(startY)) {
        throw new Error('Rover start coordinates must be numbers');
      }
      if (!Object.keys(validDirections).includes(direction)) {
        throw new Error(`${direction} is not a valid rover starting direction`);
      }
      parsedRovers.push({
        startPosition: [startX, startY],
        direction,
        command,
      });
    }
  }
  return parsedRovers;
}

interface ParsedInput {
  gridInputs: ParsedGrid;
  roversInputs: ParsedRovers;
}

interface ParsedGrid {
  sizeX: number;
  sizeY: number;
}

type ParsedRovers = Array<{
  startPosition: [number, number];
  direction: Direction;
  command: string;
}>;
