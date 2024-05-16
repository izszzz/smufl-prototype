import * as Core from "../models/core";
import * as R from "remeda";
import * as SMUFL from "../models/smufl";
import { Exporter } from "./exporter";
import { SMUFLExporter } from "./smufl_exporter";
export class SVGExporter implements Exporter<SVGGElement> {
  score;
  svg;
  constructor(score: Core.Score) {
    this.score = score;
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  }
  export() {
    const smufl = new SMUFLExporter(this.score).export();
    const root = this.svg.createSVGElement("g", { y: 10 });
    // create staffs
    smufl.rows.forEach((row) => {
      const trackRowElement = this.svg.createSVGElement("g", {
        type: "row",
        y: row.y,
      });
      const barlinesElement = this.svg.createSVGElement("g", {
        type: "barlines",
      });
      root.appendChild(trackRowElement);
      trackRowElement.appendChild(barlinesElement);
      // barline
      for (const masterBar of row.masterBars) {
        for (const {
          barline: { start, end },
          x,
          y,
        } of masterBar.bars) {
          barlinesElement.appendChild(
            this.createSMULFSVGElement(start.glyphName, {
              type: "barline",
              y,
              x,
            })
          );
          if (end)
            barlinesElement.appendChild(
              this.createSMULFSVGElement(end.glyphName, {
                type: "barline",
                y,
                x: x + masterBar.width,
              })
            );
        }
      }
      for (const track of row.tracks) {
        const trackElement = this.svg.createSVGElement("g", {
          type: "track",
          y: track.y,
        });
        trackRowElement.appendChild(trackElement);
        for (const bar of track.bars) {
          const barElement = this.svg.createSVGElement("g", {
            type: "bar",
            x: bar.x,
          });
          const staffsElement = this.svg.createSVGElement("g", {
            type: "staffs",
          });
          const notesElement = this.svg.createSVGElement("g", {
            type: "notes",
            x: bar.metadata?.width,
          });
          const metadataElement = this.svg.createSVGElement("g", {
            type: "metadata",
            y: -1,
          });

          trackElement.appendChild(barElement);
          barElement.appendChild(metadataElement);
          barElement.appendChild(notesElement);
          barElement.appendChild(staffsElement);

          R.times(
            smufl.masterBars.find((masterBar) => masterBar.id === bar.core.id)
              ?.width ?? 0,
            (i) => {
              const staffGlyph = SMUFL.Staff.getStaffGlyph(
                1,
                track.staffLineCount
              );
              staffsElement.appendChild(
                this.createSMULFSVGElement(staffGlyph.glyphName, {
                  type: "staff",
                  x: i,
                })
              );
            }
          );
          if (bar.metadata) {
            for (const {
              glyphName,
              x,
              y,
            } of bar.metadata.glyphs.glyphs.flat()) {
              metadataElement.appendChild(
                this.createSMULFSVGElement(glyphName, { x, y })
              );
            }
          }
          for (const element of bar.elements) {
            const noteElement = this.svg.createSVGElement("g", {
              type: "note",
              x: element.x,
              y: element.y,
            });
            notesElement.appendChild(noteElement);
            for (const glyph of element.glyphs.glyphs) {
              for (const g of glyph) {
                noteElement.appendChild(
                  this.createSMULFSVGElement(g.glyphName, { x: g.x })
                );
              }
            }
          }
        }
      }
    });

    return root;
  }

  private createSMULFSVGElement = (
    glyphName: keyof SMUFL.Glyphnames,
    options?: Parameters<typeof this.svg.createSVGElement>[1]
  ) => {
    const element = this.svg.createSVGElement("text", options);
    element.innerHTML = SMUFL.Glyphnames[glyphName].codepoint.replace(
      "U+",
      "&#x"
    );
    return element;
  };
}
