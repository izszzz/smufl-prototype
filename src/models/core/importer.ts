import * as R from "remeda";
import Core from ".";

export class Importer {
  params;
  constructor(params: ConstructorParameters<typeof Core.Score>[0]) {
    if (!params.metaevents) {
      params.metaevents = [
        {
          name: "Bpm",
          params: [{ value: 120, start: 0 }],
        },
        {
          name: "Timesignature",
          params: [{ denominator: 4, numerator: 4, start: 0 }],
        },
      ];
    } else {
      if (!params.metaevents.some(({ name }) => name === "Bpm"))
        params.metaevents.push({
          name: "Bpm",
          params: [{ value: 120, start: 0 }],
        });
      if (!params.metaevents.some(({ name }) => name === "Timesignature"))
        params.metaevents.push({
          name: "Timesignature",
          params: [{ denominator: 4, numerator: 4, start: 0 }],
        });
    }
    this.params = params;
  }
  import() {
    const core = new Core.Score(this.params);
    // TODO: refactor
    const timesignatures = core.metaevents.timesignature;
    const lastTimesignature = R.last(timesignatures);
    if (lastTimesignature) lastTimesignature.setEnd(core.end);

    const bpms = core.metaevents.bpm;
    const lastBpm = R.last(bpms);
    if (lastBpm) lastBpm.setEnd(core.end);
    return core;
  }
}
