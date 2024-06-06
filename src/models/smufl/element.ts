import Metadata from "../../consts/metadata.json";
import * as SMUFL from "./";
import Core from "./core";

export abstract class Element extends SMUFL.Rect {
  accessory?: SMUFL.Accessory;
  spacing = new SMUFL.Spacing();
  core;
  glyph?: SMUFL.Glyph;
  private get baseDuration() {
    return Metadata.fractions
      .map((fraction) => fraction.length)
      .sort((a, b) => a - b)
      .reduce((prev, cur) => {
        if (cur <= this.core.duration) return cur;
        return prev;
      });
  }
  get dot() {
    let duration = this.core.duration;
    let dot = 0;
    while (duration % this.baseDuration !== 0) {
      duration *= 2;
      dot += 1;
    }
    return dot;
  }
  get fraction() {
    return (
      this.core.getMetadata().timeSignature.denominator *
      (1 / this.baseDuration)
    );
  }
  get fractionLiteral() {
    return SMUFL.getFractionLiteral(this.fraction);
  }

  constructor({ core }: { core: InstanceType<typeof Core.Element> }) {
    super();
    this.core = core;
  }
  protected init() {
    this.width = this.accessory?.width ?? 0;
  }
}
