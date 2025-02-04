import { Header as PresetHeader } from "./preset/header";
import { Header as InstrumentHeader } from "./instrument/header";
import { Header as SampleHeader } from "./sample/header";
import { Bag } from "./bag";
import { Modulator } from "./modulator";
import { Generator } from "./generator";
import Preset from "./preset";

export class Sf2 {
  constructor(
    public phdr: PresetHeader[],
    public pbag: Bag[],
    public pmod: Modulator[],
    public pgen: Generator[],
    public inst: InstrumentHeader[],
    public ibag: Bag[],
    public imod: Modulator[],
    public igen: Generator[],
    public shdr: SampleHeader[],
    public smpl: Uint8Array
  ) {}
  getPreset(preset: number) {
    return new Preset({ preset, sf2: this });
  }
}
