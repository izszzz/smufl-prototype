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
  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }
}
