import Core from "./core";
import * as SMUFL from ".";
import * as R from "remeda";
import { P, match } from "ts-pattern";

export class Chord extends SMUFL.Rect {
  core;
  chord;
  constructor({
    core,
    elements,
  }: {
    core: InstanceType<typeof Core.Chord>;
    elements: SMUFL.Element[];
  }) {
    super();
    this.core = core;
    this.chord = core.chord.map((element) =>
      match(element)
        .with(
          P.instanceOf(Core.Sequence),
          (core) =>
            new SMUFL.Sequence({
              core,
              elements,
            })
        )
        .with(
          P.instanceOf(Core.Element),
          (core) => elements.find((element) => element.core.id === core.id)!
        )
        .exhaustive()
    );

    this.width = R.firstBy(this.chord, [R.prop("width"), "desc"])?.width ?? 0;
  }
}
