import * as Core from "./";

interface IRest extends Core.IElement {}
interface Constructor extends Omit<IRest, "time" | "fraction" | "dot"> {
  time: ReturnType<typeof Core.Time.build>;
}
interface Build extends Omit<Constructor, "track"> {}
export class Rest extends Core.Element implements IRest {
  constructor(element: Constructor) {
    super(element);
  }
  static build(params: Build) {
    return params;
  }
}
