import { Parser } from "binary-parser";
import midi from "../consts/midi.json";

const { metaEvents } = midi.mtrk;
const metaEventChoice = (
	metaEvent: keyof typeof metaEvents,
	parser: (parser: Parser, name: string, length: { length: string }) => Parser,
) => ({
	[metaEvents[metaEvent].type]: parser(
		new Parser(),
		metaEvents[metaEvent].name,
		{ length: "length" },
	),
});
const midiEventParser = new Parser().uint8("pitch").uint8("velocity");
const metaEventParser = new Parser()
	.uint8("type")
	.uint8("length")
	.choice({
		tag: "type",
		choices: {
			...metaEventChoice("text", (p, n, l) => p.string(n, l)),
			...metaEventChoice("copyright", (p, n, l) => p.string(n, l)),
			...metaEventChoice("trackName", (p, n, l) => p.string(n, l)),
			...metaEventChoice("instrumentName", (p, n, l) => p.string(n, l)),
			...metaEventChoice("marker", (p, n, l) => p.string(n, l)),
			...metaEventChoice("deviceName", (p, n, l) => p.string(n, l)),
			...metaEventChoice("endOfTrack", (p, n, l) => p.string(n, l)),
			...metaEventChoice("tempo", (p, n, l) => p.bit24(n, l)),
			...metaEventChoice("timeSignature", (p, n, l) =>
				p.nest(n, {
					type: new Parser()
						.uint8("numerator")
						.uint8("denominator", { formatter: (item) => item ** 2 })
						.uint8("clock")
						.uint8("bb"),
				}),
			),
			...metaEventChoice("keySignature", (p, n, l) =>
				p.nest(n, {
					type: new Parser()
						.bit4("sharp")
						.bit4("flat")
						.bit4("major")
						.bit4("minor"),
				}),
			),
		},
		defaultChoice: new Parser().buffer("buffer", {
			length: "length",
		}),
	});
let prevReadUntil = false;
const midiTrackEventParser = new Parser()
	.buffer("deltaTime", {
		readUntil: (item) => {
			const readUntil = prevReadUntil;
			prevReadUntil = !(item & midi.mtrk.deltaTime.readUntil);
			return readUntil;
		},
		// TODO: 繰り返し文に直す
		formatter: (item: Uint8Array) => ((item[0] & 0x7f) << 7) | (item[1] & 0x7f),
	})
	.bit4("type")
	.bit4("channel")
	.choice("event", {
		tag: "type",
		choices: {
			8: midiEventParser,
			9: midiEventParser,
			15: metaEventParser,
		},
	});
const midiHeaderChunk = new Parser()
	.string("type", { length: midi.mthd.header.type.length })
	.uint32("length")
	.uint16("format")
	.uint16("trackCount")
	.uint16("resolution");
const midiTrackChunk = new Parser()
	.string("type", {
		length: midi.mtrk.header.type.length,
	})
	.uint32("length")
	.array("events", {
		type: midiTrackEventParser,
		readUntil: (item) =>
			item?.event.type === midi.mtrk.metaEvents.endOfTrack.type,
	});
export const midiParser = new Parser()
	.useContextVars()
	.nest("mthd", { type: midiHeaderChunk })
	.array("mtrks", { type: midiTrackChunk, length: "mthd.trackCount" });
