import * as Sheet from "sheet";
import * as SMUFL from "smufl";
import { P, match } from "ts-pattern";

export class Note extends Sheet.Note {
  declare score: SMUFL.Score;
  get stave() {
    return super.stave as SMUFL.Stave;
  }
  draw() {
    const handleLigature = (ligature: Sheet.Ligature) => {
      ligature.glyphLists = ligature.glyphLists.map((glyphs) =>
        glyphs.map((glyph) =>
          match(glyph)
            .with(
              P.instanceOf(Sheet.Glyph),
              (glyph) =>
                new SMUFL.Glyph(
                  match(glyph.type)
                    .with(Sheet.GlyphType.Accidental, () =>
                      SMUFL.Glyph.findAccidental(this.accidental)
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
                  false,
                  glyph.type,
                  glyph.line
                )
            )
            .with(P.instanceOf(Sheet.Ligature), handleLigature)
            .exhaustive()
        )
      );
      return ligature;
    };
    super.draw();
    this.ligature = this.ligature ? handleLigature(this.ligature) : null;
  }
}
