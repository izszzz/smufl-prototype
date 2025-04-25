import { times } from "remeda";
import * as Sheet from "sheet";
import * as Core from "core";

declare module "core" {
  interface Score {
    toSheet: () => Sheet.Score;
  }
}

Core.Score.prototype.toSheet = function (this: Core.Score) {
  const score = new Sheet.Score({
    ...this,
    tracks: this.tracks.map((track) => {
      const trackNotes = track.notes.map(
        (note) =>
          new Sheet.Note({
            ...note,
            type: null,
            stem: null,
            rest: false,
            chord: false,
            //仮置き
            staff: 0,
            voice: 0,
          })
      );
      return new Sheet.Track({
        ...track,
        staffLines: 5,
        notes: trackNotes,
        bars: [] as Sheet.Bar[],
      });
    }),
  });
  for (const track of score.tracks) {
    const { bars } = this.timesignatures.reduce(
      (acc, cur) => {
        const bars = times(
          Math.max(Math.ceil(cur.duration / cur.numerator), 1),
          (i) => {
            acc.end += cur.numerator;
            const bar = new Sheet.Bar({
              notes: track.notes.filter(
                (e) => e.end > acc.start && e.start < acc.end
              ),
              staves: generateStaves(track),
              timesignature: new Sheet.Timesignature(cur),
              id: i,
              width: 3,
              staffLines: 5,
              start: acc.start,
              end: acc.end,
            });
            acc.start += cur.end;
            return bar;
          }
        );
        acc.bars.push(...bars);
        return acc;
      },
      { start: 0, end: 0, bars: [] as Sheet.Bar[] }
    );
    track.bars = bars;
  }

  for (const track of score.tracks) {
    for (const note of track.notes) note.track = track;
  }
  console.log({ sheet: score });
  return score;
};

function generateStaves({ preset }: Core.Track): Sheet.Stave[] {
  switch (preset.toName()) {
    case "Acoustic Grand Piano":
      return [
        new Sheet.Stave({
          id: 0,
          clef: { sign: "G", line: 2, clefOctaveChange: 0, $: {} },
          barlines: { $: { location: "left" } },
        }),
        new Sheet.Stave({
          id: 0,
          clef: { sign: "F", line: 4, clefOctaveChange: 0, $: {} },
          barlines: { $: { location: "left" } },
        }),
      ];

    default:
      return [
        new Sheet.Stave({
          id: 0,
          clef: { sign: "G", line: 4, clefOctaveChange: 0, $: {} },
          barlines: { $: { location: "left" } },
        }),
      ];
  }
}
