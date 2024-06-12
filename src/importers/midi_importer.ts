import * as R from "remeda";
import midi from "../consts/midi.json";
import Core from "../models/core";
import { midiParser } from "../parser/midi_parser";
import { Importer } from "./importer";
import { Midi as MidiFile } from "../models/files/midi";

export class MidiImporter implements Importer {
  arrayBuffer;
  constructor(arrayBuffer: ArrayBuffer) {
    this.arrayBuffer = arrayBuffer;
  }
  import() {
    return this.convertScore(this.parseArrayBuffer(this.arrayBuffer));
  }
  parseArrayBuffer(arrayBuffer: ArrayBuffer): Midi {
    return midiParser.parse(new Uint8Array(arrayBuffer));
  }
  convertScore(data: Midi) {
    console.log({ midi: data });
    const { tracks, metaevents } = data.mtrks.reduce(
      (trackAcc, trackCur) => {
        const { notes } = trackCur.events.reduce(
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
                      duration: 0,
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
                      duration: 0,
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
        trackAcc.tracks.push({ notes });

        return trackAcc;
      },
      {
        tracks: [],
        metadata: { timesignatures: [], bpms: [] },
        metaevents: [],
      } as ConstructorParameters<typeof Core.Score>[0]
    );

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
    sharp: number;
    flat: number;
    major: number;
    minor: number;
  };
}
