import JSZip from "jszip";
import * as Core from "../core";
import { Midi } from "../files/midi";
import { MusicXml } from "../files/mxl";
export class Importer {
  core;
  constructor(file: File) {
    const reader = new FileReader();
    const extname = file.name.slice(file.name.lastIndexOf("."));
    if (file.type === "application/json") reader.readAsText(file);
    if (file.type === "audio/mid" || extname === ".mxl")
      reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      if (!reader.result) return;

      if (reader.result instanceof ArrayBuffer) {
        if (file.type === "audio/mid")
          this.core = new Midi.Importer(reader.result).import();
        if (extname === ".mxl") {
          const zip = await new JSZip().loadAsync(reader.result);
          const data = await Promise.all(
            Object.entries(zip.files).map(async ([fileName, zip]) => {
              return {
                fileName,
                data: new DOMParser().parseFromString(
                  await zip.async("text"),
                  "application/xml"
                ),
              };
            })
          );
          new MusicXml(data);
        }
      }
      if (typeof reader.result === "string") {
        if (extname === ".json")
          this.core = new Core.Importer(JSON.parse(reader.result)).import();
      }
    };
  }
}
