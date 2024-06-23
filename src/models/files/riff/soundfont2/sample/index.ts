import { Soundfont2 } from "..";
import { Instrument } from "../instrument";
import { Header } from "./header";

export class Sample {
  soundfont2;
  constructor(soundfont2: Soundfont2) {
    this.soundfont2 = soundfont2;
  }
  getSample(igen: InstanceType<typeof Instrument.Generator>) {
    const header = this.getHeader(igen.genAmount);
    const data = this.getData(header);
    this.ajust(header.data, data);
    return {
      sampleHeader: header.data,
      sample: data,
    };
  }
  private getHeader(genAmount: number) {
    const data = this.soundfont2.shdr[genAmount];
    if (!data) throw new Error();
    return { data, index: genAmount };
  }
  private getData({ data }: ReturnType<typeof this.getHeader>) {
    return new Int16Array(
      new Uint8Array(
        this.soundfont2.smpl.subarray(2 * data.start, 2 * data.end)
      ).buffer
    );
  }
  ajust(header: InstanceType<typeof Sample.Header>, data: Int16Array) {
    header.loopStart -= header.start;
    header.loopEnd -= header.start;
    let i: number;
    let il: number;
    let j: number;
    let multiply = 1;
    while (header.sampleRate < 22050) {
      data = new Int16Array(data.length * 2);
      for (i = j = 0, il = data.length; i < il; ++i) {
        let sample = data[j++];
        if (sample) sample = data[i];
      }
      multiply *= 2;
      header.sampleRate *= 2;
    }
    if (header.sampleRate > 0) {
      header.sampleRate *= multiply;
      header.loopStart *= multiply;
      header.loopEnd *= multiply;
    }
    return;
  }
  static Header = Header;
}
