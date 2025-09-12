import * as d3 from "d3";
import * as R from "remeda";
import * as SMUFL from "smufl";
import * as Sheet from "sheet";
import { match, P } from "ts-pattern";

declare module "smufl" {
  interface Score {
    toSVG: (
      height: number,
      width: number,
      options: { ratio: number; scale: number }
    ) => SVGSVGElement | null;
  }
}

SMUFL.Score.prototype.toSVG = function (
  this: SMUFL.Score,
  width,
  height,
  options
) {
  console.log(this);
  const svg = d3
    .create("svg")
    .attr("font-size", options.ratio)
    .attr("viewBox", `0 0 ${width / options.scale} ${height / options.scale}`)
    .attr("height", height)
    .attr("width", width);
  svg
    .append("g")
    .attr("type", "score")
    .attr("transform", createTranslate(0, 6.5))
    .call((g) => {
      g.selectAll("g[type=row]")
        .data(this.rows)
        .join("g")
        .attr("type", "row")
        .attr("transform", (row) => createTranslate(0, row.y))
        .each(function (row) {
          const g = d3.select(this);

          g.selectAll("g[type=masterbar]")
            .data(row.masterbars)
            .join("g")
            .attr("type", "masterbar")
            .attr("transform", (masterbar) => createTranslate(masterbar.x, 0))
            .each(function (masterbar) {
              const g = d3.select(this);
              g.selectAll("g[type=track]")
                .data(masterbar.score.tracks)
                .join("g")
                .attr("type", "track")
                .attr("transform", (track) => createTranslate(0, track.y))
                .each(function (track) {
                  const g = d3.select(this);
                  g.selectAll("g[type=bar]")
                    .data(track.getMasterbarBars(masterbar.id))
                    .join("g")
                    .attr("type", "bar")
                    .each(function (bar) {
                      const g = d3.select(this);
                      g.append("path")
                        .attr("stroke", "black")
                        .attr(
                          "stroke-width",
                          SMUFL.BravuraMetadata.engravingDefaults
                            .thinBarlineThickness
                        )
                        .attr(
                          "d",
                          d3.line()([
                            [
                              SMUFL.BravuraMetadata.engravingDefaults
                                .thinBarlineThickness / 2,
                              -5,
                            ],
                            [
                              SMUFL.BravuraMetadata.engravingDefaults
                                .thinBarlineThickness / 2,
                              bar.staves.length * 4 + 6.5 - 5,
                            ],
                          ])
                        );
                      if (masterbar.isRowLast) {
                        g.append("path")
                          .attr("stroke", "black")
                          .attr(
                            "stroke-width",
                            SMUFL.BravuraMetadata.engravingDefaults
                              .thinBarlineThickness
                          )
                          .attr(
                            "d",
                            d3.line()([
                              [
                                masterbar.width -
                                  SMUFL.BravuraMetadata.engravingDefaults
                                    .thinBarlineThickness /
                                    2,
                                -5,
                              ],
                              [
                                masterbar.width -
                                  SMUFL.BravuraMetadata.engravingDefaults
                                    .thinBarlineThickness /
                                    2,
                                bar.staves.length * 4 + 6.5 - 5,
                              ],
                            ])
                          );
                      }
                      if (masterbar.isLast) {
                        g.append("path")
                          .attr("stroke", "black")
                          .attr(
                            "stroke-width",
                            SMUFL.BravuraMetadata.engravingDefaults
                              .thinBarlineThickness
                          )
                          .attr(
                            "d",
                            d3.line()([
                              [
                                masterbar.width -
                                  (SMUFL.BravuraMetadata.engravingDefaults
                                    .thickBarlineThickness *
                                    2 +
                                    SMUFL.BravuraMetadata.engravingDefaults
                                      .thinBarlineThickness /
                                      2),
                                -5,
                              ],
                              [
                                masterbar.width -
                                  (SMUFL.BravuraMetadata.engravingDefaults
                                    .thickBarlineThickness *
                                    2 +
                                    SMUFL.BravuraMetadata.engravingDefaults
                                      .thinBarlineThickness /
                                      2),
                                bar.staves.length * 4 + 6.5 - 5,
                              ],
                            ])
                          );
                        g.append("path")
                          .attr("stroke", "black")
                          .attr(
                            "stroke-width",
                            SMUFL.BravuraMetadata.engravingDefaults
                              .thickBarlineThickness
                          )
                          .attr(
                            "d",
                            d3.line()([
                              [
                                masterbar.width -
                                  SMUFL.BravuraMetadata.engravingDefaults
                                    .thickBarlineThickness /
                                    2,
                                -5,
                              ],
                              [
                                masterbar.width -
                                  SMUFL.BravuraMetadata.engravingDefaults
                                    .thickBarlineThickness /
                                    2,
                                bar.staves.length * 4 + 6.5 - 5,
                              ],
                            ])
                          );
                      }
                      g.selectAll("g[type=stave]")
                        .data(bar.staves)
                        .join("g")
                        .attr("type", "stave")
                        .attr("transform", (stave) =>
                          createTranslate(0, stave.y)
                        )
                        .each(function (stave) {
                          if (stave.ligature)
                            ligatureToSVG(this, stave.ligature);
                          const g = d3.select(this);
                          g.append("g").call((g) => {
                            g.append("g")
                              .attr("type", "staff")
                              .attr("transform", createTranslate(0, 0))
                              .call((g) => {
                                R.times(5, (i) => {
                                  i++;
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
                                        [masterbar.width, -i],
                                      ])
                                    );
                                });
                              });
                          });
                        });
                    });
                });
            });
        });
    });

  function createTranslate(x: number, y: number) {
    return `translate(${x}, ${y})`;
  }

  function ligatureToSVG(
    element: d3.BaseType | SVGGElement,
    ligature: Sheet.Ligature<SMUFL.Glyph>
  ) {
    const group = d3
      .select(element)
      .append("g")
      .attr("type", "ligature")
      .attr(
        "transform",
        `translate(${ligature.boundingBox.x}, ${-ligature.line})`
      )
      .attr("width", ligature.width);
    ligature.glyphLists.flat().forEach((glyphOrLigature) => {
      match(glyphOrLigature)
        .with(P.instanceOf(SMUFL.Glyph), (glyph) =>
          group
            .append("text")
            .attr("type", "glyph")
            .attr("x", glyph.boundingBox.x)
            .attr("y", -glyph.line)
            .attr("width", glyph.width)
            .text(String.fromCodePoint(glyph.codepoint))
        )
        .with(P.instanceOf(Sheet.Ligature), (childLigature) =>
          ligatureToSVG(group.node() as SVGGElement, childLigature)
        )
        .exhaustive();
    });
  }

  return svg.node();
};
