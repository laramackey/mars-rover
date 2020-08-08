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
    commandString.split(' ').forEach((command) => {
      if (command === 'F') {
        this.move();
      } else if (command in ['L', 'R']) {
        this.turn(command);
      }
    });
    return `${this.posX} ${this.posY} ${this.direction}`;
  }

  private move() {
    return;
  }
  private turn(turnDirection) {
    return;
  }
}
