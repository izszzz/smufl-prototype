import Metadata from "./metadata.json";

export class Generator {
  genOper;
  genAmount;
  constructor({
    genOper,
    genAmount,
  }: {
    genOper: number;
    genAmount: { amount: number } | { hi: number; lo: number };
  }) {
    this.genOper = Metadata["generators"][genOper]!.name;
    this.genAmount = "amount" in genAmount ? genAmount.amount : genAmount;
  }
}
