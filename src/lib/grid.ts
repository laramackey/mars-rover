import {Coordinate} from './types';

export class Grid {
  public size: Coordinate;
  public scents: Coordinate[];

  constructor(size) {
    this.size = size;
    this.scents = [];
  }

  public addScent(scent: Coordinate): void {
    this.scents.push(scent);
  }
}

export interface MarsGrid {
  size: Coordinate;
  scents: Coordinate[];
  addScent: (scent: Coordinate) => {};
}
