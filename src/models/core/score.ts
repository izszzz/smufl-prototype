import * as Core from "./";

interface IScore {
  name?: string;
  tracks: Core.Track[];
  metadata?: Core.Metadata;
}
interface IScoreObject extends Omit<IScore, "tracks" | "metadata"> {
  tracks: ReturnType<typeof Core.Track.build>[];
  metadata?: ReturnType<typeof Core.Metadata.build>;
}

export class Score implements IScore {
  name;
  tracks;
  metadata;
  constructor({ name, tracks, metadata }: IScore) {
    this.name = name;
    this.metadata = metadata ?? new Core.Metadata();
    this.tracks = tracks;
  }
  static build(params: IScoreObject) {
    return params;
  }
}
