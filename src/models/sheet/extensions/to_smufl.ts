import * as R from "remeda";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

declare module "sheet" {
  interface Score {
    toSMUFL: (options: { ratio: number }) => SMUFL.Score;
  }
}

Sheet.Score.prototype.toSMUFL = function (this: Sheet.Score) {
  const score = new SMUFL.Score(this);
  const maxLengthBarsTrack =
    R.firstBy(this.tracks, [(track) => track.bars.length, "desc"])?.bars
      .length ?? 0;

  R.times(maxLengthBarsTrack, (i) => {
    score.masterbars.push(
      new SMUFL.Masterbar({
        id: i,
        bars: R.times(
          this.tracks.length,
          (j) =>
            new SMUFL.Bar({
              group: createBarGroup(this.tracks[j]!.bars[i]!),
              ...this.tracks[j]!.bars[i]!,
            })
        ),
      })
    );
  });

  for (const masterbar of score.masterbars) {
    for (const bar of masterbar.bars) {
      bar.group.order();
    }
  }
  console.log({ smufl: score });
  return score;
};

function createBarGroup(bar: Sheet.Bar) {
  const barGroup = new SMUFL.Group({ children: [] });
  for (const [i, stave] of bar.staves.entries()) {
    const staveGroup = new SMUFL.Group({
      y: (4 + 6.5) * i,
      index: i,
      children: [],
    });
    if (stave.clef)
      staveGroup.children.push(
        new SMUFL.Text({
          glyph: SMUFL.Glyph.find(
            "clefs",
            (v) => v.charAt(0) === stave.clef.sign.toLowerCase()
          ),
          y: -stave.clef.line + 1,
        })
      );

    if (bar.timesignature) {
      const [numerator, denominator] = R.pipe(
        [bar.timesignature.numerator, bar.timesignature.denominator] as const,
        R.map((number) =>
          SMUFL.Glyph.find("timeSignatures", (v) =>
            v.toLocaleLowerCase().includes(number.toString())
          )
        )
      );
      staveGroup.children.push(
        new SMUFL.Group({
          children: [
            new SMUFL.Text({ glyph: numerator, y: -3 }),
            new SMUFL.Text({ glyph: denominator, y: -1, index: 1 }),
          ],
        })
      );
    }

    staveGroup.children.push(
      new SMUFL.Text({
        glyph: SMUFL.Glyph.find("barlines", (v) => v.includes("Single")),
      })
    );
    barGroup.children.push(staveGroup);
  }
  R.pipe(
    bar.notes,
    R.groupBy(R.prop("staff")),
    R.entries(),
    R.forEach(([staff, notes]) => {
      for (const note of notes) {
        const noteGroup = new SMUFL.Group({
          children: [],
          y:
            note.y *
              SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness +
            (4 + 6.5) * (Number(staff) - 1),
          index: Number(staff) - 1,
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
          noteGroup.children.push(
            new SMUFL.Text({
              glyph: SMUFL.Glyph.find("noteheads", (v) =>
                v
                  .toLocaleLowerCase()
                  .includes(type === "quarter" ? "black" : type)
              ),
            })
          );
          const stem = note.stem;
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
              if (stem.direction === "down" || stem === "down") {
                noteGroup.children.push(
                  new SMUFL.Text({
                    glyph: SMUFL.Glyph.find("stems", (v) => v.includes("stem")),
                  })
                );
              }
            }
          }
        }
        barGroup.children.push(noteGroup);
      }
    })
  );

  return barGroup;
}
