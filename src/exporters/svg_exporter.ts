import * as Core from "../models/core";
import * as R from "remeda";
import * as SMUFL from "../models/smufl";
import { Exporter } from "./exporter";
import { SMUFLExporter } from "./smufl_exporter";
import "../extensions/svgsvgelement/create_svg_element.extensions";

type Options = ConstructorParameters<typeof SMUFLExporter>[1] & {
  fontSizeRatio: number;
};
export class SVGExporter implements Exporter<SVGSVGElement> {
  score;
  svg;
  options;
  constructor(score: Core.Score, options: Options) {
    this.score = score;
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.options = options;
  }
  export() {
    const smufl = new SMUFLExporter(this.score, this.options).export();
    console.log(smufl);
    const root = this.svg.createSVGElement("g", {
      y: 10 * this.options.fontSizeRatio,
    });
    // create staffs
    smufl.rows.forEach((row) => {
      const trackRowElement = this.svg.createSVGElement("g", {
        type: "row",
        y: row.y * this.options.fontSizeRatio,
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
              y: y * this.options.fontSizeRatio,
              x: x * this.options.fontSizeRatio,
            })
          );
          if (end)
            barlinesElement.appendChild(
              this.createSMULFSVGElement(end.glyphName, {
                type: "barline",
                y: y * this.options.fontSizeRatio,
                x: (x + masterBar.width) * this.options.fontSizeRatio,
              })
            );
        }
      }
      for (const track of row.tracks) {
        const trackElement = this.svg.createSVGElement("g", {
          type: "track",
          y: track.y * this.options.fontSizeRatio,
        });
        trackRowElement.appendChild(trackElement);
        for (const bar of track.bars) {
          const barElement = this.svg.createSVGElement("g", {
            type: "bar",
            x: bar.x * this.options.fontSizeRatio,
          });
          const staffsElement = this.svg.createSVGElement("g", {
            type: "staffs",
          });
          const notesElement = this.svg.createSVGElement("g", {
            type: "notes",
            x: (bar.metadata?.width ?? 0) * this.options.fontSizeRatio,
          });
          const metadataElement = this.svg.createSVGElement("g", {
            type: "metadata",
            y: -1 * this.options.fontSizeRatio,
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
                  x: i * this.options.fontSizeRatio,
                })
              );
            }
          );
          if (bar.metadata) {
            for (const {
              glyphName,
              x,
              y,
            } of bar.metadata.glyphs.columns.flat()) {
              metadataElement.appendChild(
                this.createSMULFSVGElement(glyphName, {
                  x: x * this.options.fontSizeRatio,
                  y: y * this.options.fontSizeRatio,
                })
              );
            }
          }
          for (const element of bar.elements) {
            const noteElement = this.svg.createSVGElement("g", {
              type: "note",
              x: element.x * this.options.fontSizeRatio,
              y: element.y * this.options.fontSizeRatio,
            });
            notesElement.appendChild(noteElement);
            for (const glyph of element.accessory.glyphs.columns) {
              for (const g of glyph) {
                noteElement.appendChild(
                  this.createSMULFSVGElement(g.glyphName, {
                    x: g.x * this.options.fontSizeRatio,
                  })
                );
              }
            }
          }
        }
      }
    });

    this.svg.appendChild(root);
    return this.svg;
  }

  private createSMULFSVGElement = (
    glyphName: Parameters<typeof SMUFL.getCodepoint>[0],
    options?: Parameters<typeof this.svg.createSVGElement>[1]
  ) => {
    const element = this.svg.createSVGElement("text", options);
    element.innerHTML = String.fromCodePoint(SMUFL.getCodepoint(glyphName));
    return element;
  };
}
