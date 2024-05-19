import * as SMUFL from "./";
interface IElement<T> {
  accessory: SMUFL.Accessory;
  core: T;
}
interface Constructor<T> extends Omit<IElement<T>, "glyphs"> {}

export class Element<T> extends SMUFL.Rect implements IElement<T> {
  accessory;
  spacing = new SMUFL.Spacing();
  core: T;
  constructor({ core, accessory }: Constructor<T>) {
    super();
    this.core = core;
    this.accessory = accessory;
    this.width = this.accessory.glyphs.width;
  }
}
