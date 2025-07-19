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
  const score = new Sheet.Score({
    name:
      this.mxl["score-partwise"].$$.work?.[0]?.$$?.["work-title"]?.[0]?._ ?? "",
    timesignatures: [],
    keysignatures: [],
    bpms: [],
    tracks:
      this.mxl["score-partwise"].$$.part?.map((part, trackIndex) => {
        const bars = part.$$.measure?.map((measure, i) => {
          const musicData = measure.$$;
          const notes = R.pipe(
            "note" in musicData && musicData.note ? musicData.note : [],
            R.map(
              (note, id) =>
                new Sheet.Note({
                  id,
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
            (i) => {
              const staveNotes = notes.filter(
                (note) => (note.staff?.[0]._ ?? 1) - 1 === i
              );
              const clef = attributes?.[0]?.$$?.clef?.find(
                (clef) => (clef.$?.number ?? 1) === i + 1
              );
              return new Sheet.Stave({
                id: i,
                clef,
                barline:
                  "barline" in musicData ? musicData.barline?.[0] : undefined,
                notes: staveNotes,
              });
            }
          );
          return new Sheet.Bar({
            id: i,
            notes,
            timesignature,
            staffLines: 5,
            staves,
            start: 0,
            duration: 0,
            end: 0,
          });
        });
        return new Sheet.Track({
          id: trackIndex,
          name: part.$?.id ?? "",
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
      })
    );
    return;
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
  for (const masterbar of score.masterbars) {
    for (const bar of masterbar.bars) {
      bar.masterbar = masterbar;
    }
  }
  if (process.env.NODE_ENV === "development") console.log({ sheet: score });
  return score;
};
