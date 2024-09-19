import * as R from "remeda";
import * as Core from ".";
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
      R.keys(),
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
  get(event: Core.Event) {
    return R.pipe(
      Metaevents.Map,
      R.keys(),
      R.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: this.data[cur].find(
            ({ start, end }) => start <= event.start && end >= event.end
          ),
        }),
        {} as {
          [P in MetaeventsMapKeys]: InstanceType<(typeof Metaevents.Map)[P]>;
        }
      )
    );
  }
  find(event: Core.Event) {
    return R.pipe(
      Metaevents.Map,
      R.keys(),
      R.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: this.data[cur].find(({ start }) => start === event.start),
        }),
        {} as {
          [P in MetaeventsMapKeys]:
            | InstanceType<(typeof Metaevents.Map)[P]>
            | undefined;
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
