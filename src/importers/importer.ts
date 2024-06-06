import Core from "../models/core";
export interface Importer {
  import: () => InstanceType<typeof Core.Score>;
}
