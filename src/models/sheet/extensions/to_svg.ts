import * as d3 from "d3";
import * as R from "remeda";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

declare module "sheet" {
  interface Score {
    toSVG: (options: { ratio: number }) => SVGSVGElement | null;
  }
}
// それぞれの要素の幅は動的に決定されるようにしたいので、SVG描画前に幅情報を揃える必要がある
// 例えば、Sheet.Scoreの情報をOrderクラスに渡して、グリフと幅情報を整理した後、OrderインスタンスをLayoutクラスに渡したあとに、SVG描画を行う

Sheet.Score.prototype.toSVG = function (this: Sheet.Score) {
  const svg = d3
    .create("svg")
    .attr("font-size", 4)
    .attr("height", 1000)
    .attr("width", 1000);
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const score = this;
  svg
    .append("g")
    .attr("type", "score")
    .attr("transform", `translate(50, 50) scale(10)`)
    .call(function (g) {
      g.selectAll("g[type=track]")
        .data(score.tracks)
        .join("g")
        .attr("type", "track")
        .each(function (track) {
          const g = d3.select(this);
          g.selectAll("g[type=bar]")
            .data(track.bars)
            .join("g")
            .attr("type", "bar")
            .each(function (bar) {
              const g = d3.select(this);
              g.selectAll("g[type=stave]")
                .data(bar.staves)
                .join("g")
                .attr("type", "stave")
                .attr(
                  "transform",
                  (_, i) => `translate(0, ${(4 + 6.5) * i + 4})`
                )
                .each(function (stave) {
                  const g = d3.select(this);
                  g.append("g").call((g) => {
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
                                [bar.width, -i],
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
                      .attr("x", bar.width)
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
                      const [numerator, denominator] = R.pipe(
                        [
                          bar.timesignature.numerator,
                          bar.timesignature.denominator,
                        ] as const,
                        R.map((number) =>
                          SMUFL.Glyph.find("timeSignatures", (v) =>
                            v.toLocaleLowerCase().includes(number.toString())
                          )
                        )
                      );
                      const g = d3
                        .create("svg:g")
                        .attr("type", "timesignature");

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

              g.append("g")
                .attr("type", "notes")
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
                          SMUFL.Glyph.find("staves", (v) =>
                            v.includes("legerLine")
                          ).codepoint
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
                      `translate(${rest.advancedWidth + note.x}, ${-note.y})`
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
                      `translate(${notehead.advancedWidth + note.x}, ${-note.y})`
                    )
                      .append("text")
                      .text(String.fromCodePoint(notehead.codepoint))
                      .call((t) => {
                        const stem = note.stem;
                        if (stem) {
                          const stemGlyph = SMUFL.Glyph.find("stems", (v) =>
                            v.includes("stem")
                          );
                          if (stem === "up") {
                            const stemRight =
                              notehead.anchor.stemUpSE[0] -
                              stemGlyph.advancedWidth;
                            t.append("tspan")
                              .attr("x", stemRight)
                              .text(String.fromCodePoint(stemGlyph.codepoint));
                            const flag = note.flag;
                            if (flag)
                              t.append("tspan")
                                .attr("x", stemRight)
                                .attr("y", stemGlyph.bBox.top)
                                .text(
                                  String.fromCodePoint(flag.glyph.codepoint)
                                );
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
                                .text(
                                  String.fromCodePoint(flag.glyph.codepoint)
                                );
                          }
                        }
                      });
                  }
                });
            });
        })
        // TODO: 定数
        .attr("transform", (_, i) => `translate(0, ${17 * i})`);
    });

  return svg.node();
};
