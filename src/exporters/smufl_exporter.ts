import * as R from "remeda";
import * as SMUFL from "../models/smufl";
import Core from "../models/smufl/core";
import { Exporter } from "./exporter";

interface Options {
  clientWidth: number;
  type: SMUFL.Score["type"];
}
export class SMUFLExporter implements Exporter<SMUFL.Score> {
  score;
  options;
  constructor(
    score: InstanceType<typeof Core.Score>,
    options: Options = { clientWidth: 0, type: "HorizontalScroll" }
  ) {
    this.score = score;
    this.options = options;
  }
  export() {
    const score = this.generate(this.score);
    score.clientWidth = this.options.clientWidth ?? 0;
    score.type = this.options.type ?? "VerticalScroll";
    score.rows = this.layout(score);
    this.transform(score);
    return score;
  }
  generate(core: InstanceType<typeof Core.Score>): SMUFL.Score {
    return new SMUFL.Score({
      core,
      clientWidth: 0,
      type: "VerticalScroll",
      rows: [],
    });
  }
  transform(score: SMUFL.Score) {
    for (const [i, row] of score.rows.entries()) {
      // TODO: 定数
      row.y = 20 * i;
      for (const [i, track] of row.tracks.entries()) {
        track.y = i * 12;
        for (const bar of track.bars) {
          bar.y = track.y;
          for (const [i, column] of bar.header.columns.entries()) {
            const prev = bar.header.columns[i - 1];
            if (prev) column.x = prev.x + prev.width;
          }
          for (const element of bar.elements)
            if (element.accessory)
              for (const [
                i,
                column,
              ] of element.accessory.glyphGrid.columns.entries()) {
                const prev = element.accessory.glyphGrid.columns[i - 1];
                if (prev) column.x = prev.x + prev.width;
              }
        }
      }
      for (const [i, masterBar] of row.masterBars.entries()) {
        const prev = row.masterBars[i - 1];
        if (prev) masterBar.x = prev.x + prev.width;
        for (const bar of masterBar.bars) bar.x = masterBar.x;
        (function setSequenceTransform(sequence: SMUFL.Sequence) {
          for (const [i, beat] of sequence.beats.entries()) {
            const prev = sequence.beats[i - 1];
            if (prev) beat.x = prev.x + prev.width;
            beat.element.x = sequence.x + beat.x;
            if (beat.element instanceof SMUFL.Chord)
              for (const element of beat.element.chord) {
                element.x = sequence.x + beat.x;
                if (element instanceof SMUFL.Sequence)
                  setSequenceTransform(element);
              }
          }
        })(masterBar.sequence);
      }

      for (const [i, x] of [
        ...row.masterBars.map(({ x }) => x),
        row.width,
      ].entries()) {
        const barline = row.barlines.columns[i];
        if (barline) barline.x = x;
      }
    }
  }
  layout(score: SMUFL.Score) {
    if (score.type === "HorizontalScroll")
      return [
        new SMUFL.Row({ masterBars: score.masterbars, tracks: score.tracks }),
      ];
    if (score.type === "VerticalScroll")
      return R.pipe(
        score.masterbars,
        R.reduce.indexed(
          (acc, cur, i) => {
            if (
              R.pipe(
                score.masterbars.slice(acc.start, i),
                R.map((masterBar) => masterBar.width),
                R.reduce(R.add, 0)
              ) +
                cur.width >
              score.clientWidth
            ) {
              acc.rows.push(
                new SMUFL.Row({
                  masterBars: score.masterbars.slice(acc.start, i),
                  tracks: score.tracks.map((track) => ({
                    ...track,
                    bars: track.bars.slice(acc.start, i),
                  })),
                })
              );
              acc.start = i;
            }
            if (i === score.masterbars.length - 1)
              acc.rows.push(
                new SMUFL.Row({
                  masterBars: score.masterbars.slice(acc.start),
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
