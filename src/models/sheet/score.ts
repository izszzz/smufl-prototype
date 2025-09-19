import * as Core from "core";
import * as Sheet from "sheet";
import {
  length,
  filter,
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
  entries,
  mapToObj,
  last,
  firstBy,
  isArray,
  first,
  isTruthy,
  map,
  identity,
} from "remeda";
import { LiteralToPrimitiveDeep, Merge, PartialDeep } from "type-fest";
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
  Tempo extends Core.Tempo = Core.Tempo,
  Chord extends Sheet.Chord = Sheet.Chord,
> extends Core.Score<Note, Track, Timesignature, Keysignature, Tempo> {
  masterbars;
  rows;
  bars;
  staves;
  chords;
  get events() {
    return [
      ...pipe(this.notes, filter(piped(prop("chordId"), isNullish))),
      ...this.chords,
    ].sort((a, b) => a.start.subtract(b.start).value);
  }
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
    chords,
    ...score
  }: {
    staves: Stave[];
    bars: Bar[];
    masterbars: Masterbar[];
    rows: Row[];
    chords: Chord[];
  } & ConstructorParameters<
    typeof Core.Score<Note, Track, Timesignature, Keysignature, Tempo>
  >[0]) {
    super(score);
    this.bars = bars;
    this.staves = staves;
    this.rows = rows;
    this.masterbars = masterbars;
    this.chords = chords;
    for (const data of [
      ...this.notes,
      ...this.staves,
      ...this.bars,
      ...this.masterbars,
      ...this.rows,
      ...this.chords,
    ])
      data.score = this;
  }

  static create(
    param: Parameter,
    options: {
      defaultValue: PartialDeep<
        LiteralToPrimitiveDeep<typeof Core.Metadata.defaultValue>
      >;
    } = { defaultValue: {} }
  ) {
    const core = super.create(
      {
        ...param,
        tracks: param.tracks.map((track) => ({
          ...track,
          notes: track.notes.flat(),
        })),
      },
      options
    );
    const barEvents = pipe(
      core.timesignatures,
      reduce(
        (acc, cur) => {
          acc.events.push(
            ...times(Math.ceil(cur.duration.value / cur.numerator), () => {
              const event = {
                start: acc.start,
                duration: cur.numerator,
              };
              acc.start += cur.numerator;
              return event;
            })
          );
          return acc;
        },
        {
          start: 0,
          events: [] as { start: number; duration: number }[],
        }
      ),
      prop("events")
    );
    param.masterbars ??= barEvents.map((event, id) => ({ id, ...event }));
    if (isNullish(param.masterbars) || isEmpty(param.masterbars))
      param.masterbars = [
        {
          id: 0,
          start: 0,
          end: param.timesignatures![0]?.numerator,
        },
      ];
    param.chords ??= param.tracks.flatMap((track, trackId) =>
      track.notes.filter(isArray).map((notes, chordId) => {
        for (const note of notes) note.chordId = chordId;
        return {
          id: chordId,
          trackId,
          staveId: pipe(notes, first(), prop("staveId")),
          start: pipe(
            notes,
            map(prop("start")),
            filter(isTruthy),
            firstBy(identity())
          ),
          duration: pipe(
            notes,
            map(prop("duration")),
            filter(isTruthy),
            firstBy([identity(), "desc"])
          ),
          end: pipe(
            notes,
            map(prop("duration")),
            filter(isTruthy),
            firstBy([identity(), "desc"])
          ),
        };
      })
    );
    param.bars ??= core.tracks.flatMap((track) =>
      param.masterbars!.map((masterbar) => ({
        ...masterbar,
        trackId: track.id,
      }))
    );
    if (isNullish(param.bars) || isEmpty(param.bars))
      param.bars = param.tracks.map((_, trackId) => ({
        id: 0,
        trackId,
      }));

    param.staves = core.tracks
      .flatMap((track) =>
        param.masterbars!.flatMap((masterbar) =>
          match(track.preset.toName())
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

    const score = new Sheet.Score({
      ...core,
      timesignatures: core.timesignatures.map(
        (timesignature) => new Sheet.Timesignature(timesignature)
      ),
      keysignatures: core.keysignatures.map(
        (keysignature) => new Sheet.Keysignature(keysignature)
      ),
      notes: param.tracks.flatMap((track, trackId) =>
        track.notes.flat().map(
          ({ start, duration, end, ...note }, id) =>
            new Sheet.Note({
              ...note,
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
      tracks: core.tracks.map((track) => new Sheet.Track(track)),
      staves: param.staves.map((stave) => new Sheet.Stave(stave)),
      bars: param.bars.map((bar) => new Sheet.Bar(bar)),
      masterbars:
        param.masterbars?.map(
          ({ start, duration, end, ...masterbar }) =>
            new Sheet.Masterbar({
              ...masterbar,
              ...pipe(
                { start, duration, end },
                entries(),
                filter(piped(last, isDefined)),
                mapToObj(([key, value]) => [key, new Core.Units.Beat(value!)])
              ),
            })
        ) ?? [],
      chords:
        param.chords?.map(
          ({ start, duration, end, ...chord }) =>
            new Sheet.Chord({
              ...chord,
              ...pipe(
                { start, duration, end },
                entries(),
                filter(piped(last, isDefined)),
                mapToObj(([key, value]) => [key, new Core.Units.Beat(value!)])
              ),
            })
        ) ?? [],
      rows: [],
    });

    // set end
    score.setEnd(score.masterbars.at(-1)!.end);
    for (const key of [
      "tracks",
      "keysignatures",
      "timesignatures",
      "tempos",
    ] as const)
      score[key].at(-1)!.setEnd(score.end);

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
            ...stave.events,
            new Core.Event({
              start: stave.bar.masterbar.end,
              end: stave.bar.masterbar.end,
            }) as Sheet.Note,
          ],
          reduce(
            (acc, cur, i) => {
              if (acc && acc.end.value < cur.start.value) {
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
                    velocity: 0,
                    start: acc.end,
                    end: cur.start,
                    id: score.notes.length + 1,
                    staveId: stave.id,
                    trackId: stave.trackId,
                    pitch: new Core.Units.MidiNoteNumber(-1),
                    stem: undefined,
                    rest: { $: {}, $$: {} },
                    voice: undefined,
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
type EventParameter = {
  start?: number;
  duration?: number;
  end?: number;
};
type NoteParameter = Merge<
  Omit<ConstructorParameters<typeof Sheet.Note>[0], "id" | "trackId">,
  EventParameter & { pitch: number }
>;
type Parameter = Merge<
  Parameters<typeof Core.Score.create>[0],
  {
    tracks: Merge<
      Parameters<typeof Core.Score.create>[0]["tracks"][number],
      {
        notes: (NoteParameter | NoteParameter[])[];
      }
    >[];
    masterbars?: Merge<
      ConstructorParameters<typeof Sheet.Masterbar>[0],
      EventParameter
    >[];
    bars?: ConstructorParameters<typeof Sheet.Bar>[0][];
    staves?: ConstructorParameters<typeof Sheet.Stave>[0][];
    chords?: Merge<
      ConstructorParameters<typeof Sheet.Chord>[0],
      EventParameter
    >[];
  }
>;
