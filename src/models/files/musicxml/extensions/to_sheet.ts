import * as R from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";
import * as MusicXML from "musicxml";
import { match } from "ts-pattern";
import {
  flatMap,
  firstBy,
  add,
  isArray,
  pipe,
  prop,
  reduce,
  take,
  map,
  isTruthy,
  filter,
  identity,
  isNullish,
  isDefined,
  last,
  piped,
} from "remeda";
import { MidiNoteNumber } from "../../../core/units";

declare module "musicxml" {
  interface MXL {
    toSheet(): Sheet.Score;
  }
}
MusicXML.MXL.prototype.toSheet = function (this: MusicXML.MXL) {
  if (process.env.NODE_ENV === "development") console.log({ mxl: this });
  const { keysignatures, timesignatures, tracks, bars, staves, tempos } =
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
        });
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
                ? Core.Enums.Tonality.Minor
                : Core.Enums.Tonality.Major;
            const timesignature = {
              denominator,
              numerator,
              start: numerator * barId,
              duration: numerator,
            };

            if (trackId === 0) partAcc.timesignatures?.push(timesignature);
            const keysignature = {
              accidental,
              tonality,
              start: numerator * barId,
              duration: numerator,
            };
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
            const divistion = (attributes[0]?.$$?.divisions?.[0]?._ ??
              1) as number;
            const bpm = tempo
              ? { value: tempo, start: numerator * barId, duration: numerator }
              : undefined;
            const notes = R.pipe(
              R.prop(musicData, "note") ?? [],
              R.groupBy(R.piped(R.prop("$$", "staff", 0, "_"), R.defaultTo(1))),
              R.entries(),
              R.map(
                piped(last(), (last) =>
                  last.reduce(
                    (acc, cur, i, array) => {
                      const duration =
                        (prop(cur.$$, "duration", "0", "_") as number) /
                        divistion;
                      const rest = isDefined(prop(cur.$$, "rest", "0"));
                      const param = {
                        staveId: (prop(cur, "$$", "staff", 0, "_") ?? 1) - 1,
                        velocity: 102,
                        voice: Number(cur.$$.voice?.[0]._ ?? 1),
                        rest,
                        stem: cur.$$.stem?.[0],
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
                          reduce((acc, cur, i, array) => {
                            if (
                              isNullish(array[i - 1]) ||
                              isDefined(R.prop(cur.$$, "chord"))
                            )
                              return acc;
                            return (
                              acc +
                              (prop(
                                array[i - 1]!.$$,
                                "duration",
                                "0",
                                "_"
                              ) as number) /
                                divistion
                            );
                          }, 0),
                          add(
                            partAcc.tracks[trackId]?.notes.reduce(
                              (acc, cur) =>
                                acc +
                                (isArray(cur)
                                  ? pipe(
                                      cur,
                                      map(prop("duration")),
                                      filter(isTruthy),
                                      firstBy([identity(), "desc"])
                                    )!
                                  : cur.duration!),
                              0
                            ) ?? 0
                          )
                        ),
                        duration,
                      };

                      if (isDefined(prop(cur.$$, "chord"))) {
                        const last = acc.notes.at(-1);
                        if (isArray(last)) last.push(param);
                        else if (last)
                          acc.notes[acc.notes.length - 1] = [param, last];
                      } else {
                        acc.notes.push(param);
                      }

                      return acc;
                    },
                    {
                      start: numerator * barId,
                      notes: [] as Parameters<
                        typeof Sheet.Score.create
                      >[0]["tracks"][number]["notes"],
                    }
                  )
                )
              ),
              flatMap(prop("notes"))
            );

            partAcc.tracks[trackId]?.notes.push(...notes);

            const staves = R.times(
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
                  clef: attributes[0]?.$$?.clef?.find(
                    (clef) => (clef.$?.number ?? 1) === staveId + 1
                  ),
                });
              }
            );
            partAcc.keysignatures?.push(keysignature);
            if (bpm) partAcc.tempos?.push(bpm);
            partAcc.staves?.push(...staves);
            return { id: barId, trackId };
          }) ?? [];
        partAcc.bars?.push(...bars);
        return partAcc;
      },
      {
        bars: [],
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
  };

  return Sheet.Score.create(params);
};
