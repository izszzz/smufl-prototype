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
    this.destOper = Metadata["generators"][destOper];
    this.amtSrcOper = amtSrcOper;
    this.modTransOper = modTransOper;
    //  = Metadata["modulatorTransforms"][modTransOper.toString()];
    this.modAmount = modAmount;
  }
}
// class Source {
//   index;
//   cc;
//   dirction;
//   polarity;
//   type;
//   constructor({
//     index,
//     cc,
//     direction,
//     polarity,
//     type,
//   }: {
//     index: number;
//     cc: number;
//     direction: number;
//     polarity: number;
//     type: number;
//   }) {
//     this.index = index;
//     this.cc = cc;
//     this.dirction = direction;
//     this.polarity = polarity;
//     this.type = Metadata["sourceTypes"][type];
//   }
// }
