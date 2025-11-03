import { ScorePartwise } from "src/const/musicxml/4.0/musicxml";

export class MXL {
  constructor(public mxl: { ["score-partwise"]: ScorePartwise[number] }) {}
}
