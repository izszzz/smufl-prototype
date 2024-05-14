import * as Core from "../models/core";
import { Importer } from "./importer";

interface Options {
  generate: {
    rest?: boolean;
    bar?: boolean;
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
    return this.init();
  }
  private init() {
    const score = new Core.Score(this.params);
    for (const track of score.tracks) {
      track.elements.reduce((acc, cur) => {
        if (cur instanceof Core.Note) {
          cur.prev = acc;
          for (const note of acc) {
            note.next.push(cur);
          }
          acc = [];
          acc.push(cur);
        }
        return acc;
      }, [] as Core.Note[]);
      if (this.options.generate.rest) {
        track.elements = track.elements.reduce((acc, cur) => {
          if (cur instanceof Core.Note)
            if (0 < cur.time.start) {
              const start = cur.prev[0] ? cur.prev[0].time.end : 0;
              const rest = new Core.Rest({
                track,
                time: {
                  start,
                  duration: cur.time.start - start,
                },
              });
              console.log(rest);

              acc.push(rest);
            }
          acc.push(cur);
          return acc;
        }, [] as Core.Element[]);
      }
      if (this.options.generate.bar) {
        // TODO: bar 作り方変える
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
}
