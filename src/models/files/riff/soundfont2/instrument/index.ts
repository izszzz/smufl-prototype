import { Soundfont2 } from "..";
import { Bag } from "../bag";
import { Generator } from "../generator";
import { Modulator } from "../modulator";
import { Preset } from "../preset";
import { Sample } from "../sample";
import { Header } from "./header";

export class Instrument {
  soundfont2;
  constructor(soundfont2: Soundfont2) {
    this.soundfont2 = soundfont2;
  }
  getInstrument(pgen: InstanceType<typeof Preset.Generator>) {
    const header = this.getHeader(pgen.genAmount);
    const bags = this.getBags(header);
    return {
      instrumentHeader: header.data,
      instrumentBags: bags.map((data) => ({
        instrumentBag: data.data,
        instrumentModulators: this.getModulators(data),
        instrumentGenerators: this.getGenerators(data).map((igen) => {
          if (igen.genOper === "sampleID")
            return new Sample(this.soundfont2).getSample(igen);
          else return { instrumentGenerator: igen };
        }),
      })),
    };
  }
  private getHeader(genAmount: number) {
    const data = this.soundfont2.inst[genAmount];
    if (!data) throw new Error();
    return { data: new Instrument.Header(data), index: genAmount };
  }
  private getBags = ({ data, index }: ReturnType<typeof this.getHeader>) => {
    const nextHeader = this.soundfont2.inst[index + 1];
    return this.soundfont2.ibag
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
    const nextBag = this.soundfont2.ibag[index + 1];
    return this.soundfont2.igen
      .slice(data.genIndex, nextBag?.genIndex)
      .map((gen) => new Instrument.Generator(gen));
  };
  private getModulators = ({
    data,
    index,
  }: ReturnType<typeof this.getBags>[number]) => {
    const nextBag = this.soundfont2.ibag[index + 1];
    return this.soundfont2.imod
      .slice(data.modIndex, nextBag?.modIndex)
      .map((mod) => new Instrument.Modulator(mod));
  };

  static Header = Header;
  static Bag = Bag;
  static Generator = Generator;
  static Modulator = Modulator;
}
