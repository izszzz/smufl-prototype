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
    const root = this.createSVGElement("g", { y: 10 });
    // create staffs
    smufl.rows.forEach((row) => {
      const trackRowElement = this.createSVGElement("g", {
        type: "row",
        y: row.y,
      });
      const barlinesGroup = this.createSVGElement("g", {
        type: "barlines",
      });
      root.appendChild(trackRowElement).appendChild(barlinesGroup);
      // barline
      for (const masterBar of row.masterBars) {
        for (const {
          barline: { start, end },
          x,
          y,
        } of masterBar.bars) {
          barlinesGroup.appendChild(
            this.createSMULFSVGElement(start.glyphName, {
              type: "barline",
              y,
              x,
            })
          );
          if (end)
            barlinesGroup.appendChild(
              this.createSMULFSVGElement(end.glyphName, {
                type: "barline",
                y,
                x: x + masterBar.width,
              })
            );
        }
      }
      for (const track of row.tracks) {
        const trackGroup = this.createSVGElement("g", {
          type: "track",
          y: track.y,
        });
        trackRowElement.appendChild(trackGroup);
        for (const bar of track.bars) {
          const barGroup = this.createSVGElement("g", {
            type: "bar",
            x: bar.x,
          });
          const staffsGroup = this.createSVGElement("g", {
            type: "staffs",
          });
          const elementsGroup = this.createSVGElement("g", {
            type: "elements",
            x: bar.metadata?.width ?? 0,
          });
          const metadatasGroup = this.createSVGElement("g", {
            type: "metadata",
          });

          trackGroup
            .appendChild(barGroup)
            .append(metadatasGroup, elementsGroup, staffsGroup);

          R.times(
            smufl.masterBars.find((masterBar) => masterBar.id === bar.core.id)
              ?.width ?? 0,
            (i) => {
              const staffGlyph = SMUFL.Staff.getStaffGlyph(
                1,
                track.staffLineCount
              );
              staffsGroup.appendChild(
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
            } of bar.metadata.glyphs.columns.flat()) {
              metadatasGroup.appendChild(
                this.createSMULFSVGElement(glyphName, {
                  type: "metadata",
                  x,
                  y,
                })
              );
            }
          }
          for (const { x, y, accessory } of bar.elements) {
            const elementGroup = this.createSVGElement("g", {
              type: "element",
              x,
              y,
            });
            elementsGroup.appendChild(elementGroup);
            for (const glyph of accessory.glyphs.columns) {
              for (const { glyphName, x, y } of glyph) {
                elementGroup.appendChild(
                  this.createSMULFSVGElement(glyphName, { x, y })
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

  private createSVGElement: typeof this.svg.createSVGElement = (
    qualifiedName,
    options
  ) => {
    if (R.isNonNullish(options?.x))
      options.x = options.x * this.options.fontSizeRatio;
    if (R.isNonNullish(options?.y))
      options.y = options.y * this.options.fontSizeRatio;
    if (R.isNonNullish(options?.width))
      options.width = options.width * this.options.fontSizeRatio;
    if (R.isNonNullish(options?.height))
      options.height = options.height * this.options.fontSizeRatio;
    return this.svg.createSVGElement(qualifiedName, options);
  };
  private createSMULFSVGElement = (
    glyphName: Parameters<typeof SMUFL.getCodepoint>[0],
    options?: Parameters<typeof this.svg.createSVGElement>[1]
  ) => {
    const element = this.createSVGElement("text", {
      type: "glyph",
      ...options,
    });
    element.innerHTML = String.fromCodePoint(SMUFL.getCodepoint(glyphName));
    return element;
  };
}
