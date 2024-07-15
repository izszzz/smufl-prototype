import * as R from "remeda";
import Core from ".";
import { PartiallyPartial } from "../../helpers/type/partiallypartial";
import { LiteralToPrimitiveDeep, PartialDeep } from "type-fest";

interface Params
  extends PartiallyPartial<
    Omit<ConstructorParameters<typeof Core.Score>[0], "tracks" | "metaevents">,
    "start" | "duration" | "end"
  > {
  tracks: (PartiallyPartial<
    Omit<ConstructorParameters<typeof Core.Track>[0], "score" | "id" | "notes">,
    "preset" | "start" | "duration" | "end"
  > & {
    notes: PartiallyPartial<
      ConstructorParameters<typeof Core.Track>[0]["notes"][number],
      "duration" | "end" | "start"
    >[];
  })[];
  metaevents?: {
    name: ConstructorParameters<typeof Core.Metaevents>[0][number]["name"];
    params: [
      PartiallyPartial<
        ConstructorParameters<typeof Core.Metaevents>[0][number]["params"][0],
        "duration" | "end" | "start"
      >,
    ];
  }[];
}
export class Importer {
  params;
  constructor(
    params: Params,
    options: {
      defaultValue: PartialDeep<
        LiteralToPrimitiveDeep<typeof Core.Metadata.defaultValue>
      >;
    } = { defaultValue: {} }
  ) {
    const defaultValue = R.mergeDeep(
      options.defaultValue,
      Core.Metadata.defaultValue
    );
    for (const track of params.tracks) {
      for (const note of track.notes) {
        if (R.isNonNullish(note.end) && R.isNonNullish(note.duration))
          note.start ??= note.end - note.duration;
        if (R.isNonNullish(note.start) && R.isNonNullish(note.duration))
          note.end ??= note.duration + note.start;
        if (R.isNonNullish(note.end) && R.isNonNullish(note.start))
          note.duration ??= note.end - note.start;
      }
      track.preset ??= defaultValue.track.preset;
      track.start ??=
        R.isNonNullish(track.end) && R.isNonNullish(track.duration)
          ? track.end - track.duration
          : params.start ?? 0;
      track.end ??=
        R.isNonNullish(track.start) && R.isNonNullish(track.duration)
          ? track.start + track.duration
          : params.end ??
            R.firstBy(track.notes, [(note) => note.end ?? 0, "desc"])?.end ??
            0;
      track.duration ??= track.end - track.start;
    }
    params.start ??= 0;
    params.end ??=
      R.firstBy(params.tracks, [(track) => track.end!, "desc"])?.end ?? 0;
    params.duration ??= params.end - params.start;
    params.metaevents ??= [];
    for (const key in Core.Metaevents.Map) {
      let metaevents = params.metaevents.filter(({ name }) => name === key);
      if (!R.hasAtLeast(metaevents, 1))
        params.metaevents.push({
          name: key,
          params: [
            {
              ...defaultValue.metaevent[
                key as keyof typeof Core.Metaevents.Map
              ],
            },
          ],
        } as NonNullable<Params["metaevents"]>[number]);
      metaevents = params.metaevents.filter(({ name }) => name === key);
      for (const [i, metaevent] of metaevents.entries()) {
        const prev = metaevents[i - 1]?.params[0];
        if (prev) prev.end = metaevent.params[0].start;
        if (i === 0) metaevent.params[0].start ??= params.start;
        if (metaevents.length === i + 1) metaevent.params[0].end ??= params.end;
      }
    }
    for (const metaevent of params.metaevents) {
      if (
        R.isNonNullish(metaevent.params[0]?.end) &&
        R.isNonNullish(metaevent.params[0].duration)
      )
        metaevent.params[0].start ??=
          metaevent.params[0].end - metaevent.params[0].duration;
      if (
        R.isNonNullish(metaevent.params[0]?.start) &&
        R.isNonNullish(metaevent.params[0].duration)
      )
        metaevent.params[0].end ??=
          metaevent.params[0].duration + metaevent.params[0].start;
      if (
        R.isNonNullish(metaevent.params[0]?.end) &&
        R.isNonNullish(metaevent.params[0].start)
      )
        metaevent.params[0].duration ??=
          metaevent.params[0].end - metaevent.params[0].start;
    }
    this.params = params as ConstructorParameters<typeof Core.Score>[0];
  }
  import() {
    return new Core.Score(this.params);
  }
}
