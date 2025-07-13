import * as R from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";

export class Bar<
    Note extends Sheet.Note = Sheet.Note,
    Stave extends Sheet.Stave = Sheet.Stave,
  >
  extends Core.Event
  implements Core.Identifier
{
  id;
  staffLines;
  notes;
  staves;
  timesignature;
  masterbar!: Sheet.Masterbar;
  track!: Sheet.Track;
  get width() {
    return R.firstBy(this.staves, [(stave) => stave.width, "desc"])?.width ?? 0;
  }
  get height() {
    // TODO: 複数staveの場合stave間のスペースを考慮する
    return this.staves.reduce((acc, cur) => acc + cur.height, 0);
  }
  get prev() {
    return this.track.bars[this.id - 1];
  }
  constructor({
    id,
    staffLines,
    notes,
    staves,
    timesignature,
    ...event
  }: {
    id: number;
    staffLines: number;
    notes: Note[];
    staves: Stave[];
    timesignature: Sheet.Timesignature;
  } & Core.EventConstructorParameter) {
    if ("end" in event) super(event);
    else super(event);
    this.id = id;
    this.staffLines = staffLines;
    this.staves = staves;
    this.notes = notes;
    this.timesignature = timesignature;
  }
}
