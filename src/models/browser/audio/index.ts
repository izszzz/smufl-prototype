export * from "./track";
export * from "./score";
export * from "./note";

export const calcPlaybackRate = (pitch: number, detune: number) =>
  Math.pow(Math.pow(2, 1 / 12), pitch - detune);
//   1.0 * Math.pow(2, (100.0 * (pitch - detune)) / 1200.0);

export const calcTune = ({ coarseTune, fineTune }) =>
  (coarseTune + fineTune) / 100;
export const calcScale = ({ scaleTuning }) => scaleTuning / 100;
export const calcCorrection = ({ correction }) => correction / 100;
export const calcKey = (overridingRootKey, originalKey) =>
  overridingRootKey === -1 //-1 is overridingRootKey default value
    ? originalKey
    : overridingRootKey;
