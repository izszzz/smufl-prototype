import * as Sheet from "sheet";
import * as SMUFL from "smufl";
import { P, match } from "ts-pattern";

export class Note extends Sheet.Note {
  declare score: SMUFL.Score;
  override get stave() {
    return super.stave as SMUFL.Stave;
  }

  override draw() {
    const handleLigature = (ligature: Sheet.Ligature) => {
      ligature.glyphsList = ligature.glyphsList.map((glyphs) =>
        glyphs.map((glyph) =>
          match(glyph)
            .with(
              P.instanceOf(Sheet.Glyph),
              (glyph) =>
                new SMUFL.Glyph(
                  glyph.type,
                  glyph.line,
                  match(glyph.type)
                    .with(Sheet.GlyphType.Accidental, () =>
                      SMUFL.Glyph.find("standardAccidentals12Edo", (v) =>
                        v.toLowerCase().includes(
                          match(this.accidental)
                            .with(
                              Sheet.AccidentalType.Sharp as 0,
                              () => "sharp"
                            )

                            .with(Sheet.AccidentalType.Flat as 1, () => "flat")
                            .exhaustive()
                        )
                      )
                    )
                    .with(Sheet.GlyphType.LegerLine, () =>
                      SMUFL.Glyph.find("staves", (v) => v === "legerLine")
                    )
                    .with(Sheet.GlyphType.Rest, () =>
                      SMUFL.Glyph.findRest(this.rest!, this.type)
                    )
                    .with(Sheet.GlyphType.Notehead, () =>
                      SMUFL.Glyph.findNotehead(this.type)
                    )
                    .with(Sheet.GlyphType.Stem, () =>
                      SMUFL.Glyph.find("stems", (v) => v.includes("stem"))
                    )
                    // .with(Sheet.GlyphType.Flag, (type) => new SMUFL.Glyph(type))
                    .run(),
                  false
                )
            )
            .with(P.instanceOf(Sheet.Ligature), handleLigature)
            .exhaustive()
        )
      );
      ligature.draw();
      return ligature;
    };
    super.draw();
    this.ligature = this.ligature ? handleLigature(this.ligature) : null;
  }
}
