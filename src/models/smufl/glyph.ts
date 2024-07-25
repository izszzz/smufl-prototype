import * as SMUFL from ".";

interface IGlyph<T> {
  glyphName: T;
}
interface Constructor<T> extends IGlyph<T>, Partial<SMUFL.Point> {}
export class Glyph<T extends keyof SMUFL.Glyphnames = keyof SMUFL.Glyphnames>
  extends SMUFL.Point
  implements IGlyph<T>
{
  bBox;
  advancedWidth;
  glyphName;
  constructor({ glyphName, x, y }: Constructor<T>) {
    super();
    this.bBox = new SMUFL.BBox(SMUFL.getBBox(glyphName));
    this.advancedWidth = SMUFL.getAdvanceWidth(glyphName);
    this.glyphName = glyphName;
    if (x) this.x = x;
    if (y) this.y = y;
  }
}
