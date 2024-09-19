import path from "path";
import * as SMUFL_Core from "../../models/smufl/core";
import * as Core from "../../models/core";

export const importCore = async (fileName: string) =>
  new SMUFL_Core.Extender().extend(
    new Core.Importer(
      await import(
        path.join("..", "..", "fixtures", "core", `${fileName}.json`)
      )
    ).import()
  );
