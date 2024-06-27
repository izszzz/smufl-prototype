import Riff from "../riff";
import Instrument from "./instrument";
import Metadata from "./metadata.json";
import {
  bagParser,
  generatorParser,
  headerParser,
  instrumentParser,
  modulatorParser,
  sampleHeaderParser,
} from "./parser";
import Preset from "./preset";
import Sample from "./sample";
// Reference: https://github.com/gree/sf2synth.js/blob/master/src/sf2.js

export default class Soundfont2 extends Riff {
  phdr;
  pbag;
  pmod;
  pgen;
  inst;
  ibag;
  imod;
  igen;
  shdr;
  smpl;
  constructor(arrayBuffer: ArrayBuffer) {
    super(arrayBuffer);
    let chunk;
    chunk = this.getChunk(Metadata.id[0]);
    this.phdr = headerParser(chunk.length).parse(chunk.data)
      .data as InstanceType<typeof Preset.Header>[];
    this.pbag = this.parseBag(Metadata.id[1]).data as InstanceType<
      typeof Preset.Bag
    >[];
    this.pmod = this.parseModulator(Metadata.id[2])
      .data as ConstructorParameters<typeof Preset.Modulator>[0][];
    this.pgen = this.parseGenerator(Metadata.id[3])
      .data as ConstructorParameters<typeof Preset.Generator>[0][];
    chunk = this.getChunk(Metadata.id[4]);
    this.inst = instrumentParser(chunk.length).parse(chunk.data)
      .data as InstanceType<typeof Instrument.Header>[];
    this.ibag = this.parseBag(Metadata.id[5]).data as InstanceType<
      typeof Instrument.Bag
    >[];
    this.imod = this.parseModulator(Metadata.id[6])
      .data as ConstructorParameters<typeof Instrument.Modulator>[0][];
    this.igen = this.parseGenerator(Metadata.id[7])
      .data as ConstructorParameters<typeof Instrument.Generator>[0][];
    chunk = this.getChunk(Metadata.id[8]);
    this.shdr = sampleHeaderParser(chunk.length).parse(chunk.data)
      .data as InstanceType<typeof Sample.Header>[];
    this.smpl = this.getChunk(Metadata.id[9]).data;
  }
  getPreset(presetNumber: number) {
    return new Preset({ preset: presetNumber, soundfont2: this });
  }
  private parseBag(id: Metadata["bag"][number]) {
    const chunk = this.getChunk(id);
    return bagParser(chunk.length).parse(chunk.data);
  }
  private parseModulator(id: Metadata["mod"][number]) {
    const chunk = this.getChunk(id);
    return modulatorParser(chunk.length).parse(chunk.data);
  }
  private parseGenerator(id: Metadata["gen"][number]) {
    const chunk = this.getChunk(id);
    return generatorParser(chunk.length).parse(chunk.data);
  }
}
