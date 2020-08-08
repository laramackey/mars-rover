export default class Rover {
  private posX: number;
  private posY: number;
  private direction: string;

  constructor(posX, posY, direction) {
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
  }

  public command(commandString: string) {
    [...commandString].forEach((command) => {
      if (command === 'F') {
        this.move();
      } else if (command in ['L', 'R']) {
        this.turn(command);
      }
    });
    return `${this.posX} ${this.posY} ${this.direction}`;
  }

  private move(): void {
    switch(this.direction) {
        case 'N':
            this.posY += 1;
            break;
        case 'E':
            this.posX += 1;
            break;
        case 'S':
            this.posY -= 1;
            break;
        case 'W':
            this.posX -= 1;
            break;
        default:
            throw new Error('Rover does not have a valid direction');
        }
  }
  private turn(turnDirection) {
    return;
  }
}
