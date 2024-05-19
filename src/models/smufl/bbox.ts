/*
	https://developer.mozilla.org/ja/docs/Web/API/Element/getBoundingClientRect#%E8%BF%94%E5%80%A4
*/
interface IBBox {
  bBoxNE: [number, number];
  bBoxSW: [number, number];
}
export class BBox {
  bBoxNE;
  bBoxSW;
  x;
  y;
  top;
  left;
  right;
  bottom;
  width;
  height;
  constructor({ bBoxNE, bBoxSW }: IBBox) {
    this.bBoxNE = bBoxNE;
    this.bBoxSW = bBoxSW;
    this.x = bBoxSW[0];
    this.y = bBoxNE[1];
    this.top = this.y;
    this.bottom = bBoxSW[1];
    this.left = this.x;
    this.right = bBoxNE[0];
    this.width = this.right - this.left;
    this.height = this.bottom - this.top;
  }
}
