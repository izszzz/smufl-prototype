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

  const maxLengthBarsTrack =
    R.firstBy(this.tracks, [(track) => track.bars.length, "desc"])?.bars
      .length ?? 0;

  R.times(maxLengthBarsTrack, (i) => {
    score.masterbars.push(
      new SMUFL.Masterbar({
        id: i,
        bars: R.times(score.tracks.length, (j) => score.tracks[j]!.bars[i]!),
      })
    );
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
    console.log(stave.clef);
    staveGroup.children.push(
      new SMUFL.Text({
        glyph: SMUFL.Glyph.find(
          "clefs",
          (v) => v.charAt(0) === stave.clef.sign.toLowerCase()
        ),
        y: stave.clef.line - 1,
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

    if (note.rest) {
      noteGroup.children.push(
        new SMUFL.Text({
          glyph: SMUFL.Glyph.find("rests", (v) =>
            v
              .toLocaleLowerCase()
              .includes(
                note.rest === "measure"
                  ? "restwhole"
                  : note.rest
                    ? note.type ?? ""
                    : ""
              )
          ),
        })
      );
    } else {
      const type = note.type;
      const stem = note.stem;
      const noteHeadsGlyph = SMUFL.Glyph.find("noteheads", (v) =>
        v.toLocaleLowerCase().includes(type === "quarter" ? "black" : type)
      );
      noteGroup.children.push(
        new SMUFL.Text({
          glyph: noteHeadsGlyph,
        })
      );
      if (stem) {
        if (stem.direction === "up" || stem === "up") {
          noteGroup.children.push(
            new SMUFL.Text({
              glyph: SMUFL.Glyph.find("stems", (v) => v.includes("stem")),
            })
          );

          const flag = note.flag;
          if (flag) {
            noteGroup.children.push(
              new SMUFL.Text({
                glyph: SMUFL.Glyph.find("flags", (v) => v.includes("stem")),
              })
            );
          }
        }
        if (stem.direction === "down" || stem === "down") {
          noteGroup.children.push(
            new SMUFL.Text({
              glyph: SMUFL.Glyph.find("stems", (v) => v.includes("stem")),
              rotate: 180,
            })
          );
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
  console.log(SMUFL.Glyph.find("barlines", (v) => v.includes("Single")));

  return staveGroup;
}
