import Core from ".";

export class Importer {
  params;
  constructor(params: ConstructorParameters<typeof Core.Score>[0]) {
    if (!params.metaevents) {
      params.metaevents = [
        {
          name: "Bpm",
          params: [{ value: 120 }],
        },
        {
          name: "Timesignature",
          params: [{ denominator: 4, numerator: 4 }],
        },
      ];
    } else {
      if (!params.metaevents.some(({ name }) => name === "Bpm"))
        params.metaevents.push({
          name: "Bpm",
          params: [{ value: 120 }],
        });
      if (!params.metaevents.some(({ name }) => name === "Timesignature"))
        params.metaevents.push({
          name: "Timesignature",
          params: [{ denominator: 4, numerator: 4 }],
        });
    }
    this.params = params;
  }
  import() {
    return new Core.Score(this.params);
  }
}
