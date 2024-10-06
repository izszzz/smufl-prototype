export class MusicXml {
  data;
  constructor(
    data: {
      fileName: string;
      data: Document;
    }[]
  ) {
    this.data = data;
  }
}
