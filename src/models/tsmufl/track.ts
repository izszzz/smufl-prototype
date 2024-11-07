import * as Core from "../core";
import * as SMUFL from ".";

export class Track extends Core.Track<SMUFL.Note> {
  bars: SMUFL.Bar[] = [];
  clef = new SMUFL.Clef();
}
