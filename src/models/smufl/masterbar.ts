import * as R from "remeda";
import * as SMUFL from "./";
import Core from "../core";

export class MasterBar extends SMUFL.Point {
  core;
  bars;
  sequence;
  get width() {
    // row側でmetadataの追加をしているので、constructorでwidthを設定すると、metadtatのwidthが0になってしまう。
    return (
      this.sequence.width +
      (R.pipe(
        this.bars,
        R.map(R.prop("metadata")),
        R.filter(R.isTruthy),
        R.firstBy([R.prop("width"), "desc"])
      )?.width ?? 0)
    );
  }
  constructor({
    bars,
    core,
    elements,
  }: {
    bars: SMUFL.Bar[];
    core: InstanceType<typeof Core.MasterBar>;
    elements: SMUFL.Element[];
  }) {
    super();
    this.bars = bars;
    this.core = core;
    this.sequence = new SMUFL.Sequence({
      core: core.sequence,
      elements,
    });
  }
}
