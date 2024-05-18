import * as SMUFL from "../models/smufl";
import { describe, expect, test } from "vitest";
import { SVGExporter } from "./svg_exporter";
import quarter_middle_c from "../fixtures/core/quarter_middle_c.json";
import { CoreImporter } from "../importers/core_importer";

describe("Note", () => {
  test("glyph", () => {
    const svg = new SVGExporter(new CoreImporter(quarter_middle_c).import(), {
      fontSizeRatio: 0,
      clientWidth: 0,
      type: "VerticalScroll",
    }).export();
    expect(
      svg.querySelector("g[type=note]")?.textContent?.codePointAt(1)
    ).toEqual(SMUFL.getCodePoint("noteQuarterUp"));
  });
});
