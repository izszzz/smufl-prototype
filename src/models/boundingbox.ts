import { Inset } from "./inset";

export class BoundingBox {
  x;
  y;
  width;
  height;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  toInset() {
    return new Inset(this.y, this.x + this.width, this.y + this.height, this.x);
  }
}
