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
  get width() {
    return R.firstBy(this.staves, [(stave) => stave.width, "desc"])?.width ?? 0;
  }
  get prev() {
    return this.track.bars[this.id - 1];
  }
  staffLines;
  notes;
  staves;
  timesignature;
  track!: Sheet.Track;
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
