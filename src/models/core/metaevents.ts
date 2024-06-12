import Core from ".";
import { Bpm } from "./bpm";
import { Timesignature } from "./timesignature";

// TODO: defaultの値をセットする処理
export class Metaevents<T extends keyof typeof Metaevents.Map> {
  events;
  constructor(
    events: {
      name: T;
      params: ConstructorParameters<(typeof Metaevents.Map)[T]>;
    }[]
  ) {
    this.events = events.map(
      ({ name: className, params }) =>
        new (Metaevents.Map[className] as new (
          ...args: ConstructorParameters<(typeof Metaevents.Map)[T]>
        ) => InstanceType<(typeof Metaevents.Map)[T]>)(...params)
    );
  }
  static Map = {
    Bpm,
    Timesignature,
  };
  find(event: InstanceType<typeof Core.Event>) {
    return this.events.filter((metaevent) => metaevent.start === event.start);
  }
}
