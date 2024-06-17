import Core from ".";
import { Bpm } from "./bpm";
import { Keysignature } from "./keysignature";
import { Timesignature } from "./timesignature";

// TODO: defaultの値をセットする処理
export class Metaevents<
  T extends keyof typeof Metaevents.Map = keyof typeof Metaevents.Map,
> {
  constructor(
    events: {
      name: T;
      params: ConstructorParameters<(typeof Metaevents.Map)[T]>;
    }[]
  ) {
    const set = new Set<keyof typeof Metaevents.Map>();
    for (const { name } of events) set.add(name);
    for (const name of set) {
      // FIXME:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this[name.toLowerCase()] = events
        .filter((event) => event.name === name)
        .map(
          ({ name: className, params }) =>
            new (Metaevents.Map[className] as new (
              ...args: ConstructorParameters<(typeof Metaevents.Map)[T]>
            ) => InstanceType<(typeof Metaevents.Map)[T]>)(...params)
        );
    }
  }
  static Map = {
    Bpm,
    Timesignature,
    Keysignature,
  };
  find(event: InstanceType<typeof Core.Event>) {
    return (
      Object.keys(Metaevents.Map)
        // FIXME:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .flatMap((className) => this[className.toLowerCase()])
        .filter((metaevent) => metaevent.start === event.start)
    );
  }
}
