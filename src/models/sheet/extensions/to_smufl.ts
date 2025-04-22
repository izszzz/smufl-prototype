import { firstBy, map, pipe, times } from "remeda";
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
    firstBy(this.tracks, [(track) => track.bars.length, "desc"])?.bars.length ??
    0;

  times(maxLengthBarsTrack, (i) => {
    score.masterbars.push(
      new SMUFL.Masterbar({
        id: i,
        bars: times(
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
  const group = new SMUFL.Group({ children: [] });
  group.children.push(
    new SMUFL.Text({
      glyph: SMUFL.Glyph.find("barlines", (v) => v.includes("Single")),
    })
  );
  for (const stave of bar.staves) {
    if (stave.clef)
      group.children.push(
        new SMUFL.Text({
          glyph: SMUFL.Glyph.find(
            "clefs",
            (v) => v.charAt(0) === stave.clef.sign.toLowerCase()
          ),
        })
      );

    if (bar.timesignature) {
      const [numerator, denominator] = pipe(
        [bar.timesignature.numerator, bar.timesignature.denominator] as const,
        map((number) =>
          SMUFL.Glyph.find("timeSignatures", (v) =>
            v.toLocaleLowerCase().includes(number.toString())
          )
        )
      );
      group.children.push(
        new SMUFL.Group({
          children: [
            new SMUFL.Text({ glyph: numerator, y: -3 }),
            new SMUFL.Text({ glyph: denominator, y: -1, index: 1 }),
          ],
        })
      );
    }

    for (const note of bar.notes) {
      const noteGroup = new SMUFL.Group({
        children: [],
        y:
          note.y *
          SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness,
      });

      if (note.legerLine > 0) {
        times(note.legerLine, (i) => {
          noteGroup.children.push(
            new SMUFL.Text({
              index: i + 1,
              glyph: SMUFL.Glyph.find("staves", (v) => v.includes("legerLine")),
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
          if (stem.direction === "up") {
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
            if (stem.direction === "down") {
              noteGroup.children.push(
                new SMUFL.Text({
                  glyph: SMUFL.Glyph.find("stems", (v) => v.includes("stem")),
                })
              );
            }
          }
        }
      }
      group.children.push(noteGroup);
    }
  }
  group.children.push(
    new SMUFL.Text({
      glyph: SMUFL.Glyph.find("barlines", (v) => v.includes("Single")),
    })
  );
  return group;
}
