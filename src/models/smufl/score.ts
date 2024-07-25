import * as R from "remeda";
import * as SMUFL from ".";
import Core from "./core";

interface IScore {
  type: "Pagination" | "VerticalScroll" | "HorizontalScroll";
  clientWidth?: number;
  tracks: SMUFL.Track[];
  masterbars: SMUFL.MasterBar[];
  rows: SMUFL.Row[];
  core: InstanceType<typeof Core.Score>;
}
export class Score implements IScore {
  type;
  core;
  clientWidth;
  tracks;
  masterbars;
  elements;
  bars;
  rows;
  constructor({
    core,
    type,
    clientWidth = 0,
    rows,
  }: {
    type: "Pagination" | "VerticalScroll" | "HorizontalScroll";
    clientWidth?: number;
    rows: SMUFL.Row[];
    core: InstanceType<typeof Core.Score>;
  }) {
    this.core = core;
    this.type = type;
    this.clientWidth = clientWidth;
    this.tracks = core.tracks.map((track) => new SMUFL.Track({ core: track }));
    this.elements = R.pipe(this.tracks, R.flatMap(R.prop("elements")));
    this.bars = R.pipe(this.tracks, R.flatMap(R.prop("bars")));
    this.masterbars = this.core.masterbars.map((masterbar) => {
      const bars = this.bars.filter(({ core }) =>
        masterbar.bars.some(R.piped(R.prop("id"), R.isDeepEqual(core.id)))
      );
      return new SMUFL.MasterBar({
        core: masterbar,
        elements: R.pipe(bars, R.flatMap(R.prop("elements"))),
        bars,
      });
    });

    this.rows = rows;
  }
}
