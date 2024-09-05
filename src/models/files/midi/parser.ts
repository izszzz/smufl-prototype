import * as R from "remeda";
import { Parser as BinaryParser } from "binary-parser";
import Metadata from "./metadata.json";

let prevReadUntil = false;
let prevStatusByte = null;
const { metaEvents } = Metadata.mtrk;
const metaEventChoice = (
  metaEvent: keyof typeof metaEvents,
  parser: (
    parser: BinaryParser,
    name: string,
    length: { length: string }
  ) => BinaryParser
) => ({
  [metaEvents[metaEvent].type]: parser(
    new BinaryParser(),
    metaEvents[metaEvent].name,
    { length: "length" }
  ),
});
const statusByteParser = new BinaryParser().bit4("type").bit4("channel");
const noteMidiEventParser = new BinaryParser()
  .nest("statusByte", {
    type: statusByteParser,
    formatter: (item) => (prevStatusByte = item),
  })
  .uint8("pitch")
  .uint8("velocity");
const controllerMidiEventParser = new BinaryParser()
  .nest("statusByte", {
    type: statusByteParser,
    formatter: (item) => (prevStatusByte = item),
  })
  .uint8("controller")
  .uint8("value");
const metaEventParser = new BinaryParser()
  .nest("statusByte", { type: statusByteParser })
  .uint8("type")
  .uint8("length")
  .choice({
    tag: "type",
    choices: {
      ...metaEventChoice("text", (p, n, l) => p.string(n, l)),
      ...metaEventChoice("copyright", (p, n, l) => p.string(n, l)),
      ...metaEventChoice("trackName", (p, n, l) => p.string(n, l)),
      ...metaEventChoice("instrumentName", (p, n, l) => p.string(n, l)),
      ...metaEventChoice("lyric", (p, n, l) => p.string(n, l)),
      ...metaEventChoice("marker", (p, n, l) => p.string(n, l)),
      ...metaEventChoice("deviceName", (p, n, l) => p.string(n, l)),
      ...metaEventChoice("endOfTrack", (p, n, l) => p.string(n, l)),
      ...metaEventChoice("tempo", (p, n, l) => p.bit24(n, l)),
      ...metaEventChoice("timeSignature", (p, n) =>
        p.nest(n, {
          type: new BinaryParser()
            .uint8("numerator")
            .uint8("denominator", { formatter: (item) => item ** 2 })
            .uint8("clock")
            .uint8("bb"),
        })
      ),
      ...metaEventChoice("keySignature", (p, n) =>
        p.nest(n, { type: new BinaryParser().int8("sf").uint8("mi") })
      ),
    },
    defaultChoice: new BinaryParser().buffer("buffer", { length: "length" }),
  });
const midiTrackEventParser = new BinaryParser()
  .buffer("deltaTime", {
    readUntil: (item) => {
      const readUntil = prevReadUntil;
      prevReadUntil = !(item & Metadata.mtrk.deltaTime.readUntil);
      return readUntil;
    },
    formatter: (item: Uint8Array) =>
      R.reduce(Array.from(item), (acc, byte) => (acc << 7) | (byte & 0x7f), 0),
  })
  .nest("statusByte", { type: statusByteParser })
  .seek(-1)
  .choice("event", {
    tag: "statusByte.type",
    choices: {
      ...R.times(8, () =>
        new BinaryParser()
          .nest("statusByte", {
            type: new BinaryParser(),
            formatter: () => prevStatusByte,
          })
          .uint8("pitch")
          .uint8("velocity")
      ),
      8: noteMidiEventParser,
      9: noteMidiEventParser,
      11: noteMidiEventParser,
      12: controllerMidiEventParser,
      15: metaEventParser,
    },
  });
const midiHeaderChunk = new BinaryParser()
  .string("type", { length: Metadata.mthd.header.type.length })
  .uint32("length")
  .uint16("format")
  .uint16("trackCount")
  .uint16("resolution");
const midiTrackChunk = new BinaryParser()
  .string("type", {
    length: Metadata.mtrk.header.type.length,
  })
  .uint32("length")
  .array("events", {
    type: midiTrackEventParser,
    readUntil: (item) =>
      item?.event.type === Metadata.mtrk.metaEvents.endOfTrack.type,
  });
export const Parser = new BinaryParser()
  .useContextVars()
  .nest("mthd", {
    type: midiHeaderChunk,
  })
  .array("mtrks", { type: midiTrackChunk, length: "mthd.trackCount" });
