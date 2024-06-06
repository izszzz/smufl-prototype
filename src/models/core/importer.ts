import Core from ".";

export class Importer {
  params;
  constructor(params: ConstructorParameters<typeof Core.Score>[0]) {
    this.params = params;
  }
  import() {
    const core = new Core.Score(this.params);
    return core;
  }
}
