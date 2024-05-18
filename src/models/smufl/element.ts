import * as SMUFL from "./";
interface IElement<T> {
  accessory: SMUFL.Accessory;
  core: T;
}
interface Constructor<T> extends Omit<IElement<T>, "glyphs"> {}

export class Element<T> implements IElement<T>, SMUFL.IPosition, SMUFL.IBox {
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  accessory;
  spacing = new SMUFL.Spacing();
  core: T;
  constructor({ core, accessory }: Constructor<T>) {
    this.core = core;
    this.accessory = accessory;
    this.width = this.accessory.glyphs.width;
  }
}
