import {Direction, validDirections} from './valid-directions';
import {MarsGrid} from './grid';

export default class Rover {
  private posX: number;
  private posY: number;
  private direction: Direction;
  private grid: MarsGrid;
  private lost: string;

  constructor(posX, posY, direction, grid) {
    this.posX = posX;
    this.posY = posY;
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
    return `${this.posX} ${this.posY} ${this.direction}${this.lost}`;
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
    const [newX, newY] = this.getNewPosition();
    if (this.isLost(newX, newY)) {
      if (this.hasScent(this.posX, this.posY)) {
        return;
      } else {
        this.grid.addScent([this.posX, this.posY]);
        this.lost = ' LOST';
      }
    } else {
      this.move(newX, newY);
    }
  }

  private move(newX, newY): void {
    this.posX = newX;
    this.posY = newY;
  }

  private getNewPosition(): number[] {
    const moveCommand = validDirections[this.direction];
    const newX = this.posX + moveCommand.moveX;
    const newY = this.posY + moveCommand.moveY;
    return [newX, newY];
  }

  private hasScent(newX, newY): boolean {
    const scentList = JSON.stringify(this.grid.scents);
    const currentPosition = JSON.stringify([newX, newY]);
    return scentList.indexOf(currentPosition) !== -1;
  }

  private isLost(newX, newY): boolean {
    return (
      0 > newX || newX > this.grid.sizeX || 0 > newY || newY > this.grid.sizeY
    );
  }
}
