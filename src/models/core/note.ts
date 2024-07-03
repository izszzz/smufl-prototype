import Core from ".";
import { Element } from "./element";

export class Note extends Element {
  pitch;
  constructor({
    pitch,
    ...element
  }: { pitch: number } & ConstructorParameters<typeof Core.Element>[0]) {
    super(element);
    this.pitch = pitch;
    this.track.notes.push(this);
  }
}
