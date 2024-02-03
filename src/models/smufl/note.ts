import * as R from "remeda";
import Metadata from "../../consts/metadata.json";
import BravuraMetadata from "../../consts/metadata/bravura_metadata.json";
import Ranges from "../../consts/metadata/ranges.json";
import * as Core from "../core";
import * as SMUFL from "./";

export class Note extends SMUFL.Coord {
	accidental?: SMUFL.Glyph;
	bar: SMUFL.Bar;
	glyph: SMUFL.Glyph | SMUFL.Ligature;
	spacing = new SMUFL.Spacing();
	get width() {
		return (
			R.pipe(
				[this.glyph, this.accidental],
				R.compact,
				R.reduce((acc, cur) => acc + cur.staffWidth, 0),
			) + this.spacing.length
		);
	}
	constructor(note: Core.Note, bar: SMUFL.Bar) {
		super();
		this.bar = bar;
		this.y = this.#calcNoteY(note);
		this.glyph = new SMUFL.Glyph(this.#searchNoteGlyphName(note), {
			coord: { y: this.y },
		});
		if (this.#isNoteLegerLine(note))
			this.glyph = new SMUFL.Ligature([
				new SMUFL.Glyph(this.#searchLegerLineGlyphName(note), {
					coord: { y: this.y },
				}),
				this.glyph,
			]);
		if (this.#isNoteAccidental(note))
			this.accidental = new SMUFL.Glyph(this.#calcNoteAccidental(note), {
				coord: { y: this.y },
			});
	}

	#searchNoteGlyphName = (note: Core.Note) =>
		R.pipe(
			Ranges.individualNotes.glyphs,
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
		Ranges.staves.glyphs.filter((glyphName) =>
			glyphName.includes("legerLine"),
		)[0]; // TODO: middle C以外のlegerlineも表示できるようにする
	// .filter((legerLineGlyphName) =>calcNoteFraction(note))
	// .filter((fraction) => fraction)[0]
	#ajustNotePitch = ({ pitch }: Core.Note) => pitch - Metadata.midiMiddleC;
	#calcNoteBasePitch = (note: Core.Note) =>
		(this.#ajustNotePitch(note) %
			Metadata.baseOctaveKeys.length) as Metadata["baseOctaveKeys"][number];
	#calcNoteAccidental = ({ prev: prevNote, pitch }: Core.Note) =>
		!prevNote
			? "accidentalSharp"
			: prevNote.pitch < pitch
			  ? "accidentalSharp"
			  : "accidentalFlat";
	#calcNoteStem = (note: Core.Note) =>
		this.#ajustNotePitch(note) >= Metadata.baseOctaveKeys.length
			? "Down"
			: "Up";
	#calcNoteOctave = (note: Core.Note) =>
		Math.trunc(this.#ajustNotePitch(note) / Metadata.baseOctaveKeys.length);
	#calcNoteOctaveY = (note: Core.Note) =>
		this.#calcNoteOctave(note) * (Metadata.baseWhiteKeys.length + 1);
	#calcNotePosition = (note: Core.Note) => {
		let pitch = this.#ajustNotePitch(note);
		const accidental = this.#isNoteAccidental(note)
			? this.#calcNoteAccidental(note)
			: null;
		if (accidental === "accidentalSharp") pitch -= 1;
		if (accidental === "accidentalFlat") pitch += 1;
		return pitch;
	};
	#calcNoteWhiteKeyPosition = (note: Core.Note) =>
		(Metadata.baseWhiteKeys as number[]).indexOf(
			(Metadata.baseOctaveKeys as number[]).indexOf(
				this.#calcNotePosition(note),
			),
		);
	#calcNoteY = (note: Core.Note) =>
		(2 - (this.#calcNoteWhiteKeyPosition(note) + this.#calcNoteOctaveY(note))) *
		BravuraMetadata.engravingDefaults.thickBarlineThickness;
	#calcNoteFraction = ({ fraction }: Core.Note) =>
		Metadata.noteFractions.find(({ value }) => fraction === value)?.type;
	#isNoteAccidental = (note: Core.Note) =>
		!Metadata.baseWhiteKeys.some(
			(key) => key === this.#calcNoteBasePitch(note),
		);
	#isNoteLegerLine = (note: Core.Note) => 0 === this.#calcNotePosition(note);
}
