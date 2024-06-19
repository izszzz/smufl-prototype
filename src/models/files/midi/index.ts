import { Importer } from "./importer";
import { Parser } from "./parser";

export class Midi {
  static calcDuration(deltaTime: number, resolution: number) {
    return deltaTime / resolution;
  }
  static Parser = Parser;
  static Importer = Importer;
}
