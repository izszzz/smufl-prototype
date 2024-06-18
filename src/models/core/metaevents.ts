import * as R from "remeda";
import Core from ".";
import { Bpm } from "./bpm";
import { Keysignature } from "./keysignature";
import { Timesignature } from "./timesignature";

// TODO: defaultの値をセットする処理
export class Metaevents<
  T extends keyof typeof Metaevents.Map = keyof typeof Metaevents.Map,
> {
  data;
  constructor(
    events: {
      name: T;
      params: ConstructorParameters<(typeof Metaevents.Map)[T]>;
    }[]
  ) {
    this.data = R.pipe(
      Metaevents.Map,
      R.keys.strict,
      R.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.toLowerCase()]: R.pipe(
            events,
            R.filter((event) => event.name === cur),
            R.map(
              ({ name: className, params }) =>
                new (Metaevents.Map[className] as new (
                  ...args: ConstructorParameters<(typeof Metaevents.Map)[T]>
                ) => InstanceType<(typeof Metaevents.Map)[T]>)(...params)
            )
          ),
        }),
        {} as {
          [P in Lowercase<T>]: InstanceType<
            (typeof Metaevents.Map)[Capitalize<P>]
          >[];
        }
      )
    );
  }
  static Map = {
    Bpm,
    Timesignature,
    Keysignature,
  };
  find(event: InstanceType<typeof Core.Event>) {
    return R.pipe(
      Metaevents.Map,
      R.keys.strict,
      R.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.toLowerCase()]: this.data[
            cur.toLowerCase() as Lowercase<T>
          ].find((metaevent) => metaevent.start === event.start),
        }),
        {} as {
          [P in Lowercase<T>]: InstanceType<
            (typeof Metaevents.Map)[Capitalize<P>]
          >;
        }
      )
    );
  }
}
