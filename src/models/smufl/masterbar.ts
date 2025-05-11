import * as Sheet from "sheet";
import * as SMUFL from "smufl";

export class Masterbar<
  Note extends Sheet.Note = Sheet.Note,
  Stave extends SMUFL.Stave = SMUFL.Stave,
> extends Sheet.Masterbar<Note, Stave, Sheet.Bar<Note, Stave>> {}
