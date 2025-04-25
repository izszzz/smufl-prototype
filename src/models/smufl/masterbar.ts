import * as Sheet from "sheet";
import { firstBy, prop } from "remeda";
import { Stave } from "./stave";

export class Masterbar<Bar extends Sheet.Bar<Sheet.Note, Stave>> {
  id;
  bars;
  get width() {
    return firstBy(this.bars, [prop("width"), "desc"])?.width ?? 0;
  }
  constructor({ id, bars }: { id: number; bars: Bar[] }) {
    this.id = id;
    this.bars = bars;
  }
}
