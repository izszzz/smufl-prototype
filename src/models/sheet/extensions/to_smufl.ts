import * as R from "remeda";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

declare module "sheet" {
  interface Score {
    toSMUFL: () => SMUFL.Score;
  }
}

Sheet.Score.prototype.toSMUFL = function (this: Sheet.Score) {
  const score = new SMUFL.Score({
    ...this,
    tracks: this.tracks.map(
      (track) =>
        new Sheet.Track({
          ...track,
          bars: track.bars.map(
            (bar) =>
              new Sheet.Bar({
                ...bar,
                staves: bar.staves.map(
                  (stave) =>
                    new SMUFL.Stave({
                      ...stave,
                      group: new SMUFL.Group({
                        children: [],
                      }),
                    })
                ),
              })
          ),
        })
    ),
  });

  score.masterbars = this.masterbars.map((masterbar, i) => {
    const bars = R.times(score.tracks.length, (j) => score.tracks[j]!.bars[i]!);
    const smuflMasterbar = new SMUFL.Masterbar({
      ...masterbar,
      bars,
    });
    smuflMasterbar.x = masterbar.x;
    return smuflMasterbar;
  });
  score.rows = this.rows.map(
    (row) =>
      new SMUFL.Row(
        score.masterbars.filter((masterbar) =>
          row.masterbars.some((rmb) => rmb.id === masterbar.id)
        )
      )
  );

  for (const masterbar of score.masterbars) {
    for (const bar of masterbar.bars) {
      bar.masterbar = masterbar;
      for (const stave of bar.staves) {
        stave.bar = bar;
      }
    }
  }
  for (const row of score.rows) {
    for (const masterbar of row.masterbars) {
      masterbar.row = row;
    }
  }
  if (process.env.NODE_ENV === "development") console.log({ smufl: score });
  return score;
};
