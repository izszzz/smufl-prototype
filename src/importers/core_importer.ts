import * as Core from "../models/core";
import { Importer } from "./importer";

export class CoreImporter implements Importer {
  params;
  constructor(params: Parameters<typeof Core.Score.build>[0]) {
    this.params = params;
  }
  import() {
    return this.init();
  }
  private init() {
    const score = new Core.Score(this.params);
    for (const track of score.tracks) {
      track.notes.reduce((acc, cur) => {
        if (cur instanceof Core.Note) {
          cur.prev = acc;
          for (const note of acc) {
            note.next.push(cur);
          }
          acc = [];
          acc.push(cur);
        }
        return acc;
      }, [] as Core.Note[]);
    }
    return score;
  }
}
