import * as R from "remeda";
import * as Sheet from "sheet";
import * as Core from "core";
import { match } from "ts-pattern";

declare module "core" {
  interface Score {
    toSheet: () => Sheet.Score;
  }
}

Core.Score.prototype.toSheet = function (this: Core.Score) {
  const notes = R.pipe(
    this.notes,
    R.map(
      (note) =>
        new Sheet.Note({
          ...note,
          pitch: new Sheet.Pitch(note.pitch),
          stem: { _: "up" },
          rest: undefined,
          chord: false,
          staff: undefined,
          voice: undefined,
          staveId: -1, // will be set later
        })
    )
  );
  const masterbars = this.timesignatures
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
    .events.map((event, id) => new Sheet.Masterbar({ id, ...event }));
  // TODO: refactor
  const staves = this.tracks.flatMap((track) =>
    masterbars.flatMap((masterbar) =>
      match(track.preset.toName())
        .with("Acoustic Grand Piano", () => {
          for (const note of notes)
            note.staveId =
              note.pitch.midiNoteNumber.value <
              Core.Unit.MidiNoteNumber.MIDDLE_C
                ? 1
                : 0;
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
          for (const note of notes) note.staveId = 1;
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
        .map((stave) => new Sheet.Stave(stave))
    )
  );
  const score = new Sheet.Score({
    ...this,
    notes,
    tracks: this.tracks.map((track) => new Sheet.Track(track)),
    bars: this.tracks.flatMap((track) =>
      masterbars.map(
        (masterbar) => new Sheet.Bar({ ...masterbar, trackId: track.id })
      )
    ),
    masterbars,
    staves,
    rows: [],
    timesignatures: this.timesignatures.map(
      (timesignature) => new Sheet.Timesignature(timesignature)
    ),
    keysignatures: this.keysignatures.map(
      (keysignature) => new Sheet.Keysignature(keysignature)
    ),
  });

  // insert rests
  // TODO: chordの考慮
  score.notes = R.pipe(
    score.notes,
    R.groupByProp("staveId"),
    R.entries(),
    R.flatMap(([staveId, notes]) => {
      const stave = score.staves.find((stave) => stave.id === Number(staveId))!;
      return R.pipe(
        [
          new Core.Event({
            start: stave.bar.start,
            end: stave.bar.start,
          }) as Sheet.Note,
          ...notes,
          new Core.Event({
            start: stave.bar.end,
            end: stave.bar.end,
          }) as Sheet.Note,
        ],
        R.reduce(
          (acc, cur, i) => {
            if (acc.prev && acc.prev.start < cur.start) {
              if (acc.prev instanceof Sheet.Note) acc.events.push(acc.prev);
              acc.events.push(
                new Sheet.Note({
                  start: acc.prev.end,
                  end: cur.start,
                  id: i + score.notes.length,
                  pitch: new Sheet.Pitch({
                    midiNoteNumber: new Core.Unit.MidiNoteNumber(-1),
                  }),
                  stem: undefined,
                  chord: false,
                  rest: { $: {}, $$: {} },
                  voice: undefined,
                  staff: undefined,
                  staveId: Number(staveId),
                  trackId: stave.bar.trackId,
                })
              );
            }
            acc.prev = cur;
            return acc;
          },
          { events: [] as Sheet.Note[], prev: null as Sheet.Note | null }
        ),
        R.prop("events")
      );
    })
  );

  console.log({ sheet: score });
  return score;
};
