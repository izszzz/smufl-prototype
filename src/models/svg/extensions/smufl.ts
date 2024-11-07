import * as d3 from "d3";
import * as SMUFL from "../../tsmufl";
declare module "../../tsmufl" {
  interface Score {
    toSVG: () => SVGSVGElement | null;
    toD3Hierarchy: () => SVGSVGElement | null;
  }
}
SMUFL.Score.prototype.toSVG = function (this: SMUFL.Score) {
  const svg = d3.create("svg");
  svg
    // score
    .append("g")
    .attr("type", "score")
    // parts
    .selectAll("g[type=part]")
    .data(this.parts)
    .join("g")
    .attr("type", "part")
    // tracks
    .selectAll("g[type=track]")
    .data((p) => p.tracks)
    .join("g")
    .attr("type", "track")
    // bars
    .selectAll("g[type=bar]")
    .data((t) => t.bars)
    .join("g")
    .attr("type", "bar")
    // notes
    .selectAll("g[type=note]")
    .data((b) => b.notes)
    .join("g")
    .attr("type", "note")
    .call((g) => {
      const notehead = g.datum().notehead;
      if (notehead)
        g.append("text").text(String.fromCodePoint(notehead.glyph.codepoint));
      const stem = g.datum().stem;
      if (stem)
        g.append("text").text(String.fromCodePoint(stem.glyph.codepoint));
      const flag = g.datum().flag;
      if (flag)
        g.append("text").text(String.fromCodePoint(flag.glyph.codepoint));
    });
  return svg.node();
};
