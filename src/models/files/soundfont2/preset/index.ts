import { Bag } from "../bag";
import { Generator } from "../generator";
import { Header } from "./header";
import { Modulator } from "../modulator";
import Soundfont2 from "..";
import Instrument from "../instrument";
import Metadata from "../metadata.json";

export default class Preset {
  soundfont2;
  header;
  bags;
  globalGenerators: Generator[] = [];
  instruments: Instrument[] = [];
  constructor({
    preset,
    soundfont2,
  }: {
    preset: number;
    soundfont2: Soundfont2;
  }) {
    this.soundfont2 = soundfont2;
    this.header = this.getHeader(preset);
    this.bags = this.getBags(this.header);
    for (const bag of this.bags) {
      const generators = this.getGenerators(bag);
      const modulators = this.getModulators(bag);
      if (generators.some((generator) => this.isInstrument(generator))) {
        for (const gen of generators)
          if (this.isInstrument(gen))
            this.instruments.push(new Instrument(this, generators, modulators));
      } else this.globalGenerators.push(...generators);
    }
  }
  isInstrument(generator: Generator) {
    return generator.genOper === Metadata.generators[41].name;
  }
  private getHeader(preset: number) {
    const index = this.soundfont2.phdr.findIndex(
      (data) => data.preset === preset
    );
    const data = this.soundfont2.phdr[index];
    if (!data) throw new Error();
    return { data, index };
  }
  private getBags = ({ data, index }: ReturnType<typeof this.getHeader>) => {
    const nextHeader = this.soundfont2.phdr[index + 1];
    return this.soundfont2.pbag
      .slice(data.bagIndex, nextHeader?.bagIndex)
      .map((bag, i) => ({
        data: new Preset.Bag(bag),
        index: data.bagIndex + i,
      }));
  };
  private getGenerators = ({
    data,
    index,
  }: ReturnType<typeof this.getBags>[number]) => {
    const nextBag = this.soundfont2.pbag[index + 1];
    return this.soundfont2.pgen
      .slice(data.genIndex, nextBag?.genIndex)
      .map((pgen) => new Preset.Generator(pgen));
  };
  private getModulators = ({
    data,
    index,
  }: ReturnType<typeof this.getBags>[number]) => {
    const nextBag = this.soundfont2.pbag[index + 1];
    return this.soundfont2.pmod
      .slice(data.modIndex, nextBag?.modIndex)
      .map((pmod) => new Preset.Modulator(pmod));
  };
  static Header = Header;
  static Bag = Bag;
  static Generator = Generator;
  static Modulator = Modulator;
}
