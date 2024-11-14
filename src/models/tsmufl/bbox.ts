/*
	https://developer.mozilla.org/ja/docs/Web/API/Element/getBoundingClientRect#%E8%BF%94%E5%80%A4
*/
interface Coordinate {
  bBoxNE: [number, number];
  bBoxSW: [number, number];
}
interface Area {
  top: number;
  left: number;
  right: number;
  bottom: number;
}
export class BBox {
  top;
  left;
  right;
  bottom;
  width;
  height;

  constructor(bbox: Coordinate);
  constructor(bbox: Area);
  constructor(bbox: Coordinate | Area) {
    if ("bBoxNE" in bbox && "bBoxSW" in bbox) {
      this.left = bbox.bBoxSW[0];
      this.top = -bbox.bBoxNE[1];
      this.right = bbox.bBoxNE[0];
      this.bottom = -bbox.bBoxSW[1];
      this.width = this.right - this.left;
      this.height = this.bottom - this.top;
    } else {
      this.left = bbox.left;
      this.top = bbox.top;
      this.right = bbox.right;
      this.bottom = bbox.bottom;
      this.width = this.right - this.left;
      this.height = this.bottom - this.top;
    }
  }
}
