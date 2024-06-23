import { describe, expect, test } from "vitest";
import * as SMUFL from "../../../models/smufl";
import { SVGExporter } from "../../../models/browser/svg/svg_exporter";
import { importCore } from "../../core";

export const exportSVG = async (fileName: string) =>
  new SVGExporter(await importCore(fileName), {
    fontSizeRatio: 0,
    clientWidth: 0,
    type: "VerticalScroll",
  }).export();

describe("Note", () => {
  test("codepoint", async () => {
    const svg = await exportSVG("quarter_middle_c");
    expect(
      svg.querySelector("g[type=element]")?.textContent?.codePointAt(1)
    ).toEqual(SMUFL.getCodepoint("noteQuarterUp"));
  });
});
