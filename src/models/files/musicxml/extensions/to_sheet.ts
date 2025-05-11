import * as R from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";
import * as MusicXML from "musicxml";
import { P, match } from "ts-pattern";

declare module "musicxml" {
  interface MXL {
    toSheet(): Sheet.Score;
  }
}
MusicXML.MXL.prototype.toSheet = function (this: MusicXML.MXL) {
  const score = new Sheet.Score({
    name:
      this.mxl["score-partwise"]?.$$?.work?.[0]?.$$?.["work-title"]?.[0]?._ ??
      "",
    timesignatures: [],
    keysignatures: [],
    bpms: [],
    tracks:
      this.mxl["score-partwise"]?.$$?.part?.map((part, trackIndex) => {
        const bars = part?.$$?.measure?.map((measure, i) => {
          const musicData = measure?.$$;
          const notes = R.pipe(
            musicData ? ("note" in musicData ? musicData.note ?? [] : []) : [],
            R.groupBy((note) => note.$$.staff[0]._),
            R.entries(),
            R.flatMap(([voice, notes]) => {
              let time = 0;
              return notes.map(
                (note, id) =>
                  new Sheet.Note({
                    voice: Number(voice),
                    id,
                    rest: match(note)
                      .with({ $$: { rest: P.not(P.nullish) } }, (note) => {
                        return note.$$.rest[0];
                      })
                      .otherwise(() => undefined),
                    chord: match(note)
                      .with({ $$: { chord: P.not(P.nullish) } }, () => {
                        return true;
                      })
                      .otherwise(() => false),
                    type: note.$$.type?.[0],
                    stem: note.$$.stem?.[0],
                    staff: note.$$.staff[0]._,
                    pitch: match(note)
                      .with({ $$: { pitch: P.not(P.nullish) } }, (note) => {
                        return new MusicXML.Unit.Pitch({
                          step: note.$$.pitch[0].$$.step[0]._,
                          octave: Number(note.$$.pitch[0].$$?.octave),
                        }).toCore();
                      })
                      .otherwise(() =>
                        new MusicXML.Unit.Pitch({
                          step: "C",
                          octave: 0,
                        }).toCore()
                      ),
                    start: time,
                    duration: match(note)
                      .with({ $$: { duration: P.not(P.nullish) } }, (note) => {
                        const duration = Number(note.$$.duration);
                        time += duration;
                        return duration;
                      })
                      .otherwise(() => 0),
                    end: time,
                  })
              );
            })
          );

          const timesignature = new Sheet.Timesignature({
            denominator: 4,
            numerator: 4,
            start: 0,
            duration: 0,
            end: 0,
          });
          const attributes =
            musicData && "attributes" in musicData ? musicData.attributes : [];

          console.log(attributes?.[0]?.$$.staves?.[0]);
          return new Sheet.Bar({
            id: i,
            notes,
            timesignature,
            staffLines: 5,
            staves: R.times(attributes?.[0]?.$$.staves?.[0]?._ ?? 1, (i) => {
              const clef = attributes?.[0]?.$$?.clef?.find(
                (clef) =>
                  Number(
                    clef.$ && "number" in clef.$ ? clef.$.number ?? 1 : 1
                  ) ===
                  i + 1
              );
              return new Sheet.Stave({
                id: i,
                clef,
                barline:
                  musicData && "barline" in musicData
                    ? musicData.barline?.[0]
                    : void 0,
                notes: notes.filter((note) => (note.staff ?? 1) - 1 === i),
              });
            }),
            width: 0,
            start: 0,
            duration: 0,
            end: 0,
          });
        });
        return new Sheet.Track({
          id: trackIndex,
          name: part?.$?.id?._ ?? "",
          notes: bars?.flatMap((bar) => bar.notes) ?? [],
          bars: bars ?? [],
          preset: new Core.Unit.Preset(0),
          staffLines: 5,
          start: 0,
          duration: 0,
          end: 0,
        });
      }) ?? [],
    start: 0,
    duration: 0,
    end: 0,
  });

  const maxLengthBarsTrack =
    R.firstBy(score.tracks, [(track) => track.bars.length, "desc"])?.bars
      .length ?? 0;

  R.times(maxLengthBarsTrack, (i) => {
    const bars = R.times(score.tracks.length, (j) => score.tracks[j]!.bars[i]!);
    score.masterbars.push(
      new Sheet.Masterbar({
        id: i,
        bars,
        width: 0,
      })
    );
  });

  for (const track of score.tracks) {
    for (const bar of track.bars) {
      bar.track = track;
      for (const stave of bar.staves) {
        stave.bar = bar;
        for (const note of stave.notes) note.stave = stave;
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
