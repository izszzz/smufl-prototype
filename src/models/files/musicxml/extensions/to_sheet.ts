import * as R from "remeda";
import * as Sheet from "sheet";
import * as MusicXML from "musicxml";

declare module "musicxml" {
  interface MXL {
    toSheet: () => Sheet.Score;
  }
}

MusicXML.MXL.prototype.toSheet = function (this: MusicXML.MXL) {
  console.log(this);
  const score = new Sheet.Score({
    name: this.scorePartwise.work.workTitle,
    timesignatures: [],
    keysignatures: [],
    bpms: [],
    tracks: this.scorePartwise.part.map((part, trackIndex) => {
      const bars = part.measure.map((measure, i) => {
        const staffDistance =
          Number(
            measure.print[0].staffLayout?.find((s) => s.$.number[0] === "1")
              ?.staffDistance?.[0] ?? 0
          ) /
            10 +
          trackIndex * 4;
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
                    x: note.$.defaultX ? Number(note.$.defaultX) / 10 : 0,
                    y: note.$.defaultY
                      ? Number(note.$.defaultY) / 10 + staffDistance
                      : 0,
                    pitch: new MusicXML.Unit.Pitch(
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
          staves: R.times(measure.attributes[0].staves?.[0] ?? 1, (i) => {
            const clef = measure.attributes[0].clef.find(
              (clef) => Number(clef?.$?.number ?? 1) === i + 1
            );
            return new Sheet.Stave({
              id: i,
              clef: {
                sign: clef.sign[0],
                line: clef.line[0],
                number: clef.$?.number[0] ?? 1,
              },
              barline: measure.barline[0],
            });
          }),
          width: Number(measure.$.width ?? 0) / 10,
          start: 0,
          duration: 0,
          end: 0,
        });
      });
      return new Sheet.Track({
        id: trackIndex,
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
      for (const stave of bar.staves) {
        stave.bar = bar;
      }
      for (const note of bar.notes) {
        note.track = track;
        note.bar = bar;
      }
    }
  }
  if (process.env.NODE_ENV === "development") console.log({ sheet: score });
  return score;
};
