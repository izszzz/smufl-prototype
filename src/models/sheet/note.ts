import * as Core from "core";
import * as Sheet from "sheet";
import { Type } from "../files/mxl/schema";
// y軸を指定しない場合にノートが描画される位置E4（64）
const BASE_PITCH_Y = () => {
  const pitch = new Core.Unit.Pitch(64);
  return pitch.octave * Core.Metadata.majorWhiteNotes.length + pitch.whiteKey;
};

export class Note extends Core.Note {
  track!: Sheet.Track;
  bar!: Sheet.Bar;
  chord;
  stem;
  type;
  rest;
  voice;
  staff;
  flag: null = null;

  get y() {
    if (this.rest) {
      return 0;
    }
    return (
      BASE_PITCH_Y() -
      (this.pitch.octave * Core.Metadata.majorWhiteNotes.length +
        this.pitch.whiteKey)
    );
  }
  get legerLine() {
    return this.pitch.value > 80 || this.pitch.value <= 60
      ? Math.ceil((this.pitch.value - 59) / 2)
      : 0;
  }

  constructor({
    rest,
    chord,
    type,
    stem,
    voice,
    staff,
    ...note
  }: {
    type: Type.NoteTypeValue | null;
    stem: Type.StemValue | null;
    rest: boolean | "measure";
    chord: boolean;
    staff: number;
    voice: number;
  } & Core.Note) {
    super(note);
    this.chord = chord;
    this.stem = stem;
    this.type = type;
    this.rest = rest;
    this.staff = staff;
    this.voice = voice;
  }
}
