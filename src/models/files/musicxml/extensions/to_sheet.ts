import * as Core from "core";
import * as Sheet from "sheet";
import * as MusicXML from "musicxml";
import { match, P } from "ts-pattern";
import {
  flatMap,
  add,
  pipe,
  prop,
  reduce,
  take,
  map,
  isNullish,
  isDefined,
  last,
  piped,
  groupBy,
  defaultTo,
  entries,
  times,
  doNothing,
} from "remeda";
import { MidiNoteNumber } from "../../../core/units";
import { StaffDetails } from "src/const/musicxml/4.0/musicxml";

declare module "musicxml" {
  interface MXL {
    toSheet(): Sheet.Score;
  }
}
MusicXML.MXL.prototype.toSheet = function (this: MusicXML.MXL) {
  if (process.env.NODE_ENV === "development") console.log({ mxl: this });
  const { beams, keysignatures, timesignatures, tracks, bars, staves, tempos } =
    this.mxl["score-partwise"].$$.part?.reduce(
      (partAcc, cur, trackId) => {
        const scorePart = this.mxl["score-partwise"].$$["part-list"]?.[0].$$[
          "score-part"
        ]?.find((scorePart) => scorePart.$?.id === cur.$?.id);
        const partName = scorePart?.$$["part-name"]?.[0];
        partAcc.tracks.push({
          name: partName?.$?.["print-object"] === "no" ? "" : partName?._ ?? "",
          preset: 0,
          notes: [],
          staffDetails: <StaffDetails>{
            $$: {
              "staff-lines": [{ _: 5 }],
            },
          },
        });
        const { bars } = cur.$$.measure?.reduce(
          (measureAcc, cur, barId) => {
            const musicData = cur.$$;
            const attributes = prop(musicData, "attributes") ?? [];
            const division = attributes[0]?.$$?.divisions?.[0]?._ as number;
            const staffDetails = attributes[0]?.$$["staff-details"]?.[0];
            const time = attributes[0]?.$$.time?.[0];
            const key = attributes[0]?.$$.key?.[0];
            const tempo = prop(
              musicData,
              "direction",
              0,
              "$$",
              "sound",
              0,
              "$",
              "tempo"
            );
            if (partAcc.tracks[trackId])
              partAcc.tracks[trackId].staffDetails = staffDetails ?? {
                $$: { "staff-lines": [{ _: 5 }] },
              };
            if (time)
              partAcc.timesignatures?.push({
                denominator: Number(prop(time.$$, "beat-type", "0", "_")),
                numerator: Number(prop(time.$$, "beats", "0", "_")),
                start: Number(prop(time.$$, "beats", "0", "_")) * barId,
              });
            if (key)
              partAcc.keysignatures?.push({
                accidental: prop(key.$$, "fifths", "0", "_") ?? 0,
                tonality:
                  prop(key.$$, "mode", "at", "_") === "minor"
                    ? Core.Enums.Tonality.Minor
                    : Core.Enums.Tonality.Major,
                start: partAcc.timesignatures!.at(-1)!.numerator * barId,
              });
            if (tempo)
              partAcc.tempos?.push({
                value: tempo,
                start: partAcc.timesignatures!.at(-1)!.numerator * barId,
              });
            if (division) measureAcc.division = division;
            const notes = pipe(
              prop(musicData, "note") ?? [],
              groupBy(piped(prop("$$", "staff", 0, "_"), defaultTo(1))),
              entries(),
              flatMap(
                piped(
                  last(),
                  groupBy(piped(prop("$$", "voice", 0, "_"))),
                  entries()
                )
              ),
              map(
                piped(last(), (last) =>
                  last.reduce(
                    (acc, cur, i, array) => {
                      const duration =
                        (prop(cur.$$, "duration", "0", "_") as number) /
                        measureAcc.division;
                      const rest = isDefined(prop(cur.$$, "rest", "0"));
                      const param = {
                        staveId: (prop(cur, "$$", "staff", 0, "_") ?? 1) - 1,
                        velocity: 102,
                        voice: Number(cur.$$.voice?.[0]._ ?? 1),
                        rest,
                        stem: cur.$$.stem?.[0],
                        beam: cur.$$.beam,
                        chord: isDefined(prop(cur.$$, "chord")),
                        pitch: rest
                          ? new MidiNoteNumber(-1).value
                          : new Core.Units.ScientificPitchNotation(
                              `${
                                prop(
                                  cur.$$,
                                  "pitch",
                                  "0",
                                  "$$",
                                  "step",
                                  "0",
                                  "_"
                                ) ?? "C"
                              }${match(
                                prop(
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
                                prop(
                                  cur.$$,
                                  "pitch",
                                  "0",
                                  "$$",
                                  "octave",
                                  "0",
                                  "_"
                                ) ?? 0
                              }`
                            ).toMidiNoteNumber().value,
                        start: pipe(
                          array,
                          take(i + 1),
                          reduce(
                            (acc, cur, i, array) =>
                              isNullish(array[i - 1]) ||
                              isDefined(prop(cur.$$, "chord"))
                                ? acc
                                : acc +
                                  (prop(
                                    array[i - 1]!.$$,
                                    "duration",
                                    "0",
                                    "_"
                                  ) as number) /
                                    measureAcc.division,
                            0
                          ),
                          add(partAcc.timesignatures!.at(-1)!.numerator * barId)
                        ),
                        duration,
                      };
                      acc.notes.push(param);
                      return acc;
                    },
                    {
                      start: partAcc.timesignatures!.at(-1)!.numerator * barId,
                      notes: [] as Parameters<
                        typeof Sheet.Score.create
                      >[0]["tracks"][number]["notes"],
                    }
                  )
                )
              ),
              flatMap(prop("notes"))
            );
            const beams = pipe(
              prop(musicData, "note") ?? [],
              reduce(
                (acc, cur, noteId) => {
                  match(cur)
                    .with({ $$: { beam: [] } }, doNothing)
                    .otherwise((note) => {
                      for (const beam of note.$$.beam ?? []) {
                        const level = Number(beam.$?.number) - 1;
                        match(beam._)
                          .with("begin", () => {
                            acc?.push({
                              barId,
                              voice: Number(cur.$$.voice?.[0]._ ?? 0),
                              noteIds: [noteId],
                              staveId:
                                (prop(cur, "$$", "staff", 0, "_") ?? 1) - 1,
                              trackId,
                              level,
                            });
                          })
                          .with(P.union("continue", "end"), () => {
                            acc
                              ?.findLast((beam) => beam.level === level)
                              ?.noteIds.push(noteId);
                          })
                          .exhaustive();
                      }
                    });
                  return acc;
                },
                [] as Parameters<typeof Sheet.Score.create>[0]["beams"]
              )
            );

            partAcc.tracks[trackId]?.notes.push(...notes);

            const staves = times(
              attributes[0]?.$$?.staves?.[0]?._ ?? 1,
              (staveId) => {
                const staveNotes = notes
                  .flat()
                  .filter((note) => note.staveId === staveId);
                for (const note of staveNotes) note.staveId = staveId;
                return new Sheet.Stave({
                  id: staveId,
                  barId,
                  trackId,
                  clefs: attributes[0]?.$$?.clef?.filter(
                    (clef) => (clef.$?.number ?? 1) === staveId + 1
                  ),
                });
              }
            );
            partAcc.staves?.push(...staves);
            if (beams) partAcc.beams?.push(...beams);
            measureAcc.bars.push({ id: barId, trackId });
            return measureAcc;
          },
          {
            bars: [] as NonNullable<
              Parameters<typeof Sheet.Score.create>[0]["bars"]
            >,
            division: -1,
          }
        ) ?? { bars: [] };
        partAcc.bars?.push(...bars);
        return partAcc;
      },
      {
        bars: [],
        beams: [],
        tracks: [],
        staves: [],
        timesignatures: [],
        keysignatures: [],
        tempos: [],
      } as Parameters<typeof Sheet.Score.create>[0]
    ) ?? {
      bars: [],
      tracks: [],
      staves: [],
      timesignatures: [],
      keysignatures: [],
      tempos: [],
      beams: [],
    };
  const params = {
    name:
      this.mxl["score-partwise"].$$.work?.[0]?.$$?.["work-title"]?.[0]?._ ?? "",
    keysignatures,
    timesignatures,
    bpms: tempos,
    rows: [],
    staves,
    tracks,
    bars,
    beams,
  };

  return Sheet.Score.create(params, { defaultValue: {} });
};
