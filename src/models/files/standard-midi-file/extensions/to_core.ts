import * as R from "remeda";
import * as Midi from "../";
import * as Core from "core";

export const toCore = (data: Midi.IMidi) => {
  if (process.env.NODE_ENV === "development") console.log({ midi: data });
  const params = data.mtrks.reduce(
    (trackAcc, trackCur) => {
      const { notes, time, name } = trackCur.events.reduce(
        (acc, cur) => {
          acc.time += Midi.calcDuration(cur.deltaTime, data.mthd.resolution);
          if (Midi.isMetaEvent(cur)) {
            if (R.isNonNullish(cur.event.timeSignature))
              trackAcc.timesignatures?.push({
                ...R.omit(cur.event.timeSignature, ["clock", "bb"]),
                start: acc.time,
              });
            if (R.isNonNullish(cur.event.tempo))
              trackAcc.bpms?.push({
                ...{ value: new Midi.Unit.Tempo(cur.event.tempo).toBpm() },
                start: acc.time,
              });
            if (R.isNonNullish(cur.event.keySignature))
              trackAcc.keysignatures?.push({
                tonality: !!cur.event.keySignature.mi,
                accidental: cur.event.keySignature.sf,
                start: acc.time,
              });
            if (R.isNonNullish(cur.event.trackName))
              if (cur.event.trackName) acc.name = cur.event.trackName;
          }
          if (Midi.isNoteOffEvent(cur)) {
            const note = acc.notes.findLast(
              (note) => note.pitch === cur.event.pitch
            );
            if (note) note.end = acc.time;
          } else if (Midi.isNoteOnEvent(cur))
            acc.notes.push({
              pitch: cur.event.pitch,
              start: acc.time,
            });
          return acc;
        },
        { notes: [], time: 0 } as {
          notes: Parameters<typeof Core.create>[0]["tracks"][number]["notes"];
          time: number;
          name?: string;
        }
      );
      if (R.isEmpty(notes)) return trackAcc;
      if ((trackAcc.end ?? 0) < time) trackAcc.end = time;
      trackAcc.tracks.push({ notes, end: trackAcc.end, name });

      return trackAcc;
    },
    {
      tracks: [],
      keysignatures: [],
      timesignatures: [],
      bpms: [],
      name: undefined,
      start: 0,
      end: 0,
    } as Parameters<typeof Core.create>[0]
  );

  if (process.env.NODE_ENV === "development") console.log(params);
  return Core.create(params);
};
