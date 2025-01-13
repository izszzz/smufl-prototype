import * as Core from "core";
export class Tempo {
  _brandTempo!: never;
  constructor(public value: number) {}
  toBpm() {
    return new Core.Unit.Bpm(Math.floor(60000000 / this.value));
  }
}
