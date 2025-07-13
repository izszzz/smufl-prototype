import * as d3 from "d3";
import * as R from "remeda";
import * as SMUFL from "smufl";

declare module "smufl" {
  interface Score {
    toSVG: (options: { ratio: number; scale: number }) => SVGSVGElement | null;
  }
}

SMUFL.Score.prototype.toSVG = function (this: SMUFL.Score, options) {
  const svg = d3
    .create("svg")
    .attr("font-size", options.ratio)
    .attr("height", this.height)
    .attr("width", this.width);
  svg
    .append("g")
    .attr("type", "score")
    .attr("transform", `translate(0, 50) scale(${options.scale})`)
    .call((g) => {
      g.selectAll("g[type=row]")
        .data(this.rows)
        .join("g")
        .attr("type", "row")
        .attr("transform", (row) => `translate(0, ${row.y})`)
        .each(function (row) {
          const g = d3.select(this);
          g.selectAll("g[type=masterbar]")
            .data(row.masterbars)
            .join("g")
            .attr("type", "masterbar")
            .attr("transform", (masterbar) => `translate(${masterbar.x}, 0)`)
            .each(function (masterbar) {
              const g = d3.select(this);
              g.selectAll("g[type=bar]")
                .data(masterbar.bars)
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
                      (_, i) => `translate(0, ${(4 + 6.5) * i})`
                    )
                    .each(function (stave) {
                      renderGroup(this, stave.group);
                      const g = d3.select(this);
                      g.append("g").call((g) => {
                        g.append("g")
                          .attr("type", "staff")
                          .attr("transform", `translate(0, 0)`)
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
                                    [stave.group.width, -i],
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

  function renderGroup(element: d3.BaseType | SVGGElement, group: SMUFL.Group) {
    const g = d3.select(element);
    g.selectAll("g[type=group]")
      .data(group.children)
      .join("g")
      .attr("type", "group")
      .attr("transform", `translate(${group.x}, ${-group.y})`)
      .each(function (child) {
        const g = d3.select(this);
        if (child instanceof SMUFL.Group) renderGroup(this, child);
        if (child instanceof SMUFL.Text) {
          g.append("text")
            .attr("y", -child.y)
            .attr("x", child.x)
            .attr("dx", child.dx)
            .attr("rotate", child.rotate)
            .text(String.fromCodePoint(child.glyph.codepoint));
        }
      });
  }

  return svg.node();
};
