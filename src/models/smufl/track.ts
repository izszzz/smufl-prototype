import Core from "../core";
import * as SMUFL from "./";

interface ITrack {
  bars: SMUFL.Bar[] | [SMUFL.Bar];
  staffLineCount: SMUFL.Metadatas["staffLines"][number];
  core: InstanceType<typeof Core.Track>;
}

export class Track extends SMUFL.Point implements ITrack {
  bars: ITrack["bars"];
  staffLineCount: SMUFL.Metadatas["staffLines"][number] = 5;
  core;
  constructor({ core, bars }: Omit<ITrack, "staffLineCount" | "elements">) {
    super();
    this.core = core;
    this.bars = bars;
  }
}
