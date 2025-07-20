import * as Sheet from "sheet";
import * as SMUFL from "smufl";
import * as R from "remeda";
import { Group } from "./group";
import { Glyph } from "./glyph";

export class Stave extends Sheet.Stave {
  group!: Group;
  declare score: SMUFL.Score;
  get bar() {
    return this.score.bars.find((bar) => bar.id === this.barId)!;
  }
  override get width() {
    return this.group.width;
  }
  override get height() {
    return Glyph.find("barlines", (v) => v.includes("Single")).bBox.height;
  }

  setGroup() {
    // ビックリマーク消せたら消せ
    this.group = createStaveGroup(this)!;
  }
}

function createStaveGroup(stave: Sheet.Stave) {
  const staveGroup = new SMUFL.Group({
    children: [],
  });

  if (stave.bar.masterbar.isRowFirst) {
    const glyph = SMUFL.findClef(stave.clef);
    if (glyph)
      staveGroup.children.push(
        new SMUFL.Text({
          glyph,
          y: (stave.clef.$$.line?.[0]?._ ?? 0) - 1,
        })
      );
  }
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
      glyph: SMUFL.Glyph.find("barlines", (v) => v.includes("Single")),
    })
  );

  return staveGroup;
}
