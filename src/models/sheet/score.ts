import * as Core from "core";
import * as Sheet from "sheet";
import {
  length,
  filter,
  firstBy,
  isEmpty,
  isNullish,
  pipe,
  prop,
  reduce,
  times,
  piped,
  add,
  subtract,
  flatMap,
  isDefined,
  mergeDeep,
} from "remeda";
import { LiteralToPrimitiveDeep, PartialDeep, SetOptional } from "type-fest";
import { match } from "ts-pattern";

export class Score<
  Note extends Sheet.Note = Sheet.Note,
  Track extends Sheet.Track = Sheet.Track,
  Stave extends Sheet.Stave = Sheet.Stave,
  Bar extends Sheet.Bar = Sheet.Bar,
  Masterbar extends Sheet.Masterbar = Sheet.Masterbar,
  Row extends Sheet.Row = Sheet.Row,
  Timesignature extends Sheet.Timesignature = Sheet.Timesignature,
  Keysignature extends Sheet.Keysignature = Sheet.Keysignature,
  Bpm extends Sheet.Bpm = Sheet.Bpm,
> extends Core.Score<Note, Track, Timesignature, Keysignature, Bpm> {
  masterbars;
  rows;
  bars;
  staves;
  get height() {
    return this.rows.reduce((acc, cur) => acc + cur.height, 0);
  }
  get width() {
    return firstBy(this.rows, [prop("width"), "desc"])?.width ?? 0;
  }
  constructor({
    staves,
    bars,
    masterbars,
    rows,
    ...score
  }: {
    staves: Stave[];
    bars: Bar[];
    masterbars: Masterbar[];
    rows: Row[];
  } & ConstructorParameters<
    typeof Core.Score<Note, Track, Timesignature, Keysignature, Bpm>
  >[0]) {
    super(score);
    this.bars = bars;
    this.staves = staves;
    this.rows = rows;
    this.masterbars = masterbars;
    for (const data of [
      ...this.notes,
      ...this.staves,
      ...this.bars,
      ...this.masterbars,
      ...this.rows,
    ])
      data.score = this;
  }
  draw() {
    for (const data of [...this.notes, ...this.staves, ...this.timesignatures])
      data.draw();
  }
  static create(
    params: Parameter,
    options: {
      defaultValue: PartialDeep<
        LiteralToPrimitiveDeep<typeof Core.Metadata.defaultValue>
      >;
    } = { defaultValue: {} }
  ) {
    console.log(params);
    const defaultValue = mergeDeep(
      options.defaultValue,
      Core.Metadata.defaultValue
    );
    for (const key of ["keysignatures", "timesignatures", "bpms"] as const) {
      if (isNullish(params[key]) || isEmpty(params[key]))
        match(key)
          .with("timesignatures", (key) => (params[key] = [defaultValue[key]]))
          .with("keysignatures", (key) => (params[key] = [defaultValue[key]]))
          .with("bpms", (key) => (params[key] = [defaultValue[key]]))
          .exhaustive();

      params[key]?.toReversed().reduce(
        (acc, cur) => {
          cur.end = acc.start;
          return cur;
        },
        { start: params.end, duration: -1, end: -1 } as Partial<
          ConstructorParameters<typeof Core.Event>[0]
        >
      );
    }

    const barEvents = pipe(
      params.timesignatures ?? [],
      reduce(
        (acc, cur) => {
          acc.events.push(
            ...times(
              Math.ceil(new Core.Event(cur).duration / cur.numerator),
              () => {
                const event = new Core.Event({
                  start: acc.start,
                  duration: cur.numerator,
                });
                acc.start += cur.numerator;
                return event;
              }
            )
          );
          return acc;
        },
        { start: 0, events: [] as Core.Event[] }
      ),
      prop("events")
    );

    params.masterbars ??= barEvents.map((event, id) => ({ id, ...event }));
    if (isNullish(params.masterbars) || isEmpty(params.masterbars))
      params.masterbars = [
        {
          id: 0,
          start: 0,
          end: params.timesignatures![0]?.numerator,
        },
      ];

    params.bars ??= params.tracks.flatMap((track) =>
      params.masterbars!.map((masterbar) => ({
        ...masterbar,
        trackId: track.id,
      }))
    );
    if (isNullish(params.bars) || isEmpty(params.bars))
      params.bars = params.tracks.map((_, trackId) => ({
        id: 0,
        trackId,
      }));

    params.staves = params.tracks
      .flatMap((track) =>
        params.masterbars!.flatMap((masterbar) =>
          match(new Core.Unit.Preset(track.preset!).toName())
            .with("Acoustic Grand Piano", () => {
              return [
                <ConstructorParameters<typeof Sheet.Stave>[0]>{
                  id: 0,
                  barId: masterbar.id,
                  trackId: track.id,
                  clef: {
                    $$: {
                      sign: [{ _: "G" }],
                      line: [{ _: 2 }],
                      "clef-octave-change": [{ _: 0 }],
                    },
                    $: {},
                  },
                },
                <ConstructorParameters<typeof Sheet.Stave>[0]>{
                  id: 1,
                  barId: masterbar.id,
                  trackId: track.id,
                  clef: {
                    $$: {
                      sign: [{ _: "F" }],
                      line: [{ _: 4 }],
                      "clef-octave-change": [{ _: 0 }],
                    },
                    $: {},
                  },
                },
              ];
            })
            .otherwise(() => {
              return [
                <ConstructorParameters<typeof Sheet.Stave>[0]>{
                  id: 0,
                  barId: masterbar.id,
                  trackId: track.id,
                  clef: {
                    $$: {
                      sign: [{ _: "G" }] as const,
                      line: [{ _: 4 }],
                      "clef-octave-change": [{ _: 0 }],
                    },
                    $: {},
                  },
                },
              ];
            })
        )
      )
      .map((stave) => new Sheet.Stave(stave));

    params.start = 0;
    params.end = new Core.Event(params.masterbars.at(-1)!).end;
    for (const track of params.tracks) {
      track.start = params.start;
      track.end = params.end;
    }
    for (const key of ["keysignatures", "timesignatures", "bpms"] as const) {
      params[key]!.at(-1)!.end = params.end;
      if (params[key]?.length === 1)
        for (const event of params[key]) event.start = params.start;

      params[key]?.toReversed().reduce(
        (acc, cur) => {
          cur.end = acc.start;
          return cur;
        },
        { start: params.end, duration: -1, end: -1 } as Partial<
          ConstructorParameters<typeof Core.Event>[0]
        >
      );
    }

    const score = new Sheet.Score({
      ...params,
      timesignatures:
        params.timesignatures?.map(
          (timesignature) => new Sheet.Timesignature(timesignature)
        ) ?? [],
      keysignatures:
        params.keysignatures?.map(
          (keysignature) => new Sheet.Keysignature(keysignature)
        ) ?? [],
      bpms:
        params.bpms?.map(
          (bpm) =>
            new Sheet.Bpm({ ...bpm, value: new Core.Unit.Tempo(bpm.value) })
        ) ?? [],
      notes: params.tracks.flatMap((track, trackId) =>
        track.notes.map(
          (note, id) =>
            new Sheet.Note({
              ...note,
              id,
              trackId,
              pitch: new Core.Unit.MidiNoteNumber(note.pitch),
            })
        )
      ),
      tracks: params.tracks.map(
        (track, id) =>
          new Sheet.Track({
            ...track,
            id,
            preset: new Core.Unit.Preset(track.preset ?? 0),
          })
      ),
      staves: params.staves.map((stave) => new Sheet.Stave(stave)),
      bars: params.bars.map((bar) => new Sheet.Bar(bar)),
      masterbars: params.masterbars.map(
        (masterbar) => new Sheet.Masterbar(masterbar)
      ),
      rows: [],
    });

    // insert rests
    // TODO: chordの考慮
    pipe(
      score.staves,
      flatMap((stave) => {
        return pipe(
          [
            new Core.Event({
              start: stave.bar.masterbar.start,
              end: stave.bar.masterbar.start,
            }) as Sheet.Note,
            ...stave.notes,
            new Core.Event({
              start: stave.bar.masterbar.end,
              end: stave.bar.masterbar.end,
            }) as Sheet.Note,
          ],
          reduce(
            (acc, cur, i) => {
              if (acc && acc.end < cur.start) {
                score.notes.splice(
                  pipe(
                    score.notes,
                    filter(piped(prop("rest"), isDefined)),
                    length(),
                    add(i),
                    subtract(1)
                  ),
                  0,
                  new Sheet.Note({
                    start: acc.end,
                    end: cur.start,
                    id: score.notes.length + 1,
                    staveId: stave.id,
                    pitch: new Core.Unit.MidiNoteNumber(-1),
                    stem: undefined,
                    chord: false,
                    rest: { $: {}, $$: {} },
                    voice: undefined,
                    staff: undefined,
                    trackId: stave.trackId,
                  })
                );
              }
              return cur;
            },
            null as Core.Event | null
          )
        );
      })
    );
    if (process.env.NODE_ENV === "development") console.log({ sheet: score });
    return score;
  }
}
type Parameter = Partial<Pick<Sheet.Score, "start" | "end" | "duration">> & {
  tracks: (Omit<
    SetOptional<
      ConstructorParameters<typeof Sheet.Track>[0],
      "start" | "end" | "duration"
    >,
    "notes" | "preset"
  > & {
    preset?: number;
    notes: (Omit<
      ConstructorParameters<typeof Sheet.Note>[0],
      "id" | "trackId" | "pitch"
    > & {
      pitch: number;
    })[];
  })[];
  keysignatures?: SetOptional<
    ConstructorParameters<typeof Sheet.Keysignature>[0],
    "start"
  >[];
  timesignatures?: SetOptional<
    ConstructorParameters<typeof Sheet.Timesignature>[0],
    "start"
  >[];
  bpms?: (Omit<
    SetOptional<ConstructorParameters<typeof Sheet.Bpm>[0], "start">,
    "value"
  > & {
    value: number;
  })[];
  masterbars?: ConstructorParameters<typeof Sheet.Masterbar>[0][];
  bars?: ConstructorParameters<typeof Sheet.Bar>[0][];
  staves?: ConstructorParameters<typeof Sheet.Stave>[0][];
};
