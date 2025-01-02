import * as Core from "../core";
import * as Midi from "../files/midi";
import { Type } from "../files/mxl/schema";
import { Zip } from "../files/zip";
import * as xml2js from "xml2js";
import * as R from "remeda";
import { MusicXml } from "../files/mxl";
export class Importer {
  core;
  async import(file: File) {
    const reader = new FileReader();
    const extname = file.name.slice(file.name.lastIndexOf("."));
    if (file.type === "application/json") reader.readAsText(file);
    if (file.type === "audio/mid" || extname === ".mxl")
      reader.readAsArrayBuffer(file);
    await new Promise((resolve) => (reader.onload = () => resolve()));
    if (reader.result instanceof ArrayBuffer) {
      if (file.type === "audio/mid")
        this.core = Midi.toCore(Midi.parse(reader.result));
      if (extname === ".mxl") {
        const zip = await new Zip(reader.result).unzip();
        const meta = await zip.files["META-INF/container.xml"]?.async("text");
        if (!meta) return;
        const rootfile = new DOMParser()
          .parseFromString(meta, "application/xml")
          .getElementsByTagName("rootfile")[0];
        const pathName = rootfile?.getAttribute("full-path");
        if (!pathName) return;
        const data = await zip.files[pathName]?.async("text");
        if (!data) return;
        this.core = new MusicXml(
          (
            (await new xml2js.Parser({
              tagNameProcessors: [(name) => R.pipe(name, R.toCamelCase())],
              attrNameProcessors: [(name) => R.pipe(name, R.toCamelCase())],
            }).parseStringPromise(data)) as {
              scorePartwise: Type.ScorePartwise;
            }
          ).scorePartwise
        ).toSheet();
      }
    }
    if (typeof reader.result === "string") {
      if (extname === ".json") {
        this.core = Core.create(JSON.parse(reader.result));
      }
    }
  }
}
