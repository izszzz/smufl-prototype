import * as R from "remeda";
import Core from ".";
import { Bpm } from "./bpm";
import { Keysignature } from "./keysignature";
import { Timesignature } from "./timesignature";
type MetaeventsMapKeys = keyof typeof Metaevents.Map;
export class Metaevents {
  data;
  constructor(
    events: {
      name: MetaeventsMapKeys;
      params: ConstructorParameters<(typeof Metaevents.Map)[MetaeventsMapKeys]>;
    }[]
  ) {
    this.data = R.pipe(
      Metaevents.Map,
      R.keys.strict,
      R.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: R.pipe(
            events,
            R.filter(({ name }) => name === cur),
            R.map(
              ({ name, params }) =>
                new (Metaevents.Map[name] as new (
                  ...args: ConstructorParameters<
                    (typeof Metaevents.Map)[MetaeventsMapKeys]
                  >
                ) => InstanceType<(typeof Metaevents.Map)[MetaeventsMapKeys]>)(
                  ...params
                )
            )
          ),
        }),
        {} as {
          [P in MetaeventsMapKeys]: InstanceType<(typeof Metaevents.Map)[P]>[];
        }
      )
    );
  }
  find(event: InstanceType<typeof Core.Event>) {
    return R.pipe(
      Metaevents.Map,
      R.keys.strict,
      R.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: this.data[cur].find(
            (metaevent) => metaevent.start === event.start
          ),
        }),
        {} as {
          [P in MetaeventsMapKeys]: InstanceType<(typeof Metaevents.Map)[P]>;
        }
      )
    );
  }
  static Map = {
    Bpm,
    Timesignature,
    Keysignature,
  };
}
