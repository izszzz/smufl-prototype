import * as SMUFL from "../tsmufl";
export class Clef {
  sign: "F" | "G" = "F";
  line: number = 2;
  glyph = new SMUFL.Glyph("gClef");
}
