import * as R from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";
import * as MusicXML from "musicxml";
import { match } from "ts-pattern";

declare module "musicxml" {
  interface MXL {
    toSheet(): Sheet.Score;
  }
}
// TODO:eventの設定ちゃんとやれ
MusicXML.MXL.prototype.toSheet = function (this: MusicXML.MXL) {
  console.log(this);
  const { keysignatures, timesignatures, notes, tracks, bars, staves } =
    this.mxl["score-partwise"].$$.part?.reduce(
      (acc, cur, trackId) => {
        const bars =
          cur.$$.measure?.map((measure, barId) => {
            const musicData = measure.$$;
            const attributes = R.prop(musicData, "attributes") ?? [];
            const time = attributes[0]?.$$.time?.[0];
            const key = attributes[0]?.$$.key?.[0];
            const denominator = Number(
              R.prop(time?.$$, "beat-type", "0", "_") ?? 4
            );
            const numerator = Number(R.prop(time?.$$, "beats", "0", "_") ?? 4);
            const accidental = R.prop(key?.$$, "fifths", "0", "_") ?? 0;
            const tonality =
              R.prop(key?.$$, "mode", "at", "_") === "minor"
                ? Core.Tonality.Minor
                : Core.Tonality.Major;
            const timesignature = new Sheet.Timesignature({
              denominator,
              numerator,
              start: numerator * barId,
              duration: numerator,
            });
            const keysignature = new Sheet.Keysignature({
              accidental,
              tonality,
              start: numerator * barId,
              duration: numerator,
            });
            const { notes } = (R.prop(musicData, "note") ?? []).reduce(
              (acc, cur, id) => {
                const duration = R.prop(cur.$$, "duration", "0", "_") as number;

                acc.notes.push(
                  new Sheet.Note({
                    id,
                    staveId: -1 /* will be set later */,
                    trackId,
                    voice: cur.$$.voice,
                    rest: R.prop(cur.$$, "rest", "0"),
                    chord: R.isDefined(R.prop(cur.$$, "chord")),
                    stem: cur.$$.stem?.[0],
                    staff: cur.$$.staff,
                    pitch: new Sheet.Pitch({
                      midiNoteNumber: new Core.Unit.ScientificPitchNotation(
                        `${
                          R.prop(
                            cur.$$,
                            "pitch",
                            "0",
                            "$$",
                            "step",
                            "0",
                            "_"
                          ) ?? "C"
                        }${match(
                          R.prop(
                            cur.$$,
                            "pitch",
                            "0",
                            "$$",
                            "alter",
                            "at",
                            "_"
                          ) ?? 0
                        )
                          .with(1, () => "#")
                          .with(-1, () => "b")
                          .otherwise(() => "")}${
                          R.prop(
                            cur.$$,
                            "pitch",
                            "0",
                            "$$",
                            "octave",
                            "0",
                            "_"
                          ) ?? 0
                        }`
                      ).toMidiNoteNumber(),
                    }),
                    start: acc.start,
                    duration,
                  })
                );
                acc.start += duration;
                return acc;
              },
              {
                start: numerator * barId,
                notes: [] as Sheet.Note[],
              }
            );

            const staves = R.times(
              attributes[0]?.$$?.staves?.[0]?._ ?? 1,
              (staveId) => {
                const staveNotes = notes.filter(
                  (note) => (note.staff?.[0]._ ?? 1) - 1 === staveId
                );
                for (const note of staveNotes) note.staveId = staveId;
                return new Sheet.Stave({
                  id: staveId,
                  barId,
                  trackId,
                  clef: attributes[0]?.$$?.clef?.find(
                    (clef) => (clef.$?.number ?? 1) === staveId + 1
                  ),
                  barline:
                    "barline" in musicData ? musicData.barline?.[0] : undefined,
                });
              }
            );
            acc.timesignatures.push(timesignature);
            acc.keysignatures.push(keysignature);
            acc.notes.push(...notes);
            acc.staves.push(...staves);
            return new Sheet.Bar({ id: barId, trackId });
          }) ?? [];
        acc.bars.push(...bars);
        acc.tracks.push(
          new Sheet.Track({
            id: trackId,
            name: cur.$?.id,
            preset: new Core.Unit.Preset(0),
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
        keysignatures: [],
      } as {
        notes: Sheet.Note[];
        bars: Sheet.Bar[];
        tracks: Sheet.Track[];
        staves: Sheet.Stave[];
        timesignatures: Sheet.Timesignature[];
        keysignatures: Sheet.Keysignature[];
      }
    ) ?? {
      notes: [],
      bars: [],
      tracks: [],
      staves: [],
      timesignatures: [],
      keysignatures: [],
    };
  const score = new Sheet.Score({
    name:
      this.mxl["score-partwise"].$$.work?.[0]?.$$?.["work-title"]?.[0]?._ ?? "",
    keysignatures,
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
