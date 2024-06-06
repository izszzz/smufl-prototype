import { P, match } from "ts-pattern";
import * as SMUFL from ".";
import Core from "./core";

export class Beat extends SMUFL.Rect {
  element;
  core;
  constructor({
    core,
    elements,
  }: {
    core: InstanceType<typeof Core.Beat>;
    elements: SMUFL.Element[];
  }) {
    super();
    this.core = core;
    this.element = match(core.element)
      .with(
        P.instanceOf(Core.Chord),
        (core) =>
          new SMUFL.Chord({
            core,
            elements,
          })
      )
      .with(
        P.instanceOf(Core.Element),
        (core) => elements.find((element) => element.core.id === core.id)!
      )
      .exhaustive();
    this.width = this.element.width;
  }
}
