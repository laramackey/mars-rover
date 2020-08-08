import {Direction, validDirections} from './valid-directions';

export default class Rover {
  private posX: number;
  private posY: number;
  private direction: Direction;

  constructor(posX, posY, direction) {
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
  }

  public command(commandString: string): string {
    [...commandString].forEach((command) => {
      if (command === 'F') {
        this.move();
      } else if (command === 'L') {
        this.turn(-1);
      } else if (command === 'R') {
        this.turn(1);
      }
    });
    return `${this.posX} ${this.posY} ${this.direction}`;
  }

  private move(): void {
    const moveCommand = validDirections[this.direction];
    this.posX += moveCommand.moveX;
    this.posY += moveCommand.moveY;
  }
  private turn(turnDirection: number): void {
    const directionsList = Object.keys(validDirections) as Direction[];
    const currentDirectionIndex = directionsList.indexOf(this.direction);
    const directionsArrayLength = directionsList.length;
    // Access directionsList array in a circular manner using modular arithmetic
    const newDirectionIndex =
      (currentDirectionIndex + directionsArrayLength + turnDirection) %
      directionsArrayLength;
    this.direction = directionsList[newDirectionIndex];
  }
}
