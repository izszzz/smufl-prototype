import * as Sheet from "sheet";
import { Masterbar } from "./masterbar";

export class Score extends Sheet.Score {
  masterbars: Masterbar[] = [];
}
