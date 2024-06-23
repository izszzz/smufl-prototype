import Metadata from "./metadata.json";

export class Generator {
  genOper;
  genAmount;

  constructor({ genOper, genAmount }: { genOper: number; genAmount: number }) {
    this.genOper = Metadata["generator"][genOper];
    this.genAmount = genAmount;
  }
}
