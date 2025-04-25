import * as Sheet from "sheet";
import { Masterbar } from "./masterbar";
import { Stave } from "./stave";

export class Score<
  Note extends Sheet.Note = Sheet.Note,
  Bar extends Sheet.Bar<Note, Stave> = Sheet.Bar<Note, Stave>,
  Track extends Sheet.Track<Note, Bar> = Sheet.Track<Note, Bar>,
> extends Sheet.Score<Note, Track> {
  masterbars: Masterbar<Bar>[] = [];
}
