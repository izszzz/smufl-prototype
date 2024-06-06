import * as R from "remeda";
import * as SMUFL from ".";
import Core from "./core";

export class Sequence extends SMUFL.Rect {
  core;
  beats;
  constructor({
    core,
    elements,
  }: {
    core: InstanceType<typeof Core.Sequence>;
    elements: SMUFL.Element[];
  }) {
    super();
    this.core = core;
    this.beats = core.beats.map((core) => new SMUFL.Beat({ core, elements }));
    this.width = R.pipe(this.beats, R.map(R.prop("width")), R.reduce(R.add, 0));
  }
}
