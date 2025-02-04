export class Tempo {
  _tempoBrand!: never;
  constructor(public value: number) {}
  toBpm() {
    return Math.floor(60000000 / this.value);
  }
}
