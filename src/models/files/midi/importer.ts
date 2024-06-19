import * as R from "remeda";
import midi from "../../../consts/midi.json";
import Core from "../../core";
import { Midi as MidiFile } from ".";

export class Importer {
  arrayBuffer;
  constructor(arrayBuffer: ArrayBuffer) {
    this.arrayBuffer = arrayBuffer;
  }
  import() {
    return this.convertScore(this.parseArrayBuffer(this.arrayBuffer));
  }
  parseArrayBuffer(arrayBuffer: ArrayBuffer): Midi {
    return MidiFile.Parser.parse(new Uint8Array(arrayBuffer));
  }
  convertScore(data: Midi) {
    console.log({ midi: data });
    const { tracks, metaevents, end } = data.mtrks.reduce(
      (trackAcc, trackCur) => {
        const { notes, time } = trackCur.events.reduce(
          (acc, cur) => {
            acc.time += MidiFile.calcDuration(
              cur.deltaTime,
              data.mthd.resolution
            );
            if (this.isMetaEvent(cur)) {
              if (R.isNonNullish(cur.event.timeSignature))
                trackAcc.metaevents.push({
                  name: "Timesignature",
                  params: [
                    {
                      ...R.omit(cur.event.timeSignature, ["clock", "bb"]),
                      start: acc.time,
                    },
                  ],
                });
              if (R.isNonNullish(cur.event.tempo))
                trackAcc.metaevents.push({
                  name: "Bpm",
                  params: [
                    {
                      value: Core.convertTempoToBpm(cur.event.tempo),
                      start: acc.time,
                    },
                  ],
                });
              if (R.isNonNullish(cur.event.keySignature))
                trackAcc.metaevents.push({
                  name: "Keysignature",
                  params: [
                    {
                      tonality: !!cur.event.keySignature.mi,
                      accidental: cur.event.keySignature.sf,
                      start: acc.time,
                    },
                  ],
                });
            }
            if (this.isNoteOnEvent(cur))
              acc.notes.push({
                pitch: cur.event.pitch,
                start: acc.time,
              });
            if (this.isNoteOffEvent(cur)) {
              const note = acc.notes.findLast(
                (note) => note.pitch === cur.event.pitch
              );
              if (note) note.end = acc.time;
            }
            return acc;
          },
          { notes: [], time: 0 } as {
            notes: Omit<ConstructorParameters<typeof Core.Note>[0], "track">[];
            time: number;
          }
        );
        if (R.isEmpty(notes)) return trackAcc;
        if ((trackAcc.end ?? 0) < time) trackAcc.end = time;
        trackAcc.tracks.push({ notes });

        return trackAcc;
      },
      {
        tracks: [],
        metaevents: [],
        end: 0,
      } as ConstructorParameters<typeof Core.Score>[0]
    );

    // TODO: refactor
    // timesignature
    const timesignatures = metaevents.filter(
      (metaevent) => metaevent.name === "Timesignature"
    );
    for (const [i, timesignature] of timesignatures.entries()) {
      const prev = timesignatures[i - 1]?.params[0];
      if (prev) prev.end = timesignature.params[0].start;
    }
    const lastTimesignature = R.last(timesignatures)?.params[0];
    if (lastTimesignature) lastTimesignature.end = end;

    // bpm
    const bpms = metaevents.filter((metaevent) => metaevent.name === "Bpm");
    for (const [i, bpm] of bpms.entries()) {
      const prev = bpms[i - 1]?.params[0];
      if (prev) prev.end = bpm.params[0].start;
    }
    const lastBpm = R.last(bpms)?.params[0];
    if (lastBpm) lastBpm.end = end;

    return new Core.Importer({ tracks, metaevents }).import();
  }

  isMetaEvent(
    event: MidiTrackEvent<MidiEvent | MetaEvent>
  ): event is MidiTrackEvent<MetaEvent> {
    return event.type === midi.mtrk.metaEvent.type;
  }
  isNoteOnEvent(
    event: MidiTrackEvent<MidiEvent | MetaEvent>
  ): event is MidiTrackEvent<MidiEvent> {
    return event.type === midi.mtrk.midiEvents.noteOn.type;
  }
  isNoteOffEvent(
    event: MidiTrackEvent<MidiEvent | MetaEvent>
  ): event is MidiTrackEvent<MidiEvent> {
    return event.type === midi.mtrk.midiEvents.noteOff.type;
  }
}
interface Midi {
  mthd: {
    type: string;
    length: number;
    format: number;
    trackCount: number;
    resolution: number;
  };
  mtrks: {
    type: string;
    events: MidiTrackEvent<MetaEvent | MidiEvent>[];
  }[];
}
interface MidiTrackEvent<Event extends MetaEvent | MidiEvent> {
  channel: number;
  deltaTime: number;
  event: Event;

  type:
    | typeof midi.mtrk.metaEvent.type
    | typeof midi.mtrk.midiEvents.noteOn.type
    | typeof midi.mtrk.midiEvents.noteOff.type;
}
interface MidiEvent {
  pitch: number;
  velocity: number;
}
interface MetaEvent extends Partial<MetaEvents> {
  length: number;
  type: number;
}
interface MetaEvents {
  trackName: string;
  instrumentName: string;
  marker: string;
  deviceName: string;
  endOfTrack: string;
  tempo: number;
  timeSignature: {
    numerator: number;
    denominator: number;
    clock: number;
    bb: number;
  };
  keySignature: {
    sf: number;
    mi: 0 | 1;
  };
}
