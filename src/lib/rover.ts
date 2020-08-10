import {Direction, validDirections} from './valid-directions';
import {MarsGrid} from './grid';
import {Coordinate} from './types';

export default class Rover {
  private position: Coordinate;
  private direction: Direction;
  private grid: MarsGrid;
  private lost: string;

  constructor(position, direction, grid) {
    this.position = position;
    this.direction = direction;
    this.grid = grid;
    this.lost = '';
  }

  public command(commandString: string): string {
    for (const command of commandString) {
      if (command === 'F') {
        this.attemptMove();
        if (this.lost === ' LOST') {
          break;
        }
      } else if (command === 'L') {
        this.turn(-1);
      } else if (command === 'R') {
        this.turn(1);
      }
    }
    return `${this.position[0]} ${this.position[1]} ${this.direction}${this.lost}`;
  }

  private turn(turnDirection: number): void {
    const directionsList = Object.keys(validDirections) as Direction[];
    const currentDirectionIndex = directionsList.indexOf(this.direction);
    const directionsListLength = directionsList.length;
    // Access directionsList array in a circular manner using modular arithmetic
    const newDirectionIndex =
      (currentDirectionIndex + directionsListLength + turnDirection) %
      directionsListLength;
    this.direction = directionsList[newDirectionIndex];
  }

  private attemptMove(): void {
    const newPosition = this.getNewPosition();
    if (this.isLost(newPosition)) {
      if (this.hasScent(this.position)) {
        return;
      } else {
        this.grid.addScent(this.position);
        this.lost = ' LOST';
      }
    } else {
      this.position = newPosition;
    }
  }

  private getNewPosition(): Coordinate {
    const moveCommand = validDirections[this.direction].move;
    return this.position.map(
      (value, i) => value + moveCommand[i]
    ) as Coordinate;
  }

  private hasScent(position: Coordinate): boolean {
    const scentList = JSON.stringify(this.grid.scents);
    const currentPosition = JSON.stringify(position);
    return scentList.indexOf(currentPosition) !== -1;
  }

  private isLost(position: Coordinate): boolean {
    return position.some((value, i) => 0 > value || value > this.grid.size[i]);
  }
}
