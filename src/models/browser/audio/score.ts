import * as Audio from "../../audio";
import * as Core from "core";
import { Note } from "./note";
import { Track } from "./track";
import { Merge } from "type-fest";
import { Synth } from "./synth";
export class Score extends Audio.Score<Note, Track> {
  gain: GainNode;
  constructor({
    gain,
    ...params
  }: { gain: GainNode } & ConstructorParameters<
    typeof Core.Score<Note, Track>
  >[0]) {
    super(params);
    this.gain = gain;
  }
  static create(param: Parameter) {
    const core = super.create(param);
    return new Score({
      ...param,
      ...core,
      tracks: core.tracks.map(
        (track) =>
          new Track({
            gain: param.tracks[track.id]!.gain,
            ...track,
          })
      ),
      notes: core.tracks.flatMap((track, trackId) =>
        track.notes.map(
          (note, noteId) =>
            new Note({
              ...note,
              synth: new Synth(param.tracks[trackId]!.notes[noteId]!.synth),
              trackId,
            })
        )
      ),
    });
  }
}
type Parameter = Merge<
  Parameters<typeof Core.Score.create>[0],
  {
    gain: GainNode;
    tracks: Merge<
      Parameters<typeof Core.Score.create>[0]["tracks"][number],
      {
        gain: GainNode;
        notes: Merge<
          Parameters<
            typeof Core.Score.create
          >[0]["tracks"][number]["notes"][number],
          { synth: ConstructorParameters<typeof Synth>[0] }
        >[];
      }
    >[];
  }
>;
