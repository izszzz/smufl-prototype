import * as R from "remeda";
import Core from "../../core";

export class Importer extends Core.Importer {
  override import() {
    const core = super.import();
    console.log({ core });
    //init
    core.masterbars = [];
    for (const track of core.tracks) track.bars = [];

    let start = 0;
    let end = 0;
    for (const timesignature of core.metaevents.data.Timesignature) {
      R.times(
        Math.max(timesignature.duration / timesignature.numerator, 1),
        () => {
          end += timesignature.numerator;
          const elements = core.elements.filter(
            (element) => element.end > start && element.start < end
          );
          core.masterbars.push(
            new Core.MasterBar({
              score: core,
              start,
              end,
              duration: end - start,
              elements,
            })
          );
          start = end;
        }
      );
    }

    return core;
  }
}
