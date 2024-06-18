import Core from "../core";
import * as SMUFL from "./";

export class Track extends SMUFL.Point {
  bars;
  staffLineCount: SMUFL.Metadatas["staffLines"][number] = 5;
  core;
  constructor({
    core,
    bars,
  }: {
    bars: SMUFL.Bar[];
    core: InstanceType<typeof Core.Track>;
  }) {
    super();
    this.core = core;
    this.bars = bars;
  }
}
