import * as R from "remeda";
import * as Core from "../models/core";
import { Importer } from "./importer";

export class CoreImporter implements Importer {
  params;
  options: {
    generate: {
      bar?: boolean;
      rest?: boolean;
    };
  } = {
    generate: {
      bar: true,
    },
  };
  constructor(params: Parameters<typeof Core.Score.build>[0]) {
    this.params = params;
  }
  import() {
    return this.associate(this.init());
  }
  init() {
    const score = new Core.Score(
      (() => {
        const { tracks, metadata, ...score } = this.params;
        return {
          ...score,
          metadata: new Core.Metadata(metadata),
          tracks: tracks.map(
            (track, id) =>
              new Core.Track(
                (() => {
                  const notes = track.notes.map(
                    ({ time, ...note }) =>
                      new Core.Note({
                        ...R.omit(note, ["track", "bar"]),
                        time: new Core.Time(time),
                      })
                  );

                  return {
                    id,
                    notes,
                  };
                })()
              )
          ),
        };
      })()
    );
    if (this.options.generate.bar) {
      for (const track of score.tracks) {
        track.bars = track.notes.reduce<{
          bars: Core.Bar[];
          notes: Core.Note[];
        }>(
          (acc, cur, i) => {
            acc.notes.push(cur);
            if (
              track.notes.length - 1 === i ||
              acc.notes.reduce((acc, cur) => acc + cur.time.duration, 0) ===
                track.getMetadata().timeSignature.numerator
            ) {
              acc.bars.push(
                new Core.Bar({
                  id: acc.bars.length,
                  notes: acc.notes,
                  track,
                })
              );
              acc.notes = [];
            }
            return acc;
          },
          { bars: [], notes: [] }
        ).bars;
      }
    }
    return score;
  }
  associate(score: Core.Score) {
    for (const track of score.tracks) {
      track.score = score;
      for (const note of track.notes) note.track = track;
      if (track.bars) {
        for (const bar of track.bars) {
          bar.track = track;
          for (const note of bar.notes) note.bar = bar;
        }
        Core.setPrevAndNext(track.bars);
      }
    }
    return score;
  }
}
