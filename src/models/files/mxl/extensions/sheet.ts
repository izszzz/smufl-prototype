import * as Sheet from "sheet";
import { MusicXml, Unit } from "../";

declare module "../" {
  interface MusicXml {
    toSheet: (options: { ratio: number }) => Sheet.Score;
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
        const notes =
          "note" in measure
            ? measure.note.map(
                (note, id) =>
                  new Sheet.Note({
                    id,
                    rest:
                      "rest" in note
                        ? note.rest[0] && "measure" in note.rest[0].$
                          ? "measure"
                          : true
                        : false,
                    chord: "chord" in note,
                    type: "type" in note ? note.type[0] : null,
                    stem: "stem" in note ? note.stem[0] : null,
                    x: Number(note.$.defaultX ?? 0),
                    y: Number(note.$.defaultY ?? 0),
                    pitch: new Unit.Pitch(
                      "pitch" in note
                        ? {
                            step: note.pitch[0].step[0],
                            octave: Number(note.pitch[0].octave[0]),
                          }
                        : { step: "C", octave: 0 }
                    ).toCore(),
                    start: 0,
                    duration: "duration" in note ? Number(note.duration[0]) : 0,
                    end: 0,
                  })
              )
            : [];
        const timesignature = new Sheet.Timesignature({
          denominator: 4,
          numerator: 4,
          start: 0,
          duration: 0,
          end: 0,
        });
        return new Sheet.Bar({
          id: i,
          notes,
          timesignature,
          staffLines: 5,
          clefs: measure.attributes[0].clef.map((clef) => ({
            sign: clef.sign[0],
            line: clef.line[0],
            number: clef.$?.number[0],
          })),
          barlines: measure.barline,
          width: Number(measure.$.width ?? 0),
          start: 0,
          duration: 0,
          end: 0,
        });
      });
      return new Sheet.Track({
        id,
        name: part.$.id,
        notes: bars.flatMap((bar) => bar.notes),
        bars,
        preset: 0,
        staffLines: 5,
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
      for (const note of bar.notes) {
        note.track = track;
        note.bar = bar;
      }
    }
  }
  console.log({ sheet: score });
  return score;
};
