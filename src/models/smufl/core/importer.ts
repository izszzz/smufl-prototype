import * as R from "remeda";
import Core from "../../core";

export class Importer extends Core.Importer {
  override import() {
    const core = super.import();
    core.masterbars = [];
    for (const track of core.tracks) track.bars = [];
    R.times(
      Math.ceil(core.end / core.metadata.timeSignature.numerator),
      (i) => {
        const start = i * core.metadata.timeSignature.numerator;
        const end = (i + 1) * core.metadata.timeSignature.numerator;
        const elements = core.elements.filter(
          (element) => element.end > start && element.start < end
        );
        const masterbar = new Core.MasterBar({
          score: core,
          start,
          end,
          bars: core.tracks.map((track) => {
            const bar = new Core.Bar({
              track,
              elements: elements.filter(
                (element) => element.track.id === track.id
              ),
              start,
              end,
            });
            for (const note of bar.elements) note.bar = bar;
            track.bars.push(bar);
            return bar;
          }),
        });
        core.masterbars.push(masterbar);
      }
    );
    return core;
  }
}
