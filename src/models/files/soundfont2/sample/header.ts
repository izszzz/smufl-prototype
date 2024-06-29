export class Header {
  name: string;
  start: number;
  end: number;
  startLoop: number;
  endLoop: number;
  sampleRate: number;
  originalKey: number;
  correction: number;
  sampleLink: number;
  type: number;
  constructor({
    name,
    start,
    end,
    endLoop,
    startLoop,
    sampleRate,
    originalKey,
    correction,
    sampleLink,
    type,
  }: {
    name: string;
    start: number;
    end: number;
    startLoop: number;
    endLoop: number;
    sampleRate: number;
    originalKey: number;
    correction: number;
    sampleLink: number;
    type: number;
  }) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.endLoop = endLoop;
    this.startLoop = startLoop;
    this.sampleRate = sampleRate;
    this.originalKey = originalKey;
    this.correction = correction;
    this.sampleLink = sampleLink;
    this.type = type;
  }
}
