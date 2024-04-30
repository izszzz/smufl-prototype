import * as R from "remeda";
import * as Core from "../core";
import * as SMUFL from "./";

export class Note implements SMUFL.IPosition {
	x = 0;
	y = 0;
	get width() {
		return this.glyphs.width;
	}
	bar;
	core;
	glyph;
	glyphs;
	accessory: {
		left: SMUFL.Glyphs;
		middle: SMUFL.Glyph[];
		right: SMUFL.Glyphs;
	};
	spacing = new SMUFL.Spacing();
	constructor(note: Core.Note, bar: SMUFL.Bar) {
		this.core = note;
		this.bar = bar;
		this.y = this.#calcNoteY(note);
		this.glyph = new SMUFL.Glyph({
			glyphName: this.#searchNoteGlyphName(note),
		});
		this.accessory = {
			left: new SMUFL.Glyphs({
				glyphs: R.pipe(
					[],
					R.conditional(
						[
							() => this.#isNoteAccidental(note),
							R.concat([
								[
									new SMUFL.Glyph({
										glyphName: this.#calcNoteAccidental(note),
									}),
								],
							]),
						],
						R.conditional.defaultCase(() => []),
					),
				),
			}),
			middle: R.pipe(
				[],
				R.conditional(
					[
						() => this.#isNoteLegerLine(note),
						R.concat([
							new SMUFL.Glyph({
								glyphName: this.#searchLegerLineGlyphName(note),
							}),
						]),
					],
					R.conditional.defaultCase(() => []),
				),
			),
			right: new SMUFL.Glyphs({ glyphs: [] }),
		};
		this.glyphs = new SMUFL.Glyphs({
			glyphs: [
				...this.accessory.left.glyphs,
				[...this.accessory.middle, this.glyph],
				...this.accessory.right.glyphs,
			],
		});
	}

	#searchNoteGlyphName = (note: Core.Note) =>
		R.pipe(
			SMUFL.Ranges.individualNotes.glyphs,
			R.filter((glyphName) => glyphName !== "augmentationDot"),
			R.filter((glyphName) => glyphName.includes("note")),
			R.filter((noteGlyphName) =>
				noteGlyphName.includes(String(this.#calcNoteFraction(note))),
			),
			R.filter((fraction) =>
				fraction.includes(String(this.#calcNoteStem(note))),
			),
		)[0];

	#searchLegerLineGlyphName = (note: Core.Note) =>
		SMUFL.Ranges.staves.glyphs.filter((glyphName) =>
			glyphName.includes("legerLine"),
		)[0]; // TODO: middle C以外のlegerlineも表示できるようにする
	// .filter((legerLineGlyphName) =>calcNoteFraction(note))
	// .filter((fraction) => fraction)[0]
	#ajustNotePitch = ({ pitch }: Core.Note) =>
		pitch - SMUFL.Metadatas.midiMiddleC;
	#calcNoteBasePitch = (note: Core.Note) =>
		(this.#ajustNotePitch(note) %
			SMUFL.Metadatas.baseOctaveKeys
				.length) as SMUFL.Metadatas["baseOctaveKeys"][number];
	#calcNoteAccidental = ({ prev: prevNote, pitch }: Core.Note) =>
		"accidentalSharp" as const;
	// !prevNote
	// 	? "accidentalSharp"
	// 	: prevNote.pitch < pitch
	// 	  ? "accidentalSharp"
	// 	  : "accidentalFlat";
	#calcNoteStem = (note: Core.Note) =>
		this.#ajustNotePitch(note) >= SMUFL.Metadatas.baseOctaveKeys.length
			? "Down"
			: "Up";
	#calcNoteOctave = (note: Core.Note) =>
		Math.trunc(
			this.#ajustNotePitch(note) / SMUFL.Metadatas.baseOctaveKeys.length,
		);
	#calcNoteOctaveY = (note: Core.Note) =>
		this.#calcNoteOctave(note) * (SMUFL.Metadatas.baseWhiteKeys.length + 1);
	#calcNotePosition = (note: Core.Note) => {
		let pitch = this.#ajustNotePitch(note);
		const accidental = this.#isNoteAccidental(note)
			? this.#calcNoteAccidental(note)
			: null;
		if (accidental === "accidentalSharp") pitch -= 1;
		// if (accidental === "accidentalFlat") pitch += 1;
		return pitch;
	};
	#calcNoteWhiteKeyPosition = (note: Core.Note) =>
		(SMUFL.Metadatas.baseWhiteKeys as number[]).indexOf(
			(SMUFL.Metadatas.baseOctaveKeys as number[]).indexOf(
				this.#calcNotePosition(note),
			),
		);
	#calcNoteY = (note: Core.Note) =>
		(2 - (this.#calcNoteWhiteKeyPosition(note) + this.#calcNoteOctaveY(note))) *
		SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness;
	#calcNoteFraction = ({ fraction }: Core.Note) =>
		SMUFL.Metadatas.noteFractions.find(({ value }) => fraction === value)?.type;
	#isNoteAccidental = (note: Core.Note) =>
		!SMUFL.Metadatas.baseWhiteKeys.some(
			(key) => key === this.#calcNoteBasePitch(note),
		);
	#isNoteLegerLine = (note: Core.Note) => 0 === this.#calcNotePosition(note);
}
