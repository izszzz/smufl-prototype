import * as SMUFL from "./";

interface IGlyph<T> {
  glyphName: T;
}
interface Constructor<T> extends IGlyph<T>, Partial<SVGPoint> {}
export class Glyph<T extends keyof SMUFL.Glyphnames = keyof SMUFL.Glyphnames>
  extends SVGRect
  implements IGlyph<T>
{
  glyphName;
  width;
  height;
  get staffWidth(): number {
    return SMUFL.Staff.getStaffGlyph(this.width).width;
  }
  // TODO: bboxクラスを作ったほうがいいので、xとyの仕様は修正する
  constructor({ glyphName, x, y }: Constructor<T>) {
    super();
    const { width, height } = SMUFL.getBBox(glyphName);
    this.glyphName = glyphName;
    this.width = width;
    this.height = height;
    if (x) this.x = x;
    if (y) this.y = y;
  }
}
