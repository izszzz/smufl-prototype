import * as R from "remeda";
import midi from "../consts/midi.json";
import Core from "../models/core";
import { midiParser } from "../parser/midi_parser";
import { Importer } from "./importer";

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
  isMetaEvent(event: MidiTrackEvent) {
    return event.type === midi.mtrk.metaEvent.type;
  }
  isNoteOnEvent(event: MidiTrackEvent) {
    return event.type === midi.mtrk.midiEvents.noteOn.type;
  }
  isNoteOffEvent(event: MidiTrackEvent) {
    return event.type === midi.mtrk.midiEvents.noteOff.type;
  }
  convertScore(data: Midi) {
    const { tracks, metadata } = data.mtrks.reduce<{
      tracks: Omit<
        ConstructorParameters<typeof Core.Track>[0],
        "score" | "id"
      >[];
      metadata: NonNullable<ConstructorParameters<typeof Core.Metadata>[0]>;
    }>(
      (trackAcc, trackCur) => {
        const lastMetaEventIndex = trackCur.events.findIndex(
          (e) => !this.isMetaEvent(e)
        );
        // score metadata
        const metadata = R.pipe(
          trackCur.events.slice(0, lastMetaEventIndex),
          R.map((x) => x.event),
          R.mergeAll
        ) as Partial<MetaEvents>;
        if (metadata.tempo)
          trackAcc.metadata.bpm = Core.convertTempoToBpm(metadata.tempo);
        if (metadata.timeSignature) {
          trackAcc.metadata.timeSignature = R.omit(metadata.timeSignature, [
            "clock",
            "bb",
          ]);
        }

        const { notes } = trackCur.events.slice(lastMetaEventIndex).reduce(
          (acc, cur) => {
            acc.time += this.calcDuration(cur.deltaTime, data.mthd.resolution);
            if (this.isNoteOnEvent(cur)) {
              acc.notes.push({
                pitch: (cur.event as MidiEvent).pitch,
                start: acc.time,
                duration: 0,
              });
            }
            if (this.isNoteOffEvent(cur)) {
              const note = acc.notes.findLast(
                (note) => note.pitch === (cur.event as MidiEvent).pitch
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
        metadata: { timeSignature: undefined, bpm: undefined },
      }
    );
    return new Core.Importer({ tracks, metadata }).import();
  }
  calcDuration(deltaTime: number, resolution: number) {
    return deltaTime / resolution;
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
    events: MidiTrackEvent[];
  }[];
}
interface MidiTrackEvent {
  channel: number;
  deltaTime: number;
  event: MetaEvent | MidiEvent;

  type:
    | typeof midi.mtrk.metaEvent.type
    | typeof midi.mtrk.midiEvents.noteOn.type
    | typeof midi.mtrk.midiEvents.noteOff.type;
}
interface MidiEvent {
  pitch: number;
  velocity: number;
}
interface MetaEvent {
  data: Partial<MetaEvents>;
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
