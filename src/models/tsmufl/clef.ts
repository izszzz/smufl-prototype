import * as SMUFL from ".";
export class Clef {
  sign: "F" | "G" = "F";
  line: number = 2;
  glyph = new SMUFL.Glyph("gClef");
}
