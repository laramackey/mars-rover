export default class Grid {
  public sizeX: number;
  public sizeY: number;

  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
}

export interface MarsGrid {
  sizeX: number;
  sizeY: number;
}
