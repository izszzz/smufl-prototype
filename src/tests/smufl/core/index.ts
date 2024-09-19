import path from "path";
import * as Core from "../../../models/core";
import * as SMUFL_Core from "../../../models/smufl/core";

export const importCore = async (fileName: string) =>
  new SMUFL_Core.Extender().extend(
    new Core.Importer(
      await import(
        path.join("..", "..", "..", "fixtures", "core", `${fileName}.json`)
      )
    ).import()
  );
