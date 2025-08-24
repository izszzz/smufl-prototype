import { match } from "ts-pattern";
import { SetOptional, LiteralToPrimitiveDeep, PartialDeep } from "type-fest";
import {
  isDefined,
  prop,
  pipe,
  flatMap,
  firstBy,
  isEmpty,
  mergeDeep,
  isNullish,
} from "remeda";
import * as Core from "core";
export class Score<
  Note extends Core.Note = Core.Note,
  Track extends Core.Track = Core.Track,
  Timesignature extends Core.Timesignature = Core.Timesignature,
  Keysignature extends Core.Keysignature = Core.Keysignature,
  Bpm extends Core.Bpm = Core.Bpm,
> extends Core.Event {
  name;
  timesignatures;
  keysignatures;
  bpms;
  tracks;
  notes;

  constructor({
    name = "",
    tracks,
    notes,
    timesignatures,
    keysignatures,
    bpms,
    ...event
  }: {
    tracks: Track[];
    notes: Note[];
    timesignatures: Timesignature[] | [Timesignature];
    keysignatures: Keysignature[] | [Keysignature];
    bpms: Bpm[] | [Bpm];
    name?: string;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.name = name;
    this.timesignatures = timesignatures;
    this.keysignatures = keysignatures;
    this.bpms = bpms;
    this.tracks = tracks;
    this.notes = notes;
    for (const track of this.tracks) track.score = this;
  }
  static create(
    param: Parameter,
    options: {
      defaultValue: PartialDeep<
        LiteralToPrimitiveDeep<typeof Core.Metadata.defaultValue>
      >;
    } = { defaultValue: {} }
  ) {
    const defaultValue = mergeDeep(
      options.defaultValue,
      Core.Metadata.defaultValue
    );
    param.start ??= 0;
    param.end ??= pipe(
      param.tracks,
      flatMap(prop("notes")),
      firstBy([
        (note) => note.end ?? (note.start ?? 0) + (note.duration ?? 0),
        "desc",
      ]),
      (note) => note?.end ?? (note?.start ?? 0) + (note?.duration ?? 0)
    );
    param.duration ??= param.end - param.start;
    for (const track of param.tracks) {
      track.start ??=
        isDefined(track.end) && isDefined(track.duration)
          ? track.end - track.duration
          : param.start ?? 0;
      track.end ??=
        isDefined(track.start) && isDefined(track.duration)
          ? track.start + track.duration
          : pipe(
              track.notes,
              firstBy([
                (note) => note.end ?? (note.start ?? 0) + (note.duration ?? 0),
                "desc",
              ]),
              (note) => note?.end ?? (note?.start ?? 0) + (note?.duration ?? 0)
            );
      track.duration ??= track.end - track.start;
    }
    for (const key of ["keysignatures", "timesignatures", "bpms"] as const) {
      if (isNullish(param[key]) || isEmpty(param[key]))
        match(key)
          .with("timesignatures", (key) => (param[key] = [defaultValue[key]]))
          .with("keysignatures", (key) => (param[key] = [defaultValue[key]]))
          .with("bpms", (key) => (param[key] = [defaultValue[key]]))
          .exhaustive();
      if (param[key]?.length === 1)
        for (const event of param[key]) event.start = param.start;

      param[key]?.toReversed().reduce(
        (acc, cur) => {
          cur.end = acc.start;
          return cur;
        },
        { start: param.end, duration: -1, end: -1 } as Partial<
          ConstructorParameters<typeof Core.Event>[0]
        >
      );
    }

    const notes = param.tracks.flatMap((track, trackId) =>
      track.notes.map(
        (note, id) =>
          new Core.Note({
            ...note,
            id,
            trackId,
            pitch: new Core.Unit.MidiNoteNumber(note.pitch),
          })
      )
    );
    const core = new this({
      ...param,
      timesignatures:
        param.timesignatures?.map(
          (timesignature) => new Core.Timesignature(timesignature)
        ) ?? [],
      keysignatures:
        param.keysignatures?.map(
          (keysignature) => new Core.Keysignature(keysignature)
        ) ?? [],
      bpms:
        param.bpms?.map(
          (bpm) =>
            new Core.Bpm({
              ...bpm,
              value: new Core.Unit.Tempo(bpm.value),
            })
        ) ?? [],
      notes,
      tracks: param.tracks.map(
        (track, trackId) =>
          new Core.Track({
            ...track,
            id: trackId,
            preset: new Core.Unit.Preset(
              track.preset ?? defaultValue.track.preset
            ),
            start: track.start!,
          })
      ),
      start: param.start ?? 0,
      duration: param.duration ?? 0,
      end: param.end ?? 0,
    });
    return core;
  }
}
type Parameter = Partial<Pick<Core.Score, "start" | "end" | "duration">> & {
  tracks: (Omit<
    SetOptional<
      ConstructorParameters<typeof Core.Track>[0],
      "start" | "end" | "duration"
    >,
    "score" | "id" | "notes" | "preset"
  > & {
    preset?: number;
    notes: (Omit<
      ConstructorParameters<typeof Core.Note>[0],
      "id" | "trackId" | "pitch"
    > & {
      pitch: number;
    })[];
  })[];
  keysignatures?: SetOptional<
    ConstructorParameters<typeof Core.Keysignature>[0],
    "start"
  >[];
  timesignatures?: SetOptional<
    ConstructorParameters<typeof Core.Timesignature>[0],
    "start"
  >[];
  bpms?: (Omit<
    SetOptional<ConstructorParameters<typeof Core.Bpm>[0], "start">,
    "value"
  > & {
    value: number;
  })[];
};
