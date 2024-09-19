import { describe, expect, test } from "vitest";
import { statusByteFormatter } from "./parser";
import Metadata from "./metadata.json";

describe("statsuByteFormatter", () => {
  test("runningStatus midiEvent", () => {
    const midiEvent = { type: 8, channel: 0 };
    expect(
      statusByteFormatter.apply({ runningStatus: { flag: 0 } }, [midiEvent])
    ).toEqual(null);
  });
  for (const type of Metadata.mtrk.midiEvent.type) {
    test("midiEvent", () => {
      const midiEvent = { type, channel: 0 };
      expect(
        statusByteFormatter.apply({ runningStatus: { flag: 1 } }, [midiEvent])
      ).toEqual(midiEvent);
    });
  }
  test("metaEvent", () => {
    const metaEvent = { type: 15, channel: 0 };
    expect(
      statusByteFormatter.apply({ runningStatus: { flag: 0 } }, [metaEvent])
    ).toEqual(metaEvent);
  });
});
