import * as Sheet from "sheet";
import { MusicXml } from "../";

declare module "../" {
  interface MusicXml {
    toSheet: () => Sheet.Score;
  }
}

MusicXml.prototype.toSheet = function (this: MusicXml) {
  const score = new Sheet.Score({
    name: this.scorePartwise.work.workTitle,
    timesignatures: [],
    keysignatures: [],
    bpms: [],
    tracks: this.scorePartwise.part.map((part, id) => {
      const bars = part.measure.map((measure, i) => {
        console.log(measure);
        const notes =
          "note" in measure
            ? measure.note.map(
                (note, id) =>
                  new Sheet.Note({
                    id,
                    rest: "rest" in note,
                    chord: "chord" in note,
                    pitch: 0,
                    start: 0,
                    duration: 0,
                    end: 0,
                  })
              )
            : [];

        return new Sheet.Bar({ id: i, notes, start: 0, duration: 0, end: 0 });
      });
      return new Sheet.Track({
        id,
        name: part.$.id,
        notes: bars.flatMap((bar) => bar.notes),
        bars,
        preset: 0,
        start: 0,
        duration: 0,
        end: 0,
      });
    }),
    start: 0,
    duration: 0,
    end: 0,
  });
  for (const track of score.tracks) {
    for (const bar of track.bars) {
      bar.track = track;
    }
  }
  return score;
};
