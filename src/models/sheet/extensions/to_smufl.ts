import * as R from "remeda";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

declare module "sheet" {
  interface Score {
    toSMUFL: (options: { ratio: number }) => SMUFL.Score;
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
                      group: createStaveGroup(stave),
                      ...stave,
                    })
                ),
              })
          ),
        })
    ),
  });

  score.masterbars = this.masterbars.map((masterbar, i) => {
    const bars = R.times(score.tracks.length, (j) => score.tracks[j]!.bars[i]!);
    return new SMUFL.Masterbar({
      ...masterbar,
      bars,
    });
  });

  for (const masterbar of score.masterbars) {
    for (const bar of masterbar.bars) {
      for (const stave of bar.staves) {
        stave.group.order();
      }
    }
  }
  return score;
};

function createStaveGroup(stave: Sheet.Stave) {
  const staveGroup = new SMUFL.Group({
    children: [],
  });
  if (stave.clef) {
    const glyph = SMUFL.findClef(stave.clef);
    if (glyph)
      staveGroup.children.push(
        new SMUFL.Text({
          glyph,
          y: (stave.clef.$$.line?.[0]?._ ?? 0) - 1,
        })
      );
  }

  if (stave.bar.timesignature) {
    const [numerator, denominator] = R.pipe(
      [
        stave.bar.timesignature.numerator,
        stave.bar.timesignature.denominator,
      ] as const,
      R.map((number) =>
        SMUFL.Glyph.find("timeSignatures", (v) =>
          v.toLocaleLowerCase().includes(number.toString())
        )
      )
    );
    staveGroup.children.push(
      new SMUFL.Group({
        children: [
          new SMUFL.Text({ glyph: numerator, y: 3 }),
          new SMUFL.Text({ glyph: denominator, y: 1, index: 1 }),
        ],
      })
    );
  }

  for (const note of stave.notes) {
    const noteGroup = new SMUFL.Group({
      children: [],
      y:
        note.line *
        2 *
        SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness,
    });

    if (note.legerLine > 0) {
      R.times(note.legerLine, (i) => {
        noteGroup.children.push(
          new SMUFL.Text({
            index: i + 1,
            glyph: SMUFL.Glyph.find("staves", (v) => v === "legerLine"),
          })
        );
      });
    }

    if (R.isNonNullish(note.rest) && note.type) {
      const glyph = SMUFL.findRest(note.rest, note.type);
      if (glyph) noteGroup.children.push(new SMUFL.Text({ glyph }));
    } else {
      if (!note.type) return;
      const stem = note.stem;
      const noteHeadsGlyph = SMUFL.findNotehead(note.type);
      if (noteHeadsGlyph) {
        noteGroup.children.push(
          new SMUFL.Text({
            glyph: noteHeadsGlyph,
          })
        );

        if (stem) {
          const stemText = new SMUFL.Text({
            glyph: SMUFL.Glyph.find("stems", (v) => v.includes("stem")),
          });
          noteGroup.children.push(stemText);
          if (stem._ === "down") {
            stemText.dx -= noteHeadsGlyph.bBox.width;
            stemText.rotate = 180;
          }
        }
      }
    }
    staveGroup.children.push(noteGroup);
  }

  staveGroup.children.push(
    new SMUFL.Text({
      glyph: SMUFL.Glyph.find("barlines", (v) => v.includes("Single")),
    })
  );

  return staveGroup;
}
