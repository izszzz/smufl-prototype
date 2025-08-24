import * as Sheet from "sheet";
import * as Core from "core";
import { match } from "ts-pattern";

declare module "core" {
  interface Score {
    toSheet: () => Sheet.Score;
  }
}

Core.Score.prototype.toSheet = function (this: Core.Score) {
  const params = {
    ...this,
    tracks: this.tracks.map((track) => ({
      ...track,
      preset: track.preset.value,
      notes: track.notes.map((note) => ({
        ...note,
        pitch: note.pitch.value,
        stem: { _: "up" as const },
        rest: undefined,
        chord: false,
        staff: undefined,
        voice: undefined,
        staveId: match(track.preset.toName())
          .with("Acoustic Grand Piano", () =>
            note.pitch.value < Core.Unit.MidiNoteNumber.MIDDLE_C ? 1 : 0
          )
          .otherwise(() => 0),
      })),
    })),
    bpms: this.bpms.map((bpm) => ({ ...bpm, value: bpm.value.value })),
  };
  return Sheet.Score.create(params);
};
