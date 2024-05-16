import Metadata from "../consts/metadata.json";
import * as Core from "../models/core";
import * as SMUFL from "../models/smufl";
import { SVGExporter } from "../exporters/svg_exporter";
interface SVGRendererOptions {
  layoutType: SMUFL.Score["type"];
  fontSize: number;
}

class SVGRenderer {
  element;
  score;
  svg: SVGSVGElement;
  options;
  get fontSizeRatio() {
    return this.options.fontSize / Metadata.defaultFontSize;
  }
  constructor(
    element: HTMLElement,
    score: Core.Score,
    options: SVGRendererOptions
  ) {
    this.options = options;
    this.element = element;
    this.score = score;
    this.svg = this.createSVGScore(this.score);
    this.append();
  }
  changeFontSize = (fontSize: number) => {
    this.options.fontSize = fontSize;
    this.svg = this.createSVGScore(this.score);
    this.append();
  };

  private append = () => {
    while (this.element.firstChild) this.element.firstChild.remove();
    this.element.appendChild(this.svg);
  };

  private createSVGScore = (score: Core.Score) => {
    console.log(score);
    const svg = new SVGExporter(score, {
      clientWidth: this.svg.clientWidth / this.fontSizeRatio,
      type: this.options.layoutType,
    }).export();
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("font-size", String(this.options.fontSize));
    return svg;
  };
}
export default SVGRenderer;
