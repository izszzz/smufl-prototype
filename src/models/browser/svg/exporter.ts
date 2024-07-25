import Core from "../../core";
import * as R from "remeda";
import * as SMUFL from "../../smufl";
import "../../../extensions/svgsvgelement/create_svg_element.extensions";

type Options = ConstructorParameters<typeof SMUFL.Exporter>[1] & {
  fontSizeRatio: number;
};
export class SVGExporter {
  score;
  svg;
  options;
  constructor(score: InstanceType<typeof Core.Score>, options: Options) {
    this.score = score;
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.options = options;
  }
  export() {
    const smufl = new SMUFL.Exporter(this.score, this.options).export();
    console.log({ smufl });
    // TODO: 定数
    const root = this.createSVGElement("g", { y: 10 });
    smufl.rows.forEach(({ y, ...row }) => {
      const trackRowElement = this.createSVGElement("g", { type: "row", y });
      const barlinesGroup = this.createSVGElement("g", { type: "barlines" });
      root.appendChild(trackRowElement).appendChild(barlinesGroup);
      // barline
      for (const { x, glyphs } of row.barlines.columns) {
        const barlineGroup = this.createSVGElement("g", {
          type: "barline",
          x: x,
        });
        barlinesGroup.appendChild(barlineGroup);
        for (const { glyphName, x, y } of glyphs) {
          barlineGroup.appendChild(
            this.createSMULFSVGElement(glyphName, {
              type: "glyph",
              y,
              x,
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
            x: bar.header.width,
          });
          const metadatasGroup = this.createSVGElement("g", {
            type: "metadata",
          });
          trackGroup
            .appendChild(barGroup)
            .append(metadatasGroup, elementsGroup, staffsGroup);

          // create staffs
          R.times(
            (smufl.masterbars.find(
              (masterBar) => masterBar.core.id === bar.core.id
            )?.width ?? 0) + 1,
            (i) => {
              const staffGlyph = new SMUFL.Glyph({
                glyphName: SMUFL.getGlyphname("staves", (glyphName) =>
                  glyphName.includes(`staff${track.staffLineCount}LinesNarrow`)
                ),
              });
              staffsGroup.appendChild(
                this.createSMULFSVGElement(staffGlyph.glyphName, {
                  type: "staff",
                  x: i,
                })
              );
            }
          );
          for (const { x, y, glyphs } of bar.header.columns) {
            const columnGroup = this.createSVGElement("g", {
              type: "column",
              x,
              y,
            });
            metadatasGroup.appendChild(columnGroup);
            for (const { x, y, glyphName } of glyphs) {
              columnGroup.appendChild(
                this.createSMULFSVGElement(glyphName, {
                  type: "glyph",
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
            if (accessory)
              for (const column of accessory.glyphGrid.columns)
                for (const { glyphName, y } of column.glyphs)
                  elementGroup.appendChild(
                    this.createSMULFSVGElement(glyphName, { x: column.x, y })
                  );
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
