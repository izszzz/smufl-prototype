import * as Core from "core";
import { filter, isTruthy, map, pipe } from "remeda";
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
  override get height() {
    return new SMUFL.Glyph(
      SMUFL.Glyph.findBarline({
        $$: { ["bar-style"]: [{ _: "light-heavy" }] },
      }),
      Sheet.GlyphType.Barline,
      0
    ).glyphBBox.height;
  }
  override draw() {
    const handleLigature = (
      ligature: Sheet.Ligature<SMUFL.Glyph | Sheet.Glyph>
    ) => {
      ligature.glyphLists = ligature.glyphLists.map((glyphs) =>
        pipe(
          glyphs,
          map((glyph) =>
            match(glyph)
              .with(
                P.when((x): x is SMUFL.Glyph => x.constructor === SMUFL.Glyph),
                (glyph) => glyph
              )
              .with(
                P.when((x): x is Sheet.Glyph => x.constructor === Sheet.Glyph),
                (glyph) =>
                  match(glyph.type)
                    .with(Sheet.GlyphType.Clef, () => {
                      const glyphName = SMUFL.Glyph.findClef(
                        this.resolveClef()
                      );
                      return glyphName
                        ? new SMUFL.Glyph(glyphName, glyph.type, glyph.line)
                        : null;
                    })
                    .with(
                      Sheet.GlyphType.Accidental,
                      () =>
                        new SMUFL.Glyph(
                          SMUFL.Glyph.find("standardAccidentals12Edo", (v) =>
                            v.toLowerCase().includes(
                              match(this.bar.keysignature.tonality)
                                .with(
                                  Core.Enums.Tonality.Major as 0,
                                  () => "sharp"
                                )
                                .with(
                                  Core.Enums.Tonality.Minor as 1,
                                  () => "flat"
                                )
                                .exhaustive()
                            )
                          ),
                          glyph.type,
                          glyph.line
                        )
                    )
                    .with(Sheet.GlyphType.Barline, () => {
                      const glyphName = SMUFL.Glyph.findBarline(
                        this.bar.masterbar.isLast
                          ? {
                              $$: { ["bar-style"]: [{ _: "light-heavy" }] },
                            }
                          : this.barline
                            ? this.barline
                            : {
                                $$: { ["bar-style"]: [{ _: "regular" }] },
                              }
                      );
                      return glyphName
                        ? new SMUFL.Glyph(glyphName, glyph.type, glyph.line)
                        : null;
                    })
                    .otherwise(() => glyph)
              )
              .with(
                P.when(
                  (x): x is Sheet.Ligature => x.constructor === Sheet.Ligature
                ),
                handleLigature
              )
              .exhaustive()
          ),
          filter(isTruthy)
        )
      );
      return ligature;
    };
    super.draw();
    this.ligature = this.ligature && handleLigature(this.ligature);
  }
}
