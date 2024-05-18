import * as Core from "../core";
import * as SMUFL from "./";

interface ITrack {
  bars: SMUFL.Bar[] | [SMUFL.Bar];
  metadata?: SMUFL.Metadata;
  staffLineCount: SMUFL.Metadatas["staffLines"][number];
  core: Core.Track;
}

export class Track extends SVGPoint implements ITrack {
  bars: SMUFL.Bar[] | [SMUFL.Bar];
  metadata;
  staffLineCount: SMUFL.Metadatas["staffLines"][number] = 5;
  core;
  constructor({ core, bars, metadata }: Omit<ITrack, "staffLineCount">) {
    super();
    this.core = core;
    this.bars = bars;
    this.metadata = metadata;
  }
}
