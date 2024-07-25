import * as R from "remeda";
import * as SMUFL from ".";

export class Row extends SMUFL.Rect {
  tracks;
  masterBars;
  barlines;
  constructor({
    masterBars,
    tracks,
  }: {
    tracks: SMUFL.Track[];
    masterBars: SMUFL.MasterBar[];
  }) {
    super();
    this.masterBars = masterBars;
    this.tracks = tracks;
    // TODO: 定数
    for (const bar of R.first(this.masterBars)?.bars ?? [])
      bar.setClef(new SMUFL.Glyph({ glyphName: "gClef", y: -1 }));

    this.barlines = new SMUFL.GlyphGrid([
      R.times(
        3 * this.tracks.length - 2,
        (i) => new SMUFL.Glyph({ glyphName: "barlineSingle", y: i * 4 })
      ),
      // TODO: 負の数は0として扱っているが、coreのnoteが0個でもbarを生成するのであれば,負の数にはならないはず
      ...R.times(masterBars.length - 1 < 0 ? 0 : masterBars.length - 1, () =>
        R.times(
          this.tracks.length,
          (i) => new SMUFL.Glyph({ glyphName: "barlineSingle", y: i * 12 })
        )
      ),
      R.times(
        this.tracks.length,
        (i) => new SMUFL.Glyph({ glyphName: "barlineFinal", y: i * 12 })
      ),
    ]);

    this.width = R.pipe(
      this.masterBars,
      R.map(R.prop("width")),
      R.reduce((acc, cur) => R.add(acc, cur), 0)
    );
  }
}
