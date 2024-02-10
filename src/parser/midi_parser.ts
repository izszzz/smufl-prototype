import { Parser } from "binary-parser";
import * as R from "remeda";
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
			...metaEventChoice("bpm", (p, n, l) =>
				p.bit24(n, {
					...l,
					formatter: (item) => Math.floor(midi.mtrk.tempo.divideSeconds / item),
				}),
			),
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
		// TODO: type 8 or 9 => midiEvent
		// TODO: type 15 => metaEvent or SysExEvent
		// TODO: channel 0 or 7 => SysExEvent
		// TODO: channel 15 => metaEvent
		tag: function () {
			if (
				midi.mtrk.midiEvent.type
					//@ts-ignore
					.includes(this.type)
			)
				return 0;
			if (
				//@ts-ignore
				R.equals(this.type, midi.mtrk.metaEvent.type) &&
				//@ts-ignore
				R.equals(this.channel, midi.mtrk.metaEvent.channel)
			)
				return 1;
			// if (
			// 	//@ts-ignore
			// 	R.equals(this.type, midi.mtrk.sysExEvent.type) &&
			// 	//@ts-ignore
			// 	R.equals(this.channel, midi.mtrk.sysExEvent.channel)
			// )
			// 	return 2;
			return -1;
		},
		choices: {
			0: midiEventParser,
			1: metaEventParser,
			// 2: metaEventParser,
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
