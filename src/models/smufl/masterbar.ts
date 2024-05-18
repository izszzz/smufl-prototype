import * as R from "remeda";
import * as SMUFL from "./";
interface IMasterBar {
  id: number;
  bars: SMUFL.Bar[];
}

export class MasterBar implements IMasterBar, SMUFL.IPosition, SMUFL.IBox {
  id;
  bars;
  x = 0;
  y = 0;
  height = 0;
  groupedElements;
  get width() {
    return (
      R.pipe(
        this.groupedElements,
        R.entries(),
        R.map(([, e]) => R.firstBy(e, [R.prop("width"), "desc"]).width),
        R.reduce(R.add, 0)
      ) +
      (R.pipe(
        this.bars,
        R.map(R.prop("metadata")),
        R.filter(R.isTruthy),
        R.firstBy([(m) => m.width, "desc"])
      )?.width ?? 0)
    );
  }
  constructor({ id, bars }: IMasterBar) {
    this.id = id;
    this.bars = bars;
    this.groupedElements = R.pipe(
      bars,
      R.flatMap((b) => b.elements),
      R.groupBy((e) => e.core.time.start)
    );
  }
}
