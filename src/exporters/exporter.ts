import Core from "../models/core";
export interface Exporter<T> {
  score: Core.Score;
  export: () => T;
}
