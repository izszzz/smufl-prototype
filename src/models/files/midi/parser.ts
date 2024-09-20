import * as R from "remeda";
import { Parser as BinaryParser } from "binary-parser";
import Metadata from "./metadata.json";

let prevReadUntil = false;
let prevStatusByte: { type: number; channel: number } | null = null;
const { metaEvents } = Metadata.mtrk;

const noteMidiEventParser = new BinaryParser().uint8("pitch").uint8("velocity");
const controllerMidiEventParser = new BinaryParser()
  .uint8("controller")
  .uint8("value");
const metaEventParser = new BinaryParser()
  .seek(1)
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
  .nest("runningStatus", { type: new BinaryParser().bit1("flag").bit7("_") })
  .seek(-1)
  .nest("statusByte", {
    type: new BinaryParser().bit4("type").bit4("channel"),
    formatter: statusByteFormatter,
  })
  .seek(-1)
  .choice({
    tag: "runningStatus.flag",
    choices: {
      0: new BinaryParser().choice("event", {
        tag: "statusByte.type",
        choices: {
          8: noteMidiEventParser,
          9: noteMidiEventParser,
          11: noteMidiEventParser,
          12: controllerMidiEventParser,
        },
      }),
      1: new BinaryParser().choice("event", {
        tag: "statusByte.type",
        choices: {
          8: new BinaryParser().seek(1).nest({ type: noteMidiEventParser }),
          9: new BinaryParser().seek(1).nest({ type: noteMidiEventParser }),
          11: new BinaryParser().seek(1).nest({ type: noteMidiEventParser }),
          12: new BinaryParser()
            .seek(1)
            .nest({ type: controllerMidiEventParser }),
          15: metaEventParser,
        },
      }),
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

function metaEventChoice(
  metaEvent: keyof typeof metaEvents,
  parser: (
    parser: BinaryParser,
    name: string,
    length: { length: string }
  ) => BinaryParser
) {
  return {
    [metaEvents[metaEvent].type]: parser(
      new BinaryParser(),
      metaEvents[metaEvent].name,
      { length: "length" }
    ),
  };
}
export function statusByteFormatter(
  this: { runningStatus: { flag: number } },
  item: { type: number; channel: number }
) {
  if (Metadata.mtrk.metaEvent.type === item.type) {
    this.runningStatus.flag = 1;
    return item;
  }
  if (this.runningStatus.flag === 0) return prevStatusByte;
  if ((Metadata.mtrk.midiEvent.type as number[]).includes(item.type))
    return (prevStatusByte = item);
}
