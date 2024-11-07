export class MusicXml {
  document;
  constructor(document: Document) {
    this.document = document;
  }
  get smufl() {
    console.log({ mxl: this.document });
    console.log(this.document);
    Array.from(
      this.document
        .querySelector("part-list")
        ?.getElementsByTagName("score-part") ?? []
    ).map((scorePart) => {
      Array.from(
        this.document
          .querySelector(`part#${scorePart.id}`)
          ?.getElementsByTagName("measure") ?? []
      ).map((measure) => {
        console.log(measure.getElementsByTagName("note"));
      });
    });
    return;
  }
}
