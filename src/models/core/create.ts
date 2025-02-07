import * as R from "remeda";
import * as Core from "core";
import { LiteralToPrimitiveDeep, PartialDeep, SetOptional } from "type-fest";

type JSONParams = SetOptional<
  Pick<Core.Score, "start" | "duration" | "end">,
  "start" | "duration" | "end"
> & {
  tracks: (SetOptional<
    Omit<Core.Track, "score" | "id" | "notes">,
    "preset" | "start" | "duration" | "end"
  > & {
    notes: (SetOptional<
      Omit<Core.Track["notes"][number], "id" | "pitch">,
      "duration" | "end" | "start"
    > & { pitch: number | Core.Unit.Pitch })[];
  })[];
  keysignatures?: SetOptional<
    Core.Keysignature,
    "duration" | "end" | "start"
  >[];
  timesignatures?: SetOptional<
    Core.Timesignature,
    "duration" | "end" | "start"
  >[];
  bpms?: (Omit<SetOptional<Core.Bpm, "duration" | "end" | "start">, "value"> & {
    value: number | Core.Unit.Bpm;
  })[];
};

export const create = (
  params: JSONParams,
  options: {
    defaultValue: PartialDeep<
      LiteralToPrimitiveDeep<typeof Core.Metadata.defaultValue>
    >;
  } = { defaultValue: {} }
) => {
  const defaultValue = R.mergeDeep(
    options.defaultValue,
    Core.Metadata.defaultValue
  );
  for (const track of params.tracks) {
    for (const note of track.notes) {
      if (R.isNonNullish(note.end) && R.isNonNullish(note.duration))
        note.start ??= note.end - note.duration;
      if (R.isNonNullish(note.start) && R.isNonNullish(note.duration))
        note.end ??= note.duration + note.start;
      if (R.isNonNullish(note.end) && R.isNonNullish(note.start))
        note.duration ??= note.end - note.start;
    }
    track.preset ??= defaultValue.track.preset;
    track.start ??=
      R.isNonNullish(track.end) && R.isNonNullish(track.duration)
        ? track.end - track.duration
        : params.start ?? 0;
    track.end ??=
      R.isNonNullish(track.start) && R.isNonNullish(track.duration)
        ? track.start + track.duration
        : params.end ??
          R.firstBy(track.notes, [(note) => note.end ?? 0, "desc"])?.end ??
          0;
    track.duration ??= track.end - track.start;
  }
  params.start ??= 0;
  params.end ??=
    R.firstBy(params.tracks, [(track) => track.end!, "desc"])?.end ?? 0;
  params.duration ??= params.end - params.start;
  for (const key of ["keysignatures", "timesignatures", "bpms"] as const) {
    params[key] ??= [];
    if (!R.hasAtLeast(params[key] ?? [], 1))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      params[key]?.push({ ...defaultValue[key] });
    for (const [i, keyParams] of (params[key] ?? []).entries()) {
      const prev = params[key]?.[i - 1];
      if (prev) prev.end = keyParams.start;
      if (i === 0) keyParams.start ??= params.start;
      if (params[key]?.length === i + 1) keyParams.end ??= params.end;
    }
    for (const keyParams of params[key] ?? []) {
      if (R.isNonNullish(keyParams.end) && R.isNonNullish(keyParams.duration))
        keyParams.start ??= keyParams.end - keyParams.duration;
      if (R.isNonNullish(keyParams.start) && R.isNonNullish(keyParams.duration))
        keyParams.end ??= keyParams.duration + keyParams.start;
      if (R.isNonNullish(keyParams.end) && R.isNonNullish(keyParams.start))
        keyParams.duration ??= keyParams.end - keyParams.start;
    }
  }

  const cparams = params as JSONParams;
  const core = new Core.Score({
    ...cparams,
    timesignatures:
      cparams.timesignatures?.map(
        (timesignature) =>
          new Core.Timesignature({
            ...timesignature,
            start: timesignature.start ?? 0,
            duration: timesignature.duration ?? 0,
            end: timesignature.end ?? 0,
          })
      ) ?? [],
    keysignatures:
      cparams.keysignatures?.map(
        (keysignature) =>
          new Core.Keysignature({
            ...keysignature,
            start: keysignature.start ?? 0,
            duration: keysignature.duration ?? 0,
            end: keysignature.end ?? 0,
          })
      ) ?? [],
    bpms:
      cparams.bpms?.map(
        (bpm) =>
          new Core.Bpm({
            ...bpm,
            value: R.isNumber(bpm.value)
              ? new Core.Unit.Bpm(bpm.value)
              : bpm.value,
            start: bpm.start ?? 0,
            duration: bpm.duration ?? 0,
            end: bpm.end ?? 0,
          })
      ) ?? [],
    tracks: cparams.tracks.map(
      (track, id) =>
        new Core.Track({
          ...track,
          id,
          notes: track.notes.map(
            (note, id) =>
              new Core.Note({
                ...note,
                pitch: R.isNumber(note.pitch)
                  ? new Core.Unit.Pitch(note.pitch)
                  : note.pitch,
                id,
                start: note.start ?? 0,
                duration: note.duration ?? 0,
                end: note.end ?? 0,
              })
          ),
          start: track.start ?? 0,
          duration: track.duration ?? 0,
          end: track.end ?? 0,
          preset: track.preset ?? 0,
        })
    ),
    start: cparams.start ?? 0,
    duration: cparams.duration ?? 0,
    end: cparams.end ?? 0,
  });
  if (process.env.NODE_ENV === "development") console.log(core);
  return core;
};
