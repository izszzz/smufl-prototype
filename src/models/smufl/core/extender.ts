import * as R from "remeda";
import * as Core from ".";
import * as BaseCore from "../../core";

export class Extender {
  extend(core: BaseCore.Score) {
    console.log({ extendedCore: core });
    //init
    core.masterbars = [];
    for (const track of core.tracks) track.bars = [];

    let start = 0;
    let end = 0;
    for (const timesignature of core.metaevents.data.Timesignature) {
      R.times(
        Math.max(
          Math.ceil(timesignature.duration / timesignature.numerator),
          1
        ),
        () => {
          // TODO: refactor
          end += timesignature.numerator;
          const notes = core.notes.filter(
            (e) => e.end > start && e.start < end
          );
          // notesにendがはみ出ているものがある場合Elementを分割して、core.elementsにpushする
          const tieNotes = notes.filter((e) => end < e.end);
          for (const tieNote of tieNotes) {
            const cloneTieNote = new Core.Note(tieNote);
            cloneTieNote.start = end;
            cloneTieNote.duration = cloneTieNote.end - cloneTieNote.start;
            tieNote.end = end;
            tieNote.duration = tieNote.end - tieNote.start;
            for (const track of core.tracks) track.notes.push(cloneTieNote);
          }
          const resultNotes = core.notes.filter(
            (e) => start <= e.start && e.end <= end
          );
          core.masterbars.push(
            new Core.MasterBar({
              score: core,
              start,
              end,
              duration: end - start,
              elements: resultNotes,
            })
          );
          start = end;
        }
      );
    }

    return core;
  }
}
