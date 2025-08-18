import * as Core from "core";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";
import { P, match } from "ts-pattern";

export class Stave extends Sheet.Stave {
  declare score: SMUFL.Score;
  override get bar() {
    return super.bar as SMUFL.Bar;
  }
  override get notes() {
    return super.notes as SMUFL.Note[];
  }
  override get width() {
    return this.ligature?.width ?? 0;
  }
  override get height() {
    return new SMUFL.Glyph(
      Sheet.GlyphType.Barline,
      0,
      SMUFL.Glyph.findBarline({
        $$: { ["bar-style"]: [{ _: "light-heavy" }] },
      }),
      false
    ).boundingBox.height;
  }
  override draw() {
    const handleLigature = (
      ligature: Sheet.Ligature<SMUFL.Glyph | Sheet.Glyph>
    ) => {
      ligature.glyphsList = ligature.glyphsList.map((glyphs) =>
        glyphs.map((glyph) =>
          match(glyph)
            .with(
              P.when((x): x is SMUFL.Glyph => x.constructor === SMUFL.Glyph),
              (glyph) => glyph
            )
            .with(
              P.when((x): x is Sheet.Glyph => x.constructor === Sheet.Glyph),
              (glyph) =>
                new SMUFL.Glyph(
                  glyph.type,
                  glyph.line,
                  match(glyph.type)
                    .with(Sheet.GlyphType.Clef, () =>
                      SMUFL.Glyph.findClef(this.resolveClef())
                    )
                    .with(Sheet.GlyphType.Accidental, () =>
                      SMUFL.Glyph.find("standardAccidentals12Edo", (v) =>
                        v.toLowerCase().includes(
                          match(this.bar.keysignature.tonality)
                            .with(Core.Tonality.Major as 0, () => "flat")
                            .with(Core.Tonality.Minor as 1, () => "sharp")
                            .exhaustive()
                        )
                      )
                    )
                    .with(Sheet.GlyphType.Barline, () =>
                      SMUFL.Glyph.findBarline(
                        this.bar.masterbar.isLast
                          ? {
                              $$: { ["bar-style"]: [{ _: "light-heavy" }] },
                            }
                          : this.barline
                            ? this.barline
                            : {
                                $$: { ["bar-style"]: [{ _: "regular" }] },
                              }
                      )
                    )
                    .otherwise((glyph) => console.log(glyph)),
                  true
                )
            )
            .with(
              P.when(
                (x): x is Sheet.Ligature => x.constructor === Sheet.Ligature
              ),
              handleLigature
            )
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
