import * as R from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";
import * as MusicXML from "musicxml";
import { NoteType } from "src/const/musicxml/4.0/musicxml";
import { match } from "ts-pattern";

declare module "musicxml" {
  interface MXL {
    toSheet(): Sheet.Score;
  }
}
// TODO:eventの設定ちゃんとやれ
MusicXML.MXL.prototype.toSheet = function (this: MusicXML.MXL) {
  console.log(this);
  const { timesignatures, notes, tracks, bars, staves } = this.mxl[
    "score-partwise"
  ].$$.part?.reduce(
    (acc, cur, trackId) => {
      const bars =
        cur.$$.measure?.map((measure, barId) => {
          const musicData = measure.$$;
          const { notes } = (
            "note" in musicData && musicData.note ? musicData.note : []
          ).reduce(
            (acc, cur, id) => {
              const type = cur.$$.type![0]!;
              const duration = NoteTypeToDuration(type);
              acc.notes.push(
                new Sheet.Note({
                  id,
                  staveId: -1 /* will be set later */,
                  trackId,
                  voice: cur.$$.voice,
                  rest: "rest" in cur.$$ ? cur.$$.rest?.[0] : undefined,
                  chord: "chord" in cur.$$,
                  type,
                  stem: cur.$$.stem?.[0],
                  staff: cur.$$.staff,
                  pitch: new MusicXML.Unit.Pitch({
                    step:
                      "pitch" in cur.$$ && cur.$$.pitch?.[0].$$.step?.[0]._
                        ? cur.$$.pitch[0].$$.step[0]._
                        : "C",
                    octave:
                      "pitch" in cur.$$ && cur.$$.pitch?.[0].$$.octave?.[0]._
                        ? cur.$$.pitch[0].$$.octave[0]._
                        : 0,
                  }).toCore(),
                  start: acc.start,
                  duration,
                })
              );
              acc.start += duration;
              return acc;
            },
            {
              start: 0,
              notes: [] as Sheet.Note[],
            }
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
          const staves = R.times(
            attributes?.[0]?.$$?.staves?.[0]?._ ?? 1,
            (staveId) => {
              const staveNotes = notes.filter(
                (note) => (note.staff?.[0]._ ?? 1) - 1 === staveId
              );
              for (const note of staveNotes) note.staveId = staveId;
              return new Sheet.Stave({
                id: staveId,
                barId,
                trackId,
                clef: attributes?.[0]?.$$?.clef?.find(
                  (clef) => (clef.$?.number ?? 1) === staveId + 1
                ),
                barline:
                  "barline" in musicData ? musicData.barline?.[0] : undefined,
              });
            }
          );
          acc.timesignatures.push(
            new Sheet.Timesignature({
              denominator,
              numerator,
              start: numerator * barId,
              duration: numerator,
            })
          );
          acc.notes.push(...notes);
          acc.staves.push(...staves);
          return new Sheet.Bar({
            id: barId,
            trackId,
            staffLines: 5,
            start: numerator * barId,
            duration: numerator,
          });
        }) ?? [];
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
    {
      notes: [],
      bars: [],
      tracks: [],
      staves: [],
      timesignatures: [],
    } as {
      notes: Sheet.Note[];
      bars: Sheet.Bar[];
      tracks: Sheet.Track[];
      staves: Sheet.Stave[];
      timesignatures: Sheet.Timesignature[];
    }
  ) ?? {
    notes: [],
    bars: [],
    tracks: [],
    staves: [],
    timesignatures: [],
  };
  const score = new Sheet.Score({
    name:
      this.mxl["score-partwise"].$$.work?.[0]?.$$?.["work-title"]?.[0]?._ ?? "",
    keysignatures: [],
    timesignatures,
    bpms: [],
    rows: [],
    staves,
    notes,
    tracks,
    bars,
    masterbars: timesignatures
      .reduce(
        (acc, cur) => {
          acc.events.push(
            ...R.times(Math.ceil(cur.width), () => {
              const event = new Core.Event({
                start: acc.start,
                duration: cur.numerator,
              });
              acc.start += cur.numerator;
              return event;
            })
          );
          return acc;
        },
        { start: 0, events: [] as Core.Event[] }
      )
      .events.map((event, id) => new Sheet.Masterbar({ id, ...event })),
    start: 0,
    duration: 0,
    end: 0,
  });

  if (process.env.NODE_ENV === "development") console.log({ sheet: score });
  return score;
};
function NoteTypeToDuration(noteType: NoteType) {
  return (
    match(noteType._)
      .with("quarter", () => 1)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .exhaustive()
  );
}
