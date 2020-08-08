export default class Rover {
  private posX: number;
  private posY: number;
  private direction: string;
  private validDirections: string[];

  constructor(posX, posY, direction) {
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
    this.validDirections = ['N', 'E', 'S', 'W'];
  }

  public command(commandString: string) {
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
    switch (this.direction) {
      case 'N':
        this.posY++;
        break;
      case 'E':
        this.posX++;
        break;
      case 'S':
        this.posY--;
        break;
      case 'W':
        this.posX--;
        break;
      default:
        throw new Error('Rover does not have a valid direction');
    }
  }
  private turn(turnDirection: number): void {
    const currentDirectionIndex = this.validDirections.indexOf(this.direction);
    const directionsArrayLength = this.validDirections.length;
    // Access directions array in a circular manner using modular arithmetic
    const newDirectionIndex =
      (currentDirectionIndex + directionsArrayLength + turnDirection) %
      directionsArrayLength;
    this.direction = this.validDirections[newDirectionIndex];
  }
}
