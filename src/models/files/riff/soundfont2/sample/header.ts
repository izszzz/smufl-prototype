export class Header {
  name: string;
  start: number;
  end: number;
  loopStart: number;
  loopEnd: number;
  sampleRate: number;
  originalKey: number;
  correction: number;
  sampleLink: number;
  type: number;
  constructor({
    name,
    start,
    end,
    loopEnd,
    loopStart,
    sampleRate,
    originalKey,
    correction,
    sampleLink,
    type,
  }: {
    name: string;
    start: number;
    end: number;
    loopStart: number;
    loopEnd: number;
    sampleRate: number;
    originalKey: number;
    correction: number;
    sampleLink: number;
    type: number;
  }) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.loopEnd = loopEnd;
    this.loopStart = loopStart;
    this.sampleRate = sampleRate;
    this.originalKey = originalKey;
    this.correction = correction;
    this.sampleLink = sampleLink;
    this.type = type;
  }
}
