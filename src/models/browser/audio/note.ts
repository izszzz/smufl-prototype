import Core from "../../core";

export class Note {
  core;
  constructor(core: InstanceType<typeof Core.Note>) {
    this.core = core;
  }
}
