import { firstBy, prop } from "remeda";
import { Bar } from "./bar";

export class Masterbar {
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
