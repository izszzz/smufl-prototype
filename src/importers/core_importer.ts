import * as R from "remeda";
import * as Core from "../models/core";
import { Importer } from "./importer";

interface Options {
  generate: {
    rest: boolean;
    bar: boolean;
  };
}
export class CoreImporter implements Importer {
  params;
  options;
  constructor(
    params: Parameters<typeof Core.Score.build>[0],
    options: Options = { generate: { rest: false, bar: false } }
  ) {
    this.params = params;
    this.options = options;
  }
  import() {
    return this.associate(this.init());
  }
  private init() {
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
                  const elements = track.elements.reduce((acc, cur) => {
                    if (this.options.generate.rest)
                      if (0 < cur.time.start)
                        acc.push(
                          new Core.Rest({
                            time: new Core.Time({
                              start: 0,
                              end: cur.time.start,
                            }),
                          })
                        );
                    acc.push(
                      new Core.Note({
                        ...R.omit(cur, ["track", "bar", "time"]),
                        time: new Core.Time(cur.time),
                      })
                    );
                    return acc;
                  }, [] as Core.Element[]);

                  return {
                    id,
                    elements,
                  };
                })()
              )
          ),
        };
      })()
    );
    if (this.options.generate.bar) {
      for (const track of score.tracks) {
        track.bars = track.elements.reduce<{
          bars: Core.Bar[];
          elements: Core.Element[];
        }>(
          (acc, cur, i) => {
            acc.elements.push(cur);
            if (
              track.elements.length - 1 === i ||
              acc.elements.reduce((acc, cur) => acc + cur.time.duration, 0) ===
                track.getMetadata().timeSignature.numerator
            ) {
              acc.bars.push(
                new Core.Bar({
                  id: acc.bars.length,
                  elements: acc.elements,
                  track,
                })
              );
              acc.elements = [];
            }
            return acc;
          },
          { bars: [], elements: [] }
        ).bars;
      }
    }
    return score;
  }
  private associate(score: Core.Score) {
    for (const track of score.tracks) {
      track.score = score;
      for (const note of track.elements) note.track = track;
      if (track.bars) {
        for (const bar of track.bars) {
          bar.track = track;
          for (const note of bar.elements) note.bar = bar;
        }
        Core.setPrevAndNext(track.bars);
      }
    }
    return score;
  }
}
