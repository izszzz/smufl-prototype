import * as R from "remeda";
import * as Core from "../models/core";
import * as SMUFL from "../models/smufl";
import { Exporter } from "./exporter";
import { safeSum } from "../helpers";

export class SMUFLExporter implements Exporter<SMUFL.Score> {
  score;
  constructor(score: Core.Score) {
    this.score = score;
  }
  export(
    clientWidth?: number,
    type?: "Pagination" | "VerticalScroll" | "HorizontalScroll"
  ) {
    const score = this.generate(this.score);
    score.clientWidth = clientWidth ?? 0;
    score.type = type ?? "VerticalScroll";

    score.rows = this.layout(score);
    for (const [i, row] of score.rows.entries()) {
      row.y = 20 * i;
      for (const [i, track] of row.tracks.entries()) {
        track.y = i * 12;
        for (const bar of track.bars) {
          bar.y = track.y;
          if (bar.metadata) {
            bar.metadata.glyphs.glyphs.reduce<SMUFL.Glyph[] | null>(
              (acc, cur) => {
                if (acc) {
                  const prevGlyph = R.firstBy(acc, [R.prop("width"), "desc"]);
                  for (const glyph of cur)
                    glyph.x = safeSum(prevGlyph?.x, prevGlyph?.width);
                }
                return cur;
              },
              null
            );
          }
          for (const note of bar.elements) {
            note.glyphs.glyphs.reduce<SMUFL.Glyph[] | null>((acc, cur) => {
              if (acc) {
                const prevGlyph = R.firstBy(acc, [R.prop("width"), "desc"]);
                for (const glyph of cur)
                  glyph.x = safeSum(prevGlyph?.x, prevGlyph?.width);
              }
              return cur;
            }, null);
          }
        }
      }
      row.masterBars.reduce<SMUFL.MasterBar | null>((acc, cur) => {
        if (acc) cur.x = safeSum(acc?.x, acc?.width);
        return cur;
      }, null);
      for (const masterBar of row.masterBars) {
        for (const bar of masterBar.bars) bar.x = masterBar.x;
        R.pipe(
          masterBar.groupedNotes,
          R.entries(),
          R.sortBy([([i]) => i, "asc"]),
          R.reduce(
            (acc, [, cur]) => {
              if (cur.some((note) => note.accessory.left.glyphs.length > 0)) {
                const maxWidth = R.firstBy(cur, [
                  (n) => n.accessory.left.width,
                  "desc",
                ]).accessory.left.width;
                for (const note of cur.filter(
                  (n) => n.accessory.left.width < maxWidth
                )) {
                  note.spacing.left = maxWidth - note.accessory.left.width;
                  for (const glyph of note.glyphs.glyphs)
                    for (const g of glyph) g.x = note.spacing.left;
                }
              }
              if (acc) for (const note of cur) note.x += acc.x + acc.width;
              return R.firstBy(cur, [R.prop("width"), "desc"]);
            },
            null as SMUFL.Note | null
          )
        );
      }
    }
    return score;
  }
  generate(core: Core.Score): SMUFL.Score {
    const tracks = core.tracks.map(
      (track) =>
        new SMUFL.Track({
          bars: track.bars?.length
            ? track.bars.map(
                (bar) =>
                  new SMUFL.Bar({
                    core: bar,
                    elements: bar.elements.reduce((acc, cur) => {
                      const note = new SMUFL.Note({ core: cur });

                      if (0 < note.core.time.start)
                        acc.push(
                          new SMUFL.Rest({
                            core: {
                              time: new Core.Time({
                                start: 0,
                                end: note.core.time.start,
                              }),
                            },
                          })
                        );
                      acc.push(note);

                      return acc;
                    }, [] as SMUFL.Element[]),
                  })
              )
            : [
                new SMUFL.Bar({
                  core: new Core.Bar({ track, id: 1, elements: [] }),
                  elements: [],
                }),
              ],
          metadata: track.metadata && new SMUFL.Metadata(track.metadata),
          core: track,
        })
    );
    return new SMUFL.Score({
      tracks,
      masterBars: R.pipe(
        tracks,
        R.flatMap((track) => track.bars),
        R.groupBy((bar) => bar.core.id),
        R.entries,
        R.map(
          ([id, bars]) =>
            new SMUFL.MasterBar({
              id: Number(id),
              bars,
            })
        )
      ),
      clientWidth: 0,
      type: "VerticalScroll",
      rows: [],
    });
  }
  layout(score: SMUFL.Score) {
    if (score.type === "HorizontalScroll")
      return [
        new SMUFL.Row({ masterBars: score.masterBars, tracks: score.tracks }),
      ];
    if (score.type === "VerticalScroll")
      return R.pipe(
        score.masterBars,
        R.reduce.indexed(
          (acc, cur, i) => {
            if (
              R.pipe(
                score.masterBars.slice(acc.start, i),
                R.map((masterBar) => masterBar.width),
                R.reduce(R.add, 0)
              ) +
                cur.width >
              score.clientWidth
            ) {
              acc.rows.push(
                new SMUFL.Row({
                  masterBars: score.masterBars.slice(acc.start, i),
                  tracks: score.tracks.map((track) => ({
                    ...track,
                    bars: track.bars.slice(acc.start, i),
                  })),
                })
              );
              acc.start = i;
            }
            if (i === score.masterBars.length - 1)
              acc.rows.push(
                new SMUFL.Row({
                  masterBars: score.masterBars.slice(acc.start),
                  tracks: score.tracks.map((track) => ({
                    ...track,
                    bars: track.bars.slice(acc.start),
                  })),
                })
              );
            return acc;
          },
          { rows: [], start: 0 } as {
            rows: SMUFL.Row[];
            start: number;
          }
        ),
        R.prop("rows")
      );
    if (score.type === "Pagination") return [];
    return [];
  }
}
