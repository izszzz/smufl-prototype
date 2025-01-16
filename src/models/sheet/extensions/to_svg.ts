import * as d3 from "d3";
import * as R from "remeda";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

declare module "sheet" {
  interface Score {
    toSVG: (options: { ratio: number }) => SVGSVGElement | null;
  }
}

Sheet.Score.prototype.toSVG = function (this: Sheet.Score) {
  const svg = d3.create("svg").attr("font-size", 4).attr("height", 1000);
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const score = this;
  svg
    // score
    .append("g")
    .attr("type", "score")
    .attr("transform", `translate(50, 50) scale(10)`)
    .each(function () {
      const g = d3.select(this);
      // parts
      g.selectAll("g[type=track]")
        .data(score.tracks)
        .join("g")
        .attr("type", "track")
        // bars
        .selectAll("g[type=bar]")
        .data((t) => t.bars)
        .join("g")
        .attr("type", "bar")
        .each(function (bar) {
          const g = d3.select(this);
          g
            // stave
            .selectAll("g[type=stave]")
            .data(bar.staves)
            .join("g")
            .attr("type", "stave")
            .attr("transform", `translate(0, 4)`)
            .each(function (stave) {
              const g = d3.select(this);
              g.append("g")
                .attr("transform", `translate(0, ${10.5 * stave.id})`)
                .call((g) => {
                  g.append("g")
                    .attr("type", "staff")
                    .call((g) => {
                      R.times(bar.staffLines, (i) => {
                        g.append("path")
                          .attr("stroke", "black")
                          .attr(
                            "stroke-width",
                            SMUFL.BravuraMetadata.engravingDefaults
                              .staffLineThickness
                          )
                          .attr(
                            "d",
                            d3.line()([
                              [0, -i],
                              [bar.width / 10, -i],
                            ])
                          );
                      });
                    });
                  const glyph = SMUFL.Glyph.find("barlines", (v) =>
                    v.includes("Single")
                  );
                  g.append("g")
                    .attr("type", "barline")
                    .append("text")
                    .attr("x", bar.width / 10)
                    .text(String.fromCodePoint(glyph.codepoint));
                  const attributes: d3.Selection<
                    Element,
                    undefined,
                    null,
                    undefined
                  >[] = [];
                  if (stave.clef) {
                    const glyph = SMUFL.Glyph.find(
                      "clefs",
                      (v) => v.charAt(0) === stave.clef.sign.toLowerCase()
                    );
                    const g = d3
                      .create("svg:g")
                      .attr("type", "clef")
                      .attr("width", glyph.advancedWidth + glyph.bBox.width);
                    g.append("text")
                      .attr("y", -stave.clef.line + 1)
                      .attr("x", glyph.advancedWidth)
                      .attr("width", glyph.advancedWidth + glyph.bBox.width)
                      .text(String.fromCodePoint(glyph.codepoint));
                    attributes.push(g);
                  }
                  if (bar.timesignature) {
                    const numerator = SMUFL.Glyph.find("timeSignatures", (v) =>
                      v
                        .toLocaleLowerCase()
                        .includes(bar.timesignature.numerator.toString())
                    );
                    const denominator = SMUFL.Glyph.find(
                      "timeSignatures",
                      (v) =>
                        v
                          .toLocaleLowerCase()
                          .includes(bar.timesignature.denominator.toString())
                    );
                    const g = d3.create("svg:g").attr("type", "timesignature");

                    g.call((g) => {
                      g.append("text")
                        .attr("y", -3)
                        .attr("x", numerator.advancedWidth)
                        .text(String.fromCodePoint(numerator.codepoint));
                      g.append("text")
                        .attr("y", -1)
                        .attr("x", denominator.advancedWidth)
                        .text(String.fromCodePoint(denominator.codepoint));
                    });
                    attributes.push(g);
                  }
                  type a = d3.Selection<
                    Element,
                    undefined,
                    null,
                    undefined
                  > | null;
                  g.append("g")
                    .attr("type", "attribute")
                    .call((g) => {
                      R.pipe(
                        attributes,
                        R.reduce<a, a>((prev, a) => {
                          if (!a) return null;
                          a.attr(
                            "transform",
                            `translate(${Number(prev?.attr("width") ?? 0) ?? 0}, 0)`
                          );
                          g.append(() => a.node());
                          return a;
                        }, null)
                      );
                    });
                });
            });

          // notes
          g.append("g")
            .attr("type", "notes")
            // note
            .selectAll("g[type=note]")
            .data(bar.notes)
            .join("g")
            .attr("type", "note")
            .each(function (note) {
              const g = d3.select(this);
              if (note.legerLine > 0) {
                for (let i = 0; i < note.legerLine; i++) {
                  g.append("text").text(
                    String.fromCodePoint(
                      SMUFL.Glyph.find("staves", (v) => v.includes("legerLine"))
                        .codepoint
                    )
                  );
                }
              }
              if (note.rest) {
                const rest = SMUFL.Glyph.find("rests", (v) =>
                  v
                    .toLocaleLowerCase()
                    .includes(
                      note.rest === "measure"
                        ? "restwhole"
                        : note.rest
                          ? note.type ?? ""
                          : ""
                    )
                );
                g.attr(
                  "transform",
                  `translate(${rest.advancedWidth + note.x / 10}, ${-(note.y / 10)})`
                )
                  .append("text")
                  .text(String.fromCodePoint(rest.codepoint));
              } else {
                const type = note.type;
                if (!type) return;
                const notehead = SMUFL.Glyph.find("noteheads", (v) =>
                  v
                    .toLocaleLowerCase()
                    .includes(type === "quarter" ? "black" : type)
                );
                g.attr(
                  "transform",
                  `translate(${notehead.advancedWidth + note.x / 10}, ${-(note.y / 10)})`
                )
                  .append("text")
                  .text(String.fromCodePoint(notehead.codepoint))
                  .call((t) => {
                    const stem = note.stem;
                    if (stem) {
                      console.log(notehead.anchor);
                      const stemGlyph = SMUFL.Glyph.find("stems", (v) =>
                        v.includes("stem")
                      );
                      if (stem === "up") {
                        const stemRight =
                          notehead.anchor.stemUpSE[0] - stemGlyph.advancedWidth;
                        t.append("tspan")
                          .attr("x", stemRight)
                          .text(String.fromCodePoint(stemGlyph.codepoint));
                        const flag = note.flag;
                        if (flag)
                          t.append("tspan")
                            .attr("x", stemRight)
                            .attr("y", stemGlyph.bBox.top)
                            .text(String.fromCodePoint(flag.glyph.codepoint));
                      }
                      if (stem === "down") {
                        t.append("tspan")
                          .attr("rotate", `180`)
                          .attr("x", -stemGlyph.advancedWidth)
                          .text(String.fromCodePoint(stemGlyph.codepoint));
                        const flag = note.flag;
                        if (flag)
                          t.append("tspan")
                            .attr("x", 0)
                            .attr("y", stemGlyph.bBox.top)
                            .text(String.fromCodePoint(flag.glyph.codepoint));
                      }
                    }
                  });
              }
            });
        });
    });
  return svg.node();
};
