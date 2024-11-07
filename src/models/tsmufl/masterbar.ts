import * as Core from "../core";
import * as SMUFL from ".";

export class MasterBar extends Core.Event implements Core.Identifier {
  id;
  bars;
  score;
  notes;
  get timesignature(): SMUFL.Timesignature {
    return (
      this.score.timesignatures.find(({ start }) => start === this.start) ??
      this.prev!.timesignature
    );
  }
  get keysignature(): SMUFL.Keysignature {
    return (
      this.score.keysignatures.find(({ start }) => start === this.start) ??
      this.prev!.keysignature
    );
  }
  get prev(): MasterBar | undefined {
    return this.score.masterbars[this.id - 1];
  }
  constructor({
    id,
    score,
    bars,
    notes,
    ...event
  }: {
    id: number;
    score: SMUFL.Score;
    bars: SMUFL.Bar[];
    notes: SMUFL.Note[];
  } & Core.Event) {
    super(event);
    this.id = id;
    this.score = score;
    this.bars = bars;
    this.notes = notes;
  }
}
