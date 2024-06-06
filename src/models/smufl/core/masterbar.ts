import { Identifier } from "../../../helpers";
import * as R from "remeda";
import Core from "../../core";
export class MasterBar extends Core.Event implements Identifier {
  id: number;
  bars;
  sequence;
  elements;
  score;
  constructor({
    bars,
    score,
    ...event
  }: {
    score: InstanceType<typeof Core.Score>;
    bars: InstanceType<typeof Core.Bar>[];
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.score = score;
    this.id =
      (R.firstBy(this.score.masterbars, [R.prop("id"), "desc"])?.id ?? 0) + 1;
    this.bars = bars;
    this.elements = this.bars.flatMap((bar) => bar.elements);
    this.sequence = new Core.Sequence({ elements: this.elements });
  }
}
