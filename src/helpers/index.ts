import * as R from "remeda";

export const safeSum = (...num: (number | null | undefined)[]) =>
  R.pipe(num, R.filter(R.isTruthy), R.reduce(R.add, 0));

export interface Identifier {
  id: number;
}
