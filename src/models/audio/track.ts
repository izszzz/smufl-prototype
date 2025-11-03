import * as Core from "core";
import * as Audio from ".";

export class Track extends Core.Track {
  gain = 1;
  onChangeGain?: (gain: number) => void;
  override get notes() {
    return super.notes as Audio.Note[];
  }

  setGain(value: number) {
    this.gain = value;
    this.onChangeGain?.(value);
  }
}
