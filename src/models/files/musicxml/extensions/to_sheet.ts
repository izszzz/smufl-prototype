import * as R from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";
import * as MusicXML from "musicxml";

declare module "musicxml" {
  interface MXL {
    toSheet(): Sheet.Score;
  }
}
MusicXML.MXL.prototype.toSheet = function (this: MusicXML.MXL) {
  const { notes, tracks, bars, staves, maxBarLength } = this.mxl[
    "score-partwise"
  ].$$.part?.reduce(
    (acc, cur, trackId) => {
      const bars =
        cur.$$.measure?.map((measure, barId) => {
          const musicData = measure.$$;
          const notes = R.pipe(
            "note" in musicData && musicData.note ? musicData.note : [],
            R.map(
              (note, id) =>
                new Sheet.Note({
                  id,
                  staveId: -1 /* will be set later */,
                  barId,
                  trackId,
                  voice: note.$$.voice,
                  rest: "rest" in note.$$ ? note.$$.rest?.[0] : undefined,
                  chord: "chord" in note.$$,
                  type: note.$$.type?.[0],
                  stem: note.$$.stem?.[0],
                  staff: note.$$.staff,
                  pitch: new MusicXML.Unit.Pitch({
                    step:
                      "pitch" in note.$$ && note.$$.pitch?.[0].$$.step?.[0]._
                        ? note.$$.pitch[0].$$.step[0]._
                        : "C",
                    octave:
                      "pitch" in note.$$ && note.$$.pitch?.[0].$$.octave?.[0]._
                        ? note.$$.pitch[0].$$.octave[0]._
                        : 0,
                  }).toCore(),
                  start: 0,
                  duration:
                    "duration" in note.$$ ? Number(note.$$.duration?.[0]._) : 0,
                  end: 0,
                })
            )
          );
          acc.notes.push(...notes);

          const attributes =
            "attributes" in musicData ? musicData.attributes : [];
          const time = attributes?.[0]?.$$.time?.[0];
          const denominator = Number(
            (time?.$$ && "beat-type" in time.$$
              ? time.$$["beat-type"]?.[0]._
              : 4) ?? 4
          );
          const numerator = Number(
            (time?.$$ && "beats" in time.$$ ? time.$$.beats?.[0]._ : 4) ?? 4
          );
          const timesignature = new Sheet.Timesignature({
            denominator,
            numerator,
            start: 0,
            duration: 0,
            end: 0,
          });
          const staves = R.times(
            attributes?.[0]?.$$?.staves?.[0]?._ ?? 1,
            (staveId) => {
              const staveNotes = notes.filter(
                (note) => (note.staff?.[0]._ ?? 1) - 1 === staveId
              );
              console.log(staveNotes);
              for (const note of staveNotes) {
                note.staveId = staveId;
              }
              return new Sheet.Stave({
                id: staveId,
                barId,
                clef: attributes?.[0]?.$$?.clef?.find(
                  (clef) => (clef.$?.number ?? 1) === staveId + 1
                ),
                barline:
                  "barline" in musicData ? musicData.barline?.[0] : undefined,
              });
            }
          );
          acc.staves.push(...staves);
          return new Sheet.Bar({
            id: barId,
            trackId,
            masterbarId: barId,
            timesignature,
            staffLines: 5,
            start: 0,
            duration: 0,
            end: 0,
          });
        }) ?? [];
      if (acc.maxBarLength < bars.length) acc.maxBarLength = bars.length;
      acc.bars.push(...bars);
      acc.tracks.push(
        new Sheet.Track({
          id: trackId,
          name: cur.$?.id ?? "",
          preset: new Core.Unit.Preset(0),
          staffLines: 5,
          start: 0,
          duration: 0,
          end: 0,
        })
      );
      return acc;
    },
    { notes: [], bars: [], tracks: [], staves: [], maxBarLength: 0 } as {
      notes: Sheet.Note[];
      bars: Sheet.Bar[];
      tracks: Sheet.Track[];
      staves: Sheet.Stave[];
      maxBarLength: number;
    }
  ) ?? { notes: [], bars: [], tracks: [], staves: [], maxBarLength: 0 };
  const score = new Sheet.Score({
    name:
      this.mxl["score-partwise"].$$.work?.[0]?.$$?.["work-title"]?.[0]?._ ?? "",
    timesignatures: [],
    keysignatures: [],
    bpms: [],
    rows: [],
    staves,
    notes,
    tracks,
    bars,
    masterbars: R.times(maxBarLength, (i) => new Sheet.Masterbar({ id: i })),
    start: 0,
    duration: 0,
    end: 0,
  });

  for (const track of score.tracks) {
    for (const bar of track.bars) {
      for (const note of bar.notes) {
        note.barId = bar.id;
      }
      for (const stave of bar.staves) {
        stave.barId = bar.id;
      }
    }
  }
  for (const masterbar of score.masterbars) {
    for (const bar of masterbar.bars) {
      bar.masterbarId = masterbar.id;
    }
  }
  if (process.env.NODE_ENV === "development") console.log({ sheet: score });
  return score;
};
