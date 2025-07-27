import * as R from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";

export class Bar extends Core.Event {
  readonly id;
  trackId;
  masterbarId;
  staffLines;
  timesignature;
  score!: Sheet.Score;
  get track() {
    return this.score.tracks.find((track) => track.id === this.trackId)!;
  }
  get masterbar() {
    return this.score.masterbars.find(
      (masterbar) => masterbar.id === this.masterbarId
    )!;
  }
  get notes() {
    return this.score.notes.filter((note) => note.barId === this.id);
  }
  get staves() {
    return this.score.staves.filter(
      (stave) => stave.barId === this.id && stave.trackId === this.trackId
    );
  }
  get width() {
    return R.firstBy(this.staves, [(stave) => stave.width, "desc"])?.width ?? 0;
  }
  get height() {
    const lastStave = R.last(this.staves);
    return lastStave ? lastStave.height + lastStave.y : 0;
  }
  get prev() {
    return this.track!.bars[this.id - 1];
  }
  constructor({
    id,
    trackId,
    masterbarId,
    staffLines,
    timesignature,
    ...event
  }: {
    id: number;
    trackId: number;
    masterbarId: number;
    staffLines: number;
    timesignature: Sheet.Timesignature;
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.id = id;
    this.trackId = trackId;
    this.masterbarId = masterbarId;
    this.staffLines = staffLines;
    this.timesignature = timesignature;
  }
}
