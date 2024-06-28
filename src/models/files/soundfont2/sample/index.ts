import * as R from "remeda";
import { Generator } from "../generator";
import Instrument from "../instrument";
import Metadata from "../metadata.json";
import { Modulator } from "../modulator";
import { Header } from "./header";
// TODO: 型修正

export default class Sample {
  header;
  instrument;
  generators;
  instrumentGenerators;
  instrumentModulators;
  data;
  get start() {
    return (
      32768 * this.generators.startAddrsCoarseOffset +
      this.header.data.start +
      this.generators.startAddrsOffset
    );
  }
  get end() {
    return (
      32768 * this.generators.endAddrsCoarseOffset +
      this.header.data.end +
      this.generators.endAddrsOffset
    );
  }
  get startLoop() {
    return (
      32768 * this.generators.startloopAddrsCoarseOffset +
      this.header.data.startLoop +
      this.generators.startloopAddrsOffset
    );
  }
  get endLoop() {
    return (
      32768 * this.generators.endloopAddrsCoarseOffset +
      this.header.data.endLoop +
      this.generators.endloopAddrsOffset
    );
  }
  constructor(
    instrument: Instrument,
    instrumentGenerators: Generator[],
    instrumentModulators: Modulator[]
  ) {
    this.instrument = instrument;
    this.instrumentGenerators = instrumentGenerators;
    this.instrumentModulators = instrumentModulators;
    this.header = this.getHeader(
      instrumentGenerators.find(
        (generator) => generator.genOper === Metadata["generators"][53].name
      )!.genAmount as number
    );
    this.generators = this.setGenerators();
    this.data = this.getData();
  }
  private getSample(igen: InstanceType<typeof Instrument.Generator>) {
    if (typeof igen.genAmount !== "number") return;
    const header = this.getHeader(igen.genAmount);
    const data = this.getData();
    return {
      sampleHeader: header.data,
      sample: data,
    };
  }
  private getHeader(genAmount: number) {
    const data = this.instrument.preset.soundfont2.shdr[genAmount];
    if (!data) throw new Error();
    return { data, index: genAmount };
  }
  private getData() {
    return new Int16Array(
      new Uint8Array(
        this.instrument.preset.soundfont2.smpl.subarray(
          2 * this.start,
          2 * this.end
        )
      ).buffer
    );
  }
  private setGenerators() {
    Metadata["generators"].length;
    return Metadata["generators"].reduce(
      (acc, cur) => {
        if (cur) {
          if (
            cur.name === Metadata["generators"][41].name ||
            cur.name === Metadata["generators"][53].name ||
            cur.name === Metadata["generators"][60].name
          )
            return acc;
          // inst globalZone
          const globalInstrumentGenerator =
            this.instrument.globalGenerators.find(
              (generator) => generator.genOper === cur.name
            );
          if (globalInstrumentGenerator)
            acc[cur.name] = globalInstrumentGenerator.genAmount;

          // inst localZone
          const localInstrumentGenerator = this.instrumentGenerators.find(
            (generator) => generator.genOper === cur.name
          );
          if (localInstrumentGenerator) {
            acc[cur.name] = localInstrumentGenerator.genAmount;
          }
          // preset localZone
          const localPresetGenerator = this.instrument.presetGenerators.find(
            (generator) => generator.genOper === cur.name
          );
          if (localPresetGenerator)
            acc[cur.name] += localPresetGenerator.genAmount;
          else {
            const globalPresetGenerator =
              this.instrument.preset.globalGenerators.find(
                (generator) => generator.genOper === cur.name
              );
            if (globalPresetGenerator)
              acc[cur.name] += globalPresetGenerator.genAmount;
          }

          if (R.isNonNullish(cur.default)) acc[cur.name] = cur.default;
        }
        switch (cur?.name) {
          case "startAddrsOffset":
          case "endAddrsOffset":
          case "startloopAddrsOffset":
          case "endloopAddrsOffset":
          case "endAddrsCoarseOffset":
          case "keyRange":
          case "velRange":
          case "startloopAddrsCoarseOffset":
          case "keynum":
          case "velocity":
          case "endloopAddrsCoarseOffset":
          case "fineTune":
          case "sampleModes":
          case "scaleTuning":
          case "exclusiveClass":
          case "overridingRootKey":
            break;
          case "modLfoToPitch":
          case "vibLfoToPitch":
          case "modEnvToPitch":
          case "modLfoToFilterFc":
          case "modEnvToFilterFc":
          case "keynumToModEnvHold":
          case "keynumToModEnvDecay":
          case "keynumToVolEnvHold":
          case "keynumToVolEnvDecay":
            acc[cur.name] = acc[cur.name] / 100;
            break;
          case "initialFilterQ":
          case "modLfoToVolume":
          case "chorusEffectsSend":
          case "reverbEffectsSend":
          case "pan":
          case "sustainModEnv":
          case "sustainVolEnv":
          case "initialAttenuation":
          case "coarseTune":
            acc[cur.name] = acc[cur.name] / 10;
            break;
          case "delayModLFO":
          case "delayVibLFO":
          case "delayModEnv":
          case "attackModEnv":
          case "holdModEnv":
          case "decayModEnv":
          case "releaseModEnv":
          case "delayVolEnv":
          case "attackVolEnv":
          case "holdVolEnv":
          case "decayVolEnv":
          case "releaseVolEnv":
            acc[cur.name] = Math.pow(2, acc[cur.name] / 1200);
            break;
          case "initialFilterFc":
          case "freqModLFO":
          case "freqVibLFO":
            acc[cur.name] = 8.176 * Math.pow(2, acc[cur.name] / 1200);
            break;
        }
        return acc;
      },
      {} as Record<
        NonNullable<Metadata["generators"][number]>["name"],
        NonNullable<number | { lo: number; hi: number }>
      >
    );
  }
  static Header = Header;
}
