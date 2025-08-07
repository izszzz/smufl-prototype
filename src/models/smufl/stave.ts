import * as Sheet from "sheet";
import * as SMUFL from "smufl";
import * as R from "remeda";

export class Stave extends Sheet.Stave {
  group!: SMUFL.Group;
  declare score: SMUFL.Score;
  override get bar() {
    return super.bar as SMUFL.Bar;
  }
  override get notes() {
    return super.notes as SMUFL.Note[];
  }
  override get width() {
    return this.group.width;
  }
  override get height() {
    return SMUFL.Glyph.findBarline({
      $$: { ["bar-style"]: [{ _: "light-heavy" }] },
    }).bBox.height;
  }

  setGroup() {
    this.group = createStaveGroup(this);
  }
}

function createStaveGroup(stave: Sheet.Stave) {
  const staveGroup = new SMUFL.Group({
    children: [],
  });

  if (stave.bar.masterbar.isRowFirst)
    staveGroup.children.push(
      new SMUFL.Text({
        glyph: SMUFL.Glyph.findClef(stave.clef),
        y: (stave.clef.$$.line?.[0]?._ ?? 0) - 1,
      })
    );
  if (stave.bar.masterbar.isFirst) {
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
          ...stave.bar.keysignature.accidentalPitchClasses.map(
            (pitch) =>
              new SMUFL.Text({
                glyph: SMUFL.Glyph.find("standardAccidentals12Edo", (v) =>
                  v
                    .toLowerCase()
                    .includes(
                      stave.bar.keysignature.tonality ? "flat" : "sharp"
                    )
                ),
              })
          ),
        ],
      }),
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
        SMUFL.BravuraMetadata.engravingDefaults.thickBarlineThickness,
    });

    if (note.legerLine > 0)
      R.times(note.legerLine, (i) => {
        noteGroup.children.push(
          new SMUFL.Text({
            index: i + 1,
            glyph: SMUFL.Glyph.find("staves", (v) => v === "legerLine"),
          })
        );
      });

    if (R.isDefined(note.rest)) {
      noteGroup.children.push(
        new SMUFL.Text({ glyph: SMUFL.Glyph.findRest(note.rest, note.type) })
      );
    } else {
      if (note.type) {
        const stem = note.stem;
        const noteHeadsGlyph = SMUFL.Glyph.findNotehead(note.type);
        noteGroup.children.push(new SMUFL.Text({ glyph: noteHeadsGlyph }));

        if (stem) {
          const stemText = new SMUFL.Text({
            glyph: SMUFL.Glyph.find("stems", (v) => v.includes("stem")),
          });
          if (stem._ === "down") {
            stemText.dx -= noteHeadsGlyph.bBox.width;
            stemText.rotate = 180;
          }
          noteGroup.children.push(stemText);
        }
      }
    }
    staveGroup.children.push(noteGroup);
  }

  staveGroup.children.push(
    new SMUFL.Text({
      glyph: SMUFL.Glyph.findBarline(
        stave.bar.masterbar.isLast
          ? {
              $$: { ["bar-style"]: [{ _: "light-heavy" }] },
            }
          : stave.barline
            ? stave.barline
            : {
                $$: { ["bar-style"]: [{ _: "regular" }] },
              }
      ),
    })
  );

  return staveGroup;
}
