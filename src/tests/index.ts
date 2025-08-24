import path from "path";
import * as Core from "core";

export const importCore = async (fileName: string) =>
  Core.Score.create(
    await import(path.join("..", "fixtures", "core", `${fileName}.json`))
  );
