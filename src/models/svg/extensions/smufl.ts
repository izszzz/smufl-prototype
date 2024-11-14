import * as d3 from "d3";
import * as SMUFL from "smufl";

declare module "../../tsmufl" {
  interface Score {
    toSVG: () => SVGSVGElement | null;
    toD3Hierarchy: () => SVGSVGElement | null;
  }
}
SMUFL.Score.prototype.toSVG = function (this: SMUFL.Score) {
  console.log(this);
  const svg = d3.create("svg");
  svg
    // score
    .append("g")
    .attr("type", "score")
    .attr("transform", `translate(100, 100)`)
    .call((g) => {
      // parts
      g.selectAll("g[type=part]")
        .data(this.parts)
        .join("g")
        .attr("type", "part")
        .attr("transform", (_, i) => `translate(0, ${i * 8 * 4})`)
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
        .call((g) => {
          const bar = g.datum();
          g.append("g")
            .attr("type", "staff")
            .append("text")
            .text(
              String.fromCodePoint(bar.track.staff.staffLines.glyph.codepoint)
            );
          // attributes
          g.append("g")
            .attr("type", "attribute")
            .call((g) => {
              const clef = bar.attributes.clef;
              if (clef)
                g.append("text").text(
                  String.fromCodePoint(clef.glyph.codepoint)
                );
            });
          // notes
          g.append("g")
            .attr("type", "notes")
            .attr(
              "transform",
              `translate(${bar.attributes.clef.glyph.bBox.width * 4}, 0)`
            )
            // note
            .selectAll("g[type=note]")
            .data((b) => b.notes)
            .join("g")
            .attr("type", "note")
            .call((g) => {
              const note = g.datum();
              const notehead = note.notehead;
              if (notehead) {
                g.append("text")
                  .text(String.fromCodePoint(notehead.glyph.codepoint))
                  .call((t) => {
                    const stem = note.stem;
                    if (stem) {
                      if (stem.type === "Up") {
                        const stemLeft =
                          (notehead.glyph.anchor.stemUpSE[0] -
                            stem.glyph.advancedWidth) *
                          4;
                        t.append("tspan")
                          .attr("x", stemLeft)
                          .text(String.fromCodePoint(stem.glyph.codepoint));
                        const flag = note.flag;
                        if (flag)
                          t.append("tspan")
                            .attr("x", stemLeft)
                            .attr("y", stem.glyph.bBox.top * 4)
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
