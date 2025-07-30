import { times } from "remeda";
import * as Sheet from "sheet";
import * as Core from "core";
import { match } from "ts-pattern";

declare module "core" {
  interface Score {
    toSheet: () => Sheet.Score;
  }
}

Core.Score.prototype.toSheet = function (this: Core.Score) {
  const notes = this.notes.map(
    (note) =>
      new Sheet.Note({
        ...note,
        type: match(note.duration)
          .with(0.5, () => ({ _: "eighth" }))
          .with(1, () => ({ _: "quarter" }))
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .exhaustive(),
        stem: { _: "up" },
        rest: undefined,
        chord: false,
        staff: undefined,
        voice: undefined,
        staveId: -1, // will be set later
      })
  );
  const masterbars = this.timesignatures
    .reduce(
      (acc, cur) => {
        acc.events.push(
          ...times(Math.ceil(cur.width), () => {
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
  const staves = this.tracks.flatMap((track) =>
    masterbars.flatMap((masterbar) =>
      match(track.preset.toName())
        .with("Acoustic Grand Piano", () => {
          for (const note of notes)
            note.staveId = note.pitch.value < 60 ? 1 : 0;
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
              barline: { $: { location: "left" }, $$: {} },
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
              barline: { $: { location: "left" }, $$: {} },
            },
          ];
        })
        .otherwise(() => {
          for (const note of notes) {
            note.staveId = 1;
          }
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
              barline: { $: { location: "left" }, $$: {} },
            },
          ];
        })
        .map((stave) => new Sheet.Stave(stave))
    )
  );
  const score = new Sheet.Score({
    ...this,
    notes,
    tracks: this.tracks.map(
      (track) => new Sheet.Track({ ...track, staffLines: 5 })
    ),
    bars: this.tracks.flatMap((track) =>
      masterbars.map(
        (masterbar) =>
          new Sheet.Bar({
            ...masterbar,
            staffLines: 5,
            trackId: track.id,
          })
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
  console.log({ sheet: score });
  return score;
};
