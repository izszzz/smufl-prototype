export interface IBBox {
  bBoxNE: [number, number];
  bBoxSW: [number, number];
}
export class BBox {
  bBoxNE;
  bBoxSW;
  get x() {
    return this.bBoxSW[0];
  }
  get y() {
    return this.bBoxNE[1];
  }
  get top() {
    return this.y;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.bBoxNE[0];
  }
  get bottom() {
    return this.bBoxSW[1];
  }
  get width() {
    return this.right - this.left;
  }
  get height() {
    return this.top + this.bottom;
  }
  constructor({ bBoxNE, bBoxSW }: IBBox) {
    this.bBoxNE = bBoxNE;
    this.bBoxSW = bBoxSW;
  }
}
