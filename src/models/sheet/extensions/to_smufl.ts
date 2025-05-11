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
    masterbar.width =
      R.firstBy(masterbar.bars, [R.prop("width"), "desc"])?.width ?? 0;
  }
  return score;
};

function createStaveGroup(stave: Sheet.Stave) {
  const staveGroup = new SMUFL.Group({
    children: [],
  });
  if (stave.clef) {
    staveGroup.children.push(
      new SMUFL.Text({
        glyph: SMUFL.Glyph.find(
          "clefs",
          (v) => v.charAt(0) === stave.clef?.$$.sign[0]._.toLowerCase()
        ),
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
      const noteHeadsGlyph = SMUFL.Glyph.find(
        "noteheads",
        (v) => v.toLocaleLowerCase().includes("black")
        // .includes(type?.[0]?._ === "quarter" ? "black" : type)
        //
      );
      noteGroup.children.push(
        new SMUFL.Text({
          glyph: noteHeadsGlyph,
        })
      );
      if (stem) {
        if (stem[0]?._ === "up") {
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
        if (stem[0]?._ === "down") {
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

  return staveGroup;
}
