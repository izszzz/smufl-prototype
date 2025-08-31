import * as R from "remeda";
import * as Midi from "../";
import * as Core from "core";

export const toCore = (data: Midi.IMidi) => {
  if (process.env.NODE_ENV === "development") console.log({ midi: data });
  const params = data.mtrks.reduce(
    (trackAcc, trackCur) => {
      const { notes, name } = trackCur.events.reduce(
        (acc, cur) => {
          acc.time += Midi.calcDuration(cur.deltaTime, data.mthd.resolution);
          if (Midi.isMetaEvent(cur)) {
            if (R.isNonNullish(cur.event.timeSignature))
              trackAcc.timesignatures?.push({
                ...R.omit(cur.event.timeSignature, ["clock", "bb"]),
                start: acc.time,
              });
            if (R.isNonNullish(cur.event.tempo))
              trackAcc.tempos?.push({
                value: new Midi.Unit.MidiTempo(cur.event.tempo).toTempo().value,
                start: acc.time,
              });
            if (R.isNonNullish(cur.event.keySignature))
              trackAcc.keysignatures?.push({
                tonality:
                  cur.event.keySignature.mi === 0
                    ? Core.Tonality.Major
                    : Core.Tonality.Minor,
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
          notes: Parameters<
            typeof Core.Score.create
          >[0]["tracks"][number]["notes"];
          time: number;
          name?: string;
        }
      );
      if (R.isEmpty(notes)) return trackAcc;
      trackAcc.tracks.push({ notes, name });

      return trackAcc;
    },
    {
      tracks: [],
      keysignatures: [],
      timesignatures: [],
      tempos: [],
      name: undefined,
    } as Parameters<typeof Core.Score.create>[0]
  );

  return Core.Score.create(params);
};
