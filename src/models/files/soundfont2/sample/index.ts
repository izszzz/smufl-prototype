import { IntRange, LiteralToPrimitive, UnionToIntersection } from "type-fest";
import * as R from "remeda";
import * as Unit2X from "../../../unit2x";
import { Generator } from "../generator";
import Instrument from "../instrument";
import Metadata from "../metadata.json";
import { Modulator } from "../modulator";
import { Header } from "./header";
import { P, match } from "ts-pattern";

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
        (generator) => generator.genOper === Metadata.generators[53].name
      )!.genAmount as number
    );
    this.generators = this.setGenerators();
    this.data = this.getData();
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
  // TODO: そもそもここで変換する必要がない。音を鳴らす側で変換したほうがいい
  private setGenerators() {
    return R.pipe(
      Metadata.generators,
      // TODO: どうにかせいや
      R.filter(R.isNot(R.isDeepEqual(Metadata.generators[41]))),
      R.filter(R.isNot(R.isDeepEqual(Metadata.generators[53]))),
      R.filter(R.isNot(R.isDeepEqual(Metadata.generators[60]))),
      R.filter(R.isNonNullish),
      R.reduce((acc, cur) => {
        // inst globalZone
        const globalInstrumentGenerator = this.instrument.globalGenerators.find(
          (generator) => generator.genOper === cur.name
        );
        if (globalInstrumentGenerator)
          acc[cur.name] = globalInstrumentGenerator.genAmount;

        // inst localZone
        const localInstrumentGenerator = this.instrumentGenerators.find(
          (generator) => generator.genOper === cur.name
        );
        if (localInstrumentGenerator)
          acc[cur.name] = localInstrumentGenerator.genAmount;
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
        match(cur.name)
          .with(
            P.union(
              Metadata.generators[0].name,
              Metadata.generators[1].name,
              Metadata.generators[2].name,
              Metadata.generators[3].name,
              Metadata.generators[4].name,
              Metadata.generators[12].name,
              Metadata.generators[43].name,
              Metadata.generators[44].name,
              Metadata.generators[45].name,
              Metadata.generators[46].name,
              Metadata.generators[47].name,
              Metadata.generators[50].name,
              Metadata.generators[52].name, // TODO: unitがcentなのにここであっているかわからん
              Metadata.generators[54].name,
              Metadata.generators[56].name, // TODO: cent/keyが使われてる
              Metadata.generators[57].name,
              Metadata.generators[58].name
            ),
            () => {}
          )
          .with(
            P.union(
              Metadata.generators[31].name,
              Metadata.generators[32].name,
              Metadata.generators[39].name,
              Metadata.generators[40].name
            ),
            (name) => (acc[name] = new Unit2X.TCent(acc[name]).semitone)
          )
          .with(
            P.union(
              Metadata.generators[5].name,
              Metadata.generators[6].name,
              Metadata.generators[7].name,
              Metadata.generators[10].name,
              Metadata.generators[11].name
            ),
            (name) => (acc[name] = new Unit2X.Centfs(acc[name]).semitone)
          )
          .with(
            P.union(
              Metadata.generators[15].name,
              Metadata.generators[16].name,
              Metadata.generators[17].name,
              Metadata.generators[29].name,
              Metadata.generators[51].name //TODO: smitoneなのに10で割る意味が分からん
            ),
            (name) => (acc[name] = acc[name] / 10)
          )
          .with(
            P.union(
              Metadata.generators[9].name,
              Metadata.generators[13].name,
              Metadata.generators[37].name,
              Metadata.generators[48].name
            ),
            (name) => (acc[name] = new Unit2X.Centibel(acc[name]).decibel.value)
          )
          .with(
            P.union(
              Metadata.generators[21].name,
              Metadata.generators[23].name,
              Metadata.generators[25].name,
              Metadata.generators[26].name,
              Metadata.generators[27].name,
              Metadata.generators[28].name,
              Metadata.generators[30].name,
              Metadata.generators[33].name,
              Metadata.generators[34].name,
              Metadata.generators[35].name,
              Metadata.generators[36].name,
              Metadata.generators[38].name
            ),
            (name) => (acc[name] = new Unit2X.Timecent(acc[name]).seconds.value)
          )
          .with(
            P.union(
              Metadata.generators[8].name,
              Metadata.generators[22].name,
              Metadata.generators[24].name
            ),
            (name) => (acc[name] = new Unit2X.Cent(acc[name]).hertz)
          )
          .exhaustive();

        return acc;
      }, {} as UnionToIntersection<AllGenerators>)
    );
  }
  static Header = Header;
}
type GeneratorRanges =
  | IntRange<0, 14>
  | IntRange<15, 18>
  | IntRange<21, 41>
  | IntRange<43, 49>
  | IntRange<50, 53>
  | IntRange<54, 55>
  | IntRange<56, 59>;
type GeneratorObject<T extends GeneratorRanges> = {
  [K in Metadata["generators"][T]["name"]]: LiteralToPrimitive<
    Metadata["generators"][T]["default"]
  >;
};
type AllGenerators = GeneratorRanges extends infer T
  ? T extends GeneratorRanges
    ? GeneratorObject<T>
    : never
  : never;
