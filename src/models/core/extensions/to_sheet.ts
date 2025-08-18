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
          stem: { _: "up" },
          rest: undefined,
          chord: false,
          staff: undefined,
          voice: undefined,
          staveId: -1, // will be set later
        })
    )
  );

  const barEvents = this.timesignatures.reduce(
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
  ).events;
  const masterbars = barEvents.map(
    (event, id) => new Sheet.Masterbar({ id, ...event })
  );

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
      (timesignature) => new Sheet.Timesignature({ ...timesignature })
    ),
    keysignatures: this.keysignatures.map(
      (keysignature) => new Sheet.Keysignature({ ...keysignature })
    ),
    start: barEvents[0]?.start ?? 0,
    end: barEvents.at(-1)?.end ?? 0,
  });
  console.log(barEvents);
  // set end
  // score.timesignatures.at(-1).end = barEvents.at(-1)?.end;
  const lastKeysignature = score.keysignatures.at(-1);
  if (lastKeysignature?.end) lastKeysignature.end = barEvents.at(-1)?.end ?? 0;

  // insert rests
  // TODO: chordの考慮
  R.pipe(
    score.staves,
    R.flatMap((stave) => {
      return R.pipe(
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
        R.reduce(
          (acc, cur, i) => {
            if (acc && acc.end < cur.start) {
              score.notes.splice(
                R.pipe(
                  score.notes,
                  R.filter(R.piped(R.prop("rest"), R.isDefined)),
                  R.length(),
                  R.add(i),
                  R.subtract(1)
                ),
                0,
                new Sheet.Note({
                  start: acc.end,
                  end: cur.start,
                  id: score.notes.length + 1,
                  pitch: new Core.Pitch({
                    midiNoteNumber: new Core.Unit.MidiNoteNumber(-1),
                  }),
                  stem: undefined,
                  chord: false,
                  rest: { $: {}, $$: {} },
                  voice: undefined,
                  staff: undefined,
                  trackId: stave.trackId,
                  staveId: stave.id,
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

  console.log({ sheet: score });
  return score;
};
