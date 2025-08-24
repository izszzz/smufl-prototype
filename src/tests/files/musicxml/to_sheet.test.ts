import { readFileSync } from "fs";
import { expect, test } from "vitest";
import { importCore } from "../../../tests";
import * as xml2js from "xml2js";
import * as MusicXml from "musicxml";
import { parseNumbers } from "xml2js/lib/processors";
import { Zip } from "../../../../src/models/files/zip";
import path from "path";
import { ScorePartwise } from "src/const/musicxml/4.0/musicxml";
const importMusicXML = async (fileName: string) => {
  const arrayBuffer = readFileSync(
    path.join("src", "fixtures", "files", "musicxml", `${fileName}.mxl`)
  ).toArrayBuffer();
  const zip = await new Zip(arrayBuffer).unzip();
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
    new MusicXml.MXL(
      (await new xml2js.Parser({
        explicitArray: true,
        explicitCharkey: true,
        explicitChildren: true,
        valueProcessors: [parseNumbers],
        attrValueProcessors: [parseNumbers],
      }).parseStringPromise(data)) as {
        ["score-partwise"]: ScorePartwise[0];
      }
    ).toSheet()
  );
  return new MusicXml.MXL(
    (await new xml2js.Parser({
      explicitArray: true,
      explicitCharkey: true,
      explicitChildren: true,
      valueProcessors: [parseNumbers],
      attrValueProcessors: [parseNumbers],
    }).parseStringPromise(data)) as {
      ["score-partwise"]: ScorePartwise[0];
    }
  ).toSheet();
};

test("quarter_middle_c", async () =>
  expect(await importMusicXML("quarter_middle_c")).toEqual(
    (await importCore("quarter_middle_c")).toSheet()
  ));
