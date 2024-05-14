import * as SMUFL from "./";

interface IScore {
  type: "Pagination" | "VerticalScroll" | "HorizontalScroll";
  clientWidth?: number;
  tracks: SMUFL.Track[];
  masterBars: SMUFL.MasterBar[];
  rows: SMUFL.Row[];
}
export class Score implements IScore {
  type;
  clientWidth;
  tracks;
  masterBars;
  rows;
  constructor({ type, clientWidth = 0, tracks, masterBars, rows }: IScore) {
    this.type = type;
    this.clientWidth = clientWidth;
    this.tracks = tracks;
    this.masterBars = masterBars;
    this.rows = rows;
  }
}
