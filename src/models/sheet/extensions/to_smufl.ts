import {
  entries,
  filter,
  groupByProp,
  isNullish,
  last,
  map,
  pipe,
  piped,
  prop,
} from "remeda";
import * as Sheet from "sheet";
import * as SMUFL from "smufl";

declare module "sheet" {
  interface Score {
    toSMUFL: () => SMUFL.Score;
  }
}

Sheet.Score.prototype.toSMUFL = function (this: Sheet.Score) {
  return SMUFL.Score.create({
    ...this.params,
    tracks: this.tracks.map((track) => ({
      ...track.params,
      notes: [
        ...pipe(
          track.notes,
          map(({ params }) => params),
          groupByProp("chordId"),
          entries(),
          map(piped(last()))
        ),
        ...pipe(
          track.notes,
          filter(piped(prop("chordId"), isNullish)),
          map(prop("params"))
        ),
      ],
    })),
    beams: this.beams.map(({ params }) => params),
    keysignatures: this.keysignatures.map(({ params }) => params),
    timesignatures: this.timesignatures.map(({ params }) => params),
    tempos: this.tempos.map(({ params }) => params),
  });
};
