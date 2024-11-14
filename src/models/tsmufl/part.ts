import * as SMUFL from "smufl";
export class Part {
  tracks;
  constructor({ tracks }: { tracks: SMUFL.Track[] }) {
    this.tracks = tracks;
  }
}
