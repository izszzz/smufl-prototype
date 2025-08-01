import GeneralMidi from "../../../const/general-midi.json";
export class Preset {
  _presetBrand!: never;
  constructor(public value: number) {}
  toName() {
    return GeneralMidi.presets[this.value]!.name;
  }
}
