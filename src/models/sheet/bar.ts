import * as R from "remeda";
import * as Sheet from "sheet";

export class Bar {
  readonly id;
  trackId;
  score!: Sheet.Score;
  get timesignature() {
    return this.score.timesignatures.find((timesignature) =>
      timesignature.isOverlapped(this.masterbar)
    )!;
  }
  get keysignature() {
    return this.score.keysignatures.find((keysignature) =>
      keysignature.isOverlapped(this.masterbar)
    )!;
  }
  get track() {
    return this.score.tracks.find((track) => track.id === this.trackId)!;
  }
  get masterbar() {
    return this.score.masterbars.find((masterbar) => masterbar.id === this.id)!;
  }
  get notes() {
    return this.masterbar.notes.filter((note) => note.trackId === this.trackId);
  }
  get staves() {
    return this.score.staves.filter(
      (stave) => stave.barId === this.id && stave.trackId === this.trackId
    );
  }
  get width() {
    return (
      R.pipe(
        this.staves,
        R.firstBy([R.prop("width"), "desc"]),
        R.prop("width")
      ) ?? 0
    );
  }
  get height() {
    const lastStave = R.last(this.staves);
    return lastStave ? lastStave.height + lastStave.y : 0;
  }
  get prev() {
    return this.track.bars[this.id - 1];
  }
  constructor({ id, trackId }: { id: number; trackId: number }) {
    this.id = id;
    this.trackId = trackId;
  }
}
