import * as R from "remeda";
import Core from "../../core";
import { Identifier } from "../../../helpers";

export class Bar extends Core.Event implements Identifier {
  id: number;
  track;
  metadata?;
  sequence;
  elements: InstanceType<typeof Core.Element>[];
  constructor({
    track,
    elements,
    metadata,
    ...event
  }: {
    track: InstanceType<typeof Core.Track>;
    elements: InstanceType<typeof Core.Element>[];
    metadata?: ConstructorParameters<typeof Core.Metadata>[0];
  } & ConstructorParameters<typeof Core.Event>[0]) {
    super(event);
    this.id = (R.firstBy(track.bars, [R.prop("id"), "desc"])?.id ?? 0) + 1;
    this.track = track;
    this.elements = elements;
    this.sequence = new Core.Sequence({ elements, ...event, bar: this });
    if (metadata) this.metadata = new Core.Metadata(metadata);
  }
  getMetadata() {
    return this.metadata ?? this.track.getMetadata();
  }
}
