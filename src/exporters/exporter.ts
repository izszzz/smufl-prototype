import Core from "../models/core";
export interface Exporter<T> {
  score: InstanceType<typeof Core.Score>;
  export: () => T;
}
