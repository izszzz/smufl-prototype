import * as R from "remeda";
import * as Core from "core";
import * as Sheet from "sheet";
import * as MusicXML from "musicxml";
import { match } from "ts-pattern";
import { prop } from "remeda";

declare module "musicxml" {
  interface MXL {
    toSheet(): Sheet.Score;
  }
}
MusicXML.MXL.prototype.toSheet = function (this: MusicXML.MXL) {
  if (process.env.NODE_ENV === "development") console.log({ mxl: this });
  const { keysignatures, timesignatures, tracks, bars, staves, bpms } =
    this.mxl["score-partwise"].$$.part?.reduce(
      (acc, cur, trackId) => {
        acc.tracks.push({
          id: trackId,
          name: cur.$?.id,
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
                ? Core.Tonality.Minor
                : Core.Tonality.Major;
            const timesignature = {
              denominator,
              numerator,
              start: numerator * barId,
              duration: numerator,
            };
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
            const bpm = tempo
              ? { value: tempo, start: numerator * barId, duration: numerator }
              : undefined;
            const { notes } = (R.prop(musicData, "note") ?? []).reduce(
              (acc, cur) => {
                const duration = R.prop(cur.$$, "duration", "0", "_") as number;
                acc.notes.push({
                  staveId: -1, // will be set later
                  voice: cur.$$.voice,
                  rest: R.prop(cur.$$, "rest", "0"),
                  chord: R.isDefined(R.prop(cur.$$, "chord")),
                  stem: cur.$$.stem?.[0],
                  staff: cur.$$.staff,
                  pitch: new Core.Unit.ScientificPitchNotation(
                    `${
                      R.prop(cur.$$, "pitch", "0", "$$", "step", "0", "_") ??
                      "C"
                    }${match(
                      R.prop(cur.$$, "pitch", "0", "$$", "alter", "at", "_") ??
                        0
                    )
                      .with(1, () => "#")
                      .with(-1, () => "b")
                      .otherwise(() => "")}${
                      R.prop(cur.$$, "pitch", "0", "$$", "octave", "0", "_") ??
                      0
                    }`
                  ).toMidiNoteNumber().value,
                  start: acc.start,
                  duration,
                });
                acc.start += duration;
                return acc;
              },
              {
                start: numerator * barId,
                notes: [] as Parameters<
                  typeof Sheet.Score.create
                >[0]["tracks"][number]["notes"],
              }
            );
            acc.tracks[trackId]?.notes.push(...notes);

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
            acc.timesignatures?.push(timesignature);
            acc.keysignatures?.push(keysignature);
            if (bpm) acc.bpms?.push(bpm);
            acc.staves?.push(...staves);
            return { id: barId, trackId };
          }) ?? [];
        acc.bars?.push(...bars);
        return acc;
      },
      {
        bars: [],
        tracks: [],
        staves: [],
        timesignatures: [],
        keysignatures: [],
        bpms: [],
      } as Parameters<typeof Sheet.Score.create>[0]
    ) ?? {
      bars: [],
      tracks: [],
      staves: [],
      timesignatures: [],
      keysignatures: [],
      bpms: [],
    };
  const params = {
    name:
      this.mxl["score-partwise"].$$.work?.[0]?.$$?.["work-title"]?.[0]?._ ?? "",
    keysignatures,
    timesignatures,
    bpms,
    rows: [],
    staves,
    tracks,
    bars,
  };

  return Sheet.Score.create(params);
};
