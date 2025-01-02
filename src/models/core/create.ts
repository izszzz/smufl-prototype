import * as R from "remeda";
import * as Core from ".";
import { LiteralToPrimitiveDeep, PartialDeep, SetOptional } from "type-fest";

type Params = SetOptional<
  Pick<Core.Score, "start" | "duration" | "end">,
  "start" | "duration" | "end"
> & {
  tracks: (SetOptional<
    Omit<Core.Track, "score" | "id" | "notes">,
    "preset" | "start" | "duration" | "end"
  > & {
    notes: SetOptional<
      Omit<Core.Track["notes"][number], "id">,
      "duration" | "end" | "start"
    >[];
  })[];
  keysignatures?: SetOptional<
    Core.Keysignature,
    "duration" | "end" | "start"
  >[];
  timesignatures?: SetOptional<
    Core.Timesignature,
    "duration" | "end" | "start"
  >[];
  bpms?: SetOptional<Core.Bpm, "duration" | "end" | "start">[];
};
export const create = (
  params: Params,
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

  const cparams = params as ConstructorParameters<typeof Core.Score>[0];
  const core = new Core.Score({
    ...cparams,
    timesignatures: cparams.timesignatures.map(
      (timesignature) => new Core.Timesignature(timesignature)
    ),
    keysignatures: cparams.keysignatures.map(
      (keysignature) => new Core.Keysignature(keysignature)
    ),
    bpms: cparams.bpms.map((bpm) => new Core.Bpm(bpm)),
    tracks: cparams.tracks.map(
      (track, id) =>
        new Core.Track({
          ...track,
          id,
          notes: track.notes.map((note, id) => new Core.Note({ ...note, id })),
        })
    ),
  });
  console.log(core);
  return core;
};
