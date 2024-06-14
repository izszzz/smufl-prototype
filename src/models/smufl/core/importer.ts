import * as R from "remeda";
import Core from "../../core";

export class Importer extends Core.Importer {
  override import() {
    const core = super.import();
    console.log({ core });
    core.masterbars = [];
    for (const track of core.tracks) track.bars = [];
    const timesignatures = core.metaevents.events.filter(
      (metaevent) => metaevent instanceof Core.Metaevents.Map.Timesignature
    ) as InstanceType<typeof Core.Metaevents.Map.Timesignature>[];
    // for (const [i, timesignature] of timesignatures.entries()) {
    //   const prev = timesignatures[i - 1];
    //   if (prev) prev.setEnd(timesignature.end);
    // }
    const lastTimesignature = R.last(timesignatures);
    if (lastTimesignature) lastTimesignature.setEnd(core.end);

    let start = 0;
    let end = 0;
    for (const timesignature of timesignatures) {
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
