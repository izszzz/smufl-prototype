import * as Core from "core";
import * as Midi from "../files/standard-midi-file";
import { Zip } from "../files/zip";
import * as xml2js from "xml2js";
import * as R from "remeda";
import * as MusicXml from "musicxml";
import "core/extensions/to_sheet";
import "musicxml/extensions/to_sheet";
import "sheet/extensions/to_smufl";
import "smufl/extensions/to_svg";
import { MusicXML } from "src/const/musicxml/4.0/musicxml";
import { parseNumbers } from "xml2js/lib/processors";

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
        console.log(
          await new xml2js.Parser({
            explicitArray: true,
            explicitCharkey: true,
            explicitChildren: true,
            valueProcessors: [parseNumbers],
          }).parseStringPromise(data)
        );
        this.core = new MusicXml.MXL(
          (await new xml2js.Parser({
            explicitArray: true,
            explicitCharkey: true,
            explicitChildren: true,
            valueProcessors: [parseNumbers],
          }).parseStringPromise(data)) as MusicXML
        ).toSheet();
      }
    }
    if (typeof reader.result === "string") {
      if (extname === ".json") {
        this.core = Core.create(JSON.parse(reader.result)).toSheet();
      }
    }
  }
}
