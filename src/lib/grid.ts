export class Grid {
  public sizeX: number;
  public sizeY: number;
  public scents: Scent[];

  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.scents = [];
  }

  public addScent(scent: Scent): void {
    this.scents.push(scent);
  }
}

export interface MarsGrid {
  sizeX: number;
  sizeY: number;
  scents: Scent[];
  addScent: (scent: Scent) => {};
}

export type Scent = [number, number];
