import * as Core from "../models/core";
import { Exporter } from "./exporter";
export class CoreExporter implements Exporter<Core.Score> {
  score: Core.Score;
  export() {
    return new Core.Score({ tracks: [] });
  }
}
