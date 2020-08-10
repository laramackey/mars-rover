import {config} from './config';
import {Coordinate, Direction} from './types';

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
  if (sizeX > config.inputParser.maxGridSize || sizeY > config.inputParser.maxGridSize) {
    throw new Error(`Maximum value for grid coordinates is ${config.inputParser.maxGridSize}`);
  }
  return {
    size: [sizeX, sizeY],
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
      const command = roverArray[i + 1].toUpperCase();
      if (command.length > config.inputParser.maxCommandLength) {
        throw new Error(`Maximum command length is ${config.inputParser.maxCommandLength}`);
      }
      const commandMatch = new RegExp(`(?![${config.inputParser.validRoverCommands}]).`, 'g');
      if (command.match(commandMatch) !== null) {
        throw new Error(`Only the follolwing are valid rover commands: ${config.inputParser.validRoverCommands}`);
      }
      if (isNaN(startX) || isNaN(startY)) {
        throw new Error('Rover start coordinates must be numbers');
      }
      if (!Object.keys(config.validDirections).includes(direction)) {
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
  size: Coordinate;
}

type ParsedRovers = Array<{
  startPosition: Coordinate;
  direction: Direction;
  command: string;
}>;
