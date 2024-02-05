import fs from "fs";
import * as Core from "../core";
import { MidiImporter } from "./midi_importer";

test("export quarter middle C Core.Note", () => {
	function toArrayBuffer(buffer: Buffer) {
		return buffer.buffer.slice(
			buffer.byteOffset,
			buffer.byteOffset + buffer.byteLength,
		);
	}
	const { score } = new MidiImporter(
		toArrayBuffer(
			fs.readFileSync("src/models/importer/fixtures/quarter_middle_c.mid"),
		),
	);
	expect(score.tracks).toContainEqual(
		new Core.Track({
			name: "track",
			bars: [
				new Core.Bar({ notes: [new Core.Note({ pitch: 60, fraction: 4 })] }),
			],
		}),
	);
});
