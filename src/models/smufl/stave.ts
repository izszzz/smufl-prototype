import * as Sheet from "sheet";
import { Group } from "./group";

export class Stave extends Sheet.Stave {
  group: Group;
  constructor({ group, ...stave }: { group: Group } & Sheet.Stave) {
    super(stave);
    this.group = group;
  }
}
