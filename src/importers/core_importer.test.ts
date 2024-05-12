import { describe, expect, test } from "vitest";
import { CoreImporter } from "./core_importer";
import quarter_middle_c from "../fixtures/core/quarter_middle_c.json";
import quarter_dot_middle_c from "../fixtures/core/quarter_dot_middle_c.json";
import eighth_middle_c from "../fixtures/core/8th_middle_c.json";
import quarter_rest from "../fixtures/core/quarter_rest.json";
import eighth_rest from "../fixtures/core/8th_rest.json";

describe("Note", () => {
  describe("Fraction", () => {
    test("quarter", () => {
      const core = new CoreImporter(quarter_middle_c).import();
      expect(core.tracks[0].elements[0].fraction).toEqual(4);
    });
    test("quarter dot", () => {
      const core = new CoreImporter(quarter_dot_middle_c).import();
      expect(core.tracks[0].elements[0].fraction).toEqual(4);
      expect(core.tracks[0].elements[0].dot).toEqual(true);
    });
    test("8th", () => {
      const core = new CoreImporter(eighth_middle_c).import();
      expect(core.tracks[0].elements[0].fraction).toEqual(8);
    });
  });
});

describe("Rest", () => {
  describe("Fraction", () => {
    test("quarter", () => {
      const core = new CoreImporter(quarter_rest).import();
      expect(core.tracks[0].elements[0].fraction).toEqual(4);
    });

    test("8th", () => {
      const core = new CoreImporter(eighth_rest).import();
      expect(core.tracks[0].elements[0].fraction).toEqual(8);
    });
  });
});
