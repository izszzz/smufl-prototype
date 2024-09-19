import * as R from "remeda";
import * as SMUFL from ".";
import * as Core from "./core";

export class Sequence extends SMUFL.Rect {
  core;
  beats;
  constructor({
    core,
    elements,
  }: {
    core: Core.Sequence;
    elements: SMUFL.Element[];
  }) {
    super();
    this.core = core;
    console.log(core, elements);
    this.beats = core.beats.map((core) => new SMUFL.Beat({ core, elements }));
    this.width = R.pipe(
      this.beats,
      R.map(R.prop("width")),
      R.reduce((acc, cur) => R.add(acc, cur), 0)
    );
  }
}
