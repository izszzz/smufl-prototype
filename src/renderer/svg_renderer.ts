import * as R from "remeda";
import Metadata from "../consts/metadata.json";
import * as Core from "../models/core";
import * as SMUFL from "../models/smufl";
import { SVGExporter } from "../exporters/svg_exporter";
interface SVGRendererOptions {
  layoutType: SMUFL.Score["type"];
  fontSize: number;
}

// TODO: 設計考え直したほうがいい
class SVGRenderer {
  element: HTMLElement;
  score: Core.Score;
  svg: SVGSVGElement;
  fontSize: SVGRendererOptions["fontSize"];
  fontSizeRatio: number;
  layoutType: SMUFL.Score["type"] = "HorizontalScroll";
  constructor(
    element: HTMLElement,
    score: Core.Score,
    options?: SVGRendererOptions
  ) {
    this.element = element;
    this.score = score;
    this.fontSize = 30;
    if (options) {
      if (options.fontSize) this.fontSize = options.fontSize;
      if (options.layoutType) this.layoutType = options.layoutType;
    }
    this.fontSizeRatio = this.fontSize / Metadata.defaultFontSize;
    this.svg = this.createSVGScore(this.score);
    // TODO: width, height fontsizeの設定
    // this.createSVGElement("svg", {
    //   width: "100%",
    //   height: "100%",
    //   "font-size": this.fontSize,
    // });
    this.upsertSVGElement();
  }
  changeFontSize = (fontSize: number) => {
    this.fontSize = fontSize;
    this.fontSizeRatio = this.fontSize / Metadata.defaultFontSize;
    this.svg = this.createSVGScore(this.score);
    // TODO: width, height fontsizeの設定
    // this.createSVGElement("svg", {
    //   width: "100%",
    //   height: "100%",
    //   "font-size": this.fontSize,
    // });
    this.upsertSVGElement();
  };
  private upsertSVGElement = () => {
    while (this.element.firstChild) this.element.firstChild.remove();
    this.element
      .appendChild(this.svg)
      .appendChild(this.createSVGScore(this.score));
  };

  private createSVGScore = (score: Core.Score) => {
    console.log(score);
    return new SVGExporter(score, {
      clientWidth: this.svg.clientWidth / this.fontSizeRatio,
      type: this.layoutType,
    }).export();
  };
}
export default SVGRenderer;
