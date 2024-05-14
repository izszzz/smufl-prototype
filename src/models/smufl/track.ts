import * as Core from "../core";
import * as SMUFL from "./";

interface ITrack {
  bars: SMUFL.Bar[] | [SMUFL.Bar];
  metadata?: SMUFL.Metadata;
  staffLineCount: SMUFL.Metadatas["staffLines"][number];
  core: Core.Track;
}

export class Track implements ITrack, SMUFL.IPosition {
  bars: SMUFL.Bar[] | [SMUFL.Bar];
  metadata;
  staffLineCount: SMUFL.Metadatas["staffLines"][number] = 5;
  x = 0;
  y = 0;
  core;
  constructor({ core, bars, metadata }: Omit<ITrack, "staffLineCount">) {
    this.core = core;
    this.bars = bars;
    this.metadata = metadata;
  }
}
