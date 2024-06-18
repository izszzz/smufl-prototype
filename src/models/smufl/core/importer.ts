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
    for (const timesignature of core.metaevents.data.timesignature) {
      R.times(timesignature.duration / timesignature.numerator, () => {
        end += timesignature.numerator;
        const elements = core.elements.filter(
          (element) => element.end > start && element.start < end
        );
        const masterbar = new Core.MasterBar({
          score: core,
          start,
          end,
          elements,
        });
        start = end;
        core.masterbars.push(masterbar);
      });
    }
    return core;
  }
}
