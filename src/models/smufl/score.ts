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
    this.elements = R.pipe(
      this.core.elements,
      R.map((core) => {
        if (core instanceof Core.Note) return new SMUFL.Note({ core });
        if (core instanceof Core.Rest) return new SMUFL.Rest({ core });
      }),
      R.filter(R.isTruthy)
    );
    this.masterbars = this.core.masterbars.map((masterbar) => {
      const masterbarElements = this.elements.filter(
        ({ core }) => core.bar.id === masterbar.id
      );
      return new SMUFL.MasterBar({
        core: masterbar,
        elements: masterbarElements,
        bars: masterbar.bars.map((bar) => {
          return new SMUFL.Bar({
            core: bar,
            elements: masterbarElements.filter(
              ({ core }) =>
                core.bar.id === bar.id && core.bar.track.id === bar.track.id
            ),
          });
        }),
      });
    });
    this.tracks = core.tracks.map(
      (track) =>
        new SMUFL.Track({
          core: track,
          bars: R.pipe(
            this.masterbars,
            R.flatMap(R.prop("bars")),
            R.filter(({ core }) => core.track.id === track.id)
          ),
        })
    );
    this.rows = rows;
  }
}
