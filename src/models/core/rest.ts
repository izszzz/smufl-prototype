import * as Core from "./";

interface IRest extends Core.IElement {}
interface IRestObject {}
export class Rest extends Core.Element implements IRest {
  constructor({ track, time, bar }: Omit<IRest, "fraction">) {
    super({ track, bar, time });
  }
  static build(params: IRestObject) {
    return params;
  }
}
