import Core from "../../core";
import { Sequence } from "./sequence";
import { Beat } from "./beat";
import { Chord } from "./chord";
import { Bar } from "./bar";
import { MasterBar } from "./masterbar";
import { Rest } from "./rest";
import { Importer } from "./importer";

declare module "../../core" {
  interface CoreConstructor {
    Rest: typeof Rest;
    Bar: typeof Bar;
    MasterBar: typeof MasterBar;
    Sequence: typeof Sequence;
    Beat: typeof Beat;
    Chord: typeof Chord;
  }
}
declare module "../../core/score" {
  interface Score {
    masterbars: InstanceType<typeof MasterBar>[];
  }
}
declare module "../../core/element" {
  interface Element {
    bar: Bar;
  }
}
declare module "../../core/track" {
  interface Track {
    bars: Bar[];
  }
}
Core.Element.prototype.getMetadata = function () {
  return this.bar?.getMetadata() ?? this.track.getMetadata();
};
Core.Bar = Bar;
Core.Rest = Rest;
Core.MasterBar = MasterBar;
Core.Sequence = Sequence;
Core.Beat = Beat;
Core.Chord = Chord;
Core.Importer = Importer;
export default Core;
