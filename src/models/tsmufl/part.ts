import * as SMUFL from ".";
export class Part {
  tracks;
  constructor({ tracks }: { tracks: SMUFL.Track[] }) {
    this.tracks = tracks;
  }
}
