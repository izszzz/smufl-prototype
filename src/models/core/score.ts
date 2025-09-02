import { match } from "ts-pattern";
import { LiteralToPrimitiveDeep, PartialDeep, Merge } from "type-fest";
import {
  isDefined,
  prop,
  pipe,
  flatMap,
  firstBy,
  isEmpty,
  mergeDeep,
  isNullish,
  filter,
  entries,
  piped,
  last,
  mapToObj,
} from "remeda";
import * as Core from "core";
export class Score<
  Note extends Core.Note = Core.Note,
  Track extends Core.Track = Core.Track,
  Timesignature extends Core.Timesignature = Core.Timesignature,
  Keysignature extends Core.Keysignature = Core.Keysignature,
  Tempo extends Core.Tempo = Core.Tempo,
> extends Core.Event {
  name;
  timesignatures;
  keysignatures;
  tempos;
  tracks;
  notes;
  get params() {
    return {
      ...super.params,
      name: this.name,
    };
  }
  constructor({
    name = "",
    tracks,
    notes,
    timesignatures,
    keysignatures,
    tempos,
    ...event
  }: {
    tracks: Track[];
    notes: Note[];
    timesignatures: Timesignature[] | [Timesignature];
    keysignatures: Keysignature[] | [Keysignature];
    tempos: Tempo[] | [Tempo];
    name?: string;
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.name = name;
    this.timesignatures = timesignatures;
    this.keysignatures = keysignatures;
    this.tempos = tempos;
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
    for (const key of ["keysignatures", "timesignatures", "tempos"] as const) {
      if (isNullish(param[key]) || isEmpty(param[key]))
        match(key)
          .with("timesignatures", (key) => (param[key] = [defaultValue[key]]))
          .with("keysignatures", (key) => (param[key] = [defaultValue[key]]))
          .with("tempos", (key) => (param[key] = [defaultValue[key]]))
          .exhaustive();
      if (param[key]?.length === 1) param[key][0]!.start = param.start;

      param[key]?.toReversed().reduce(
        (acc, cur) => {
          cur.end = acc.start;
          return cur;
        },
        { start: param.end, duration: -1, end: -1 } as EventParameter
      );
    }

    const { start, duration, end, ...score } = param;
    const core = new Core.Score({
      ...score,
      timesignatures:
        param.timesignatures?.map(
          ({ start, end, duration, ...timesignature }) =>
            new Core.Timesignature({
              ...timesignature,
              ...pipe(
                { start, duration, end },
                entries(),
                filter(piped(last, isDefined)),
                mapToObj(([key, value]) => [key, new Core.Units.Beat(value!)])
              ),
            })
        ) ?? [],
      keysignatures:
        param.keysignatures?.map(
          ({ start, end, duration, ...keysignature }) =>
            new Core.Keysignature({
              ...keysignature,
              ...pipe(
                { start, duration, end },
                entries(),
                filter(piped(last, isDefined)),
                mapToObj(([key, value]) => [key, new Core.Units.Beat(value!)])
              ),
            })
        ) ?? [],
      tempos:
        param.tempos?.map(
          ({ start, end, duration, ...tempo }) =>
            new Core.Tempo({
              value: new Core.Units.Tempo(tempo.value),
              ...pipe(
                { start, duration, end },
                entries(),
                filter(piped(last, isDefined)),
                mapToObj(([key, value]) => [key, new Core.Units.Beat(value!)])
              ),
            })
        ) ?? [],
      notes: param.tracks.flatMap((track, trackId) =>
        track.notes.map(
          ({ start, duration, end, ...note }, id) =>
            new Core.Note({
              id,
              trackId,
              pitch: new Core.Units.MidiNoteNumber(note.pitch),
              ...pipe(
                { start, duration, end },
                entries(),
                filter(piped(last, isDefined)),
                mapToObj(([key, value]) => [key, new Core.Units.Beat(value!)])
              ),
            })
        )
      ),
      tracks: param.tracks.map(
        ({ start, duration, end, ...track }, trackId) =>
          new Core.Track({
            ...track,
            id: trackId,
            preset: new Core.Units.Preset(
              track.preset ?? defaultValue.track.preset
            ),
            ...pipe(
              { start, duration, end },
              entries(),
              filter(piped(last, isDefined)),
              mapToObj(([key, value]) => [key, new Core.Units.Beat(value!)])
            ),
          })
      ),
      ...pipe(
        { start, duration, end },
        entries(),
        filter(piped(last, isDefined)),
        mapToObj(([key, value]) => [key, new Core.Units.Beat(value)])
      ),
    });
    return core;
  }
}

type EventParameter = {
  start?: number;
  duration?: number;
  end?: number;
};
type Parameter = EventParameter & {
  tracks: Merge<
    Omit<ConstructorParameters<typeof Core.Track>[0], "score" | "id">,
    EventParameter & {
      preset?: number;
      notes: Merge<
        Omit<ConstructorParameters<typeof Core.Note>[0], "id" | "trackId">,
        EventParameter & { pitch: number }
      >[];
    }
  >[];
  keysignatures?: Merge<
    ConstructorParameters<typeof Core.Keysignature>[0],
    EventParameter
  >[];
  timesignatures?: Merge<
    ConstructorParameters<typeof Core.Timesignature>[0],
    EventParameter
  >[];
  tempos?: Merge<
    ConstructorParameters<typeof Core.Tempo>[0],
    EventParameter & { value: number }
  >[];
};
