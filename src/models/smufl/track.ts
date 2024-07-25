import * as R from "remeda";
import * as SMUFL from ".";
import Core from "../core";

export class Track extends SMUFL.Point {
  bars;
  elements;
  staffLineCount: SMUFL.Metadatas["staffLines"][number] = 5;
  core;
  height = new SMUFL.Glyph({
    glyphName:
      this.staffLineCount === 1
        ? `staff1Line`
        : `staff${this.staffLineCount}Lines`,
  }).bBox.height;
  constructor({ core }: { core: InstanceType<typeof Core.Track> }) {
    super();
    this.core = core;
    this.elements = R.pipe(
      this.core.elements,
      R.map((core) => {
        if (core instanceof Core.Note) return new SMUFL.Note(core, this);
        if (core instanceof Core.Rest) return new SMUFL.Rest(core);
      }),
      R.filter(R.isTruthy)
    );
    this.bars = R.pipe(
      core.bars,
      R.map(
        (bar) =>
          new SMUFL.Bar({
            core: bar,
            elements: this.elements.filter(
              R.piped(
                R.prop("core"),
                R.prop("bar"),
                R.prop("id"),
                R.isStrictEqual(bar.id)
              )
            ),
          })
      )
    );
  }
}
