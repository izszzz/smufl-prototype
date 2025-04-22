import * as Sheet from "sheet";
import { Group } from "./group";

export class Bar extends Sheet.Bar {
  group: Group;
  x;
  constructor({ group, x, ...bar }: { group: Group; x?: number } & Sheet.Bar) {
    super(bar);
    this.group = group;
    this.x = x ?? 0;
  }
}
