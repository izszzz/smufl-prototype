import { Bag } from "../bag";
import { Generator } from "../generator";
import Metadata from "../metadata.json";
import { Modulator } from "../modulator";
import Preset from "../preset";
import Sample from "../sample";
import { Header } from "./header";

export default class Instrument {
  preset;
  header;
  bags;
  presetGenerators;
  presetModulators;
  globalGenerators: Generator[] = [];
  samples: Sample[] = [];

  constructor(
    preset: Preset,
    presetGenerators: Generator[],
    presetModulators: Modulator[]
  ) {
    this.preset = preset;
    this.header = this.getHeader(
      presetGenerators.find(
        (generator) => generator.genOper === Metadata["generators"][41].name
      )!.genAmount as number
    );
    this.presetGenerators = presetGenerators;
    this.presetModulators = presetModulators;
    this.bags = this.getBags(this.header);
    for (const bag of this.bags) {
      const generators = this.getGenerators(bag);
      const modulators = this.getModulators(bag);
      if (
        generators.some(
          (generator) => generator.genOper === Metadata["generators"][53].name
        )
      ) {
        for (const gen of generators)
          if (gen.genOper === Metadata["generators"][53].name)
            this.samples.push(new Sample(this, generators, modulators));
      } else this.globalGenerators.push(...generators);
    }
  }

  private getHeader(amount: number) {
    const data = this.preset.soundfont2.inst[amount];
    if (!data) throw new Error();
    return { data: new Instrument.Header(data), index: amount };
  }
  private getBags = ({ data, index }: ReturnType<typeof this.getHeader>) => {
    const nextHeader = this.preset.soundfont2.inst[index + 1];
    return this.preset.soundfont2.ibag
      .slice(data.bagIndex, nextHeader?.bagIndex)
      .map((bag, i) => ({
        data: new Instrument.Bag(bag),
        index: data.bagIndex + i,
      }));
  };
  private getGenerators = ({
    data,
    index,
  }: ReturnType<typeof this.getBags>[number]) => {
    const nextBag = this.preset.soundfont2.ibag[index + 1];
    return this.preset.soundfont2.igen
      .slice(data.genIndex, nextBag?.genIndex)
      .map((gen) => new Instrument.Generator(gen));
  };
  private getModulators = ({
    data,
    index,
  }: ReturnType<typeof this.getBags>[number]) => {
    const nextBag = this.preset.soundfont2.ibag[index + 1];
    return this.preset.soundfont2.imod
      .slice(data.modIndex, nextBag?.modIndex)
      .map((mod) => new Instrument.Modulator(mod));
  };

  static Header = Header;
  static Bag = Bag;
  static Generator = Generator;
  static Modulator = Modulator;
}
