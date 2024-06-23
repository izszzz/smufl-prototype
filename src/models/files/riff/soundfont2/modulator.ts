import Metadata from "./metadata.json";

export class Modulator {
  srcOper;
  destOper;
  modAmount;
  amtSrcOper;
  modTransOper;

  constructor({
    srcOper,
    destOper,
    modAmount,
    amtSrcOper,
    modTransOper,
  }: {
    srcOper: number;
    destOper: number;
    modAmount: number;
    amtSrcOper: number;
    modTransOper: number;
  }) {
    this.srcOper = srcOper;
    this.destOper = Metadata["generator"][destOper];
    this.modAmount = modAmount;
    this.amtSrcOper = amtSrcOper;
    this.modTransOper = modTransOper;
  }
}
