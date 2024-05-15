import * as Core from "../../core";
import { Bar } from "./bar";

declare module "../../core" {
  interface Track {
    bars: Bar[];
    elements: Element[];
  }
  interface Element {
    bar: Bar;
  }
}
Core.Element.prototype.getMetadata = function () {
  return this.bar.getMetadata() ?? this.track.getMetadata();
};
