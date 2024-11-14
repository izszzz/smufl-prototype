import * as R from "remeda";
import * as Core from "../../core";
import * as SMUFL from "../";
declare module "../../core" {
  interface Score {
    toSMUFL: () => SMUFL.Score;
  }
}
// TODO: chord rest part
Core.Score.prototype.toSMUFL = function (this: Core.Score) {
  const smufl = new SMUFL.Score({
    ...this,
    timesignatures: this.timesignatures.map(
      (timesignature) => new SMUFL.Timesignature(timesignature)
    ),
    keysignatures: this.keysignatures.map(
      (keysignature) => new SMUFL.Keysignature(keysignature)
    ),
    bpms: this.bpms.map((bpm) => new SMUFL.Bpm(bpm)),
    tracks: this.tracks.map(
      (track) =>
        new SMUFL.Track({
          ...track,
          notes: track.notes.map((note) => new SMUFL.Note(note)),
        })
    ),
  });
  smufl.notes = smufl.tracks.flatMap((track) => track.notes);
  for (const track of smufl.tracks)
    for (const note of track.notes) note.track = track;

  let start = 0;
  let end = 0;
  for (const timesignature of smufl.timesignatures) {
    R.times(
      Math.max(Math.ceil(timesignature.duration / timesignature.numerator), 1),
      (id) => {
        // TODO: refactor
        end += timesignature.numerator;
        const notes = smufl.notes.filter((e) => e.end > start && e.start < end);
        // notesにendがはみ出ているものがある場合Elementを分割して、core.elementsにpushする
        const tieNotes = notes.filter((e) => end < e.end);
        for (const tieNote of tieNotes) {
          const cloneTieNote = new Core.Note(tieNote);
          cloneTieNote.start = end;
          cloneTieNote.duration = cloneTieNote.end - cloneTieNote.start;
          tieNote.end = end;
          tieNote.duration = tieNote.end - tieNote.start;
          for (const track of this.tracks) track.notes.push(cloneTieNote);
        }
        const resultNotes = smufl.notes.filter(
          (e) => start <= e.start && e.end <= end
        );
        if (!R.isEmpty(smufl.tracks)) {
          const masterbar = new SMUFL.MasterBar({
            id,
            notes: resultNotes,
            score: smufl,
            bars: smufl.tracks.map((track, id) => {
              const bar = new SMUFL.Bar({
                id,
                track,
                notes: smufl.notes.filter((note) => note.track.id === track.id),
                start,
                end,
                duration: end - start,
              });
              track.bars.push(bar);
              return bar;
            }),
            start,
            end,
            duration: end - start,
          });
          smufl.masterbars.push(masterbar);
        }
        start = end;
      }
    );
    for (const masterbar of smufl.masterbars) {
      for (const bar of masterbar.bars) {
        bar.masterbar = masterbar;
        for (const note of bar.notes) {
          note.bar = bar;
          note.stem = note.isStem ? new SMUFL.Stem({ note }) : null;
          note.flag = note.isFlag ? new SMUFL.Flag({ note }) : null;
        }
      }
    }
    // TODO: ペアトラックの判定を入れる
    for (const track of smufl.tracks) {
      smufl.parts.push(new SMUFL.Part({ tracks: [track] }));
    }
  }

  console.log(smufl);
  return smufl;
};
