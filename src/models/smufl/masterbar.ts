import * as R from "remeda";
import * as SMUFL from "./";
interface IMasterBar {
  id: number;
  bars: SMUFL.Bar[];
}

export class MasterBar extends SVGRect implements IMasterBar {
  id;
  bars;
  groupedElements;
  constructor({ id, bars }: IMasterBar) {
    super();
    this.id = id;
    this.bars = bars;
    this.groupedElements = R.pipe(
      bars,
      R.flatMap((b) => b.elements),
      R.groupBy((e) => e.core.time.start)
    );
    this.width =
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
      )?.width ?? 0);
  }
}
