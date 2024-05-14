import * as R from "remeda";
import midi from "../consts/midi.json";
import * as Core from "../models/core";
import { midiParser } from "../parser/midi_parser";
import { Importer } from "./importer";
import { CoreImporter } from "./core_importer";

interface Options {
  generate: {
    rest: boolean;
    bar: boolean;
  };
}
export class MidiImporter implements Importer {
  arrayBuffer;
  options;
  constructor(
    arrayBuffer: ArrayBuffer,
    options: Options = { generate: { rest: false, bar: false } }
  ) {
    this.arrayBuffer = arrayBuffer;
    this.options = options;
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
      tracks: ReturnType<typeof Core.Track.build>[];
      metadata: ReturnType<typeof Core.Metadata.build>;
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

        const midiNotes = trackCur.events.slice(lastMetaEventIndex).reduce<
          {
            pitch: number;
            noteOn: MidiTrackEvent;
            noteOff: MidiTrackEvent | null;
          }[]
        >((acc, cur) => {
          if (this.isNoteOnEvent(cur)) {
            acc.push({
              pitch: (cur.event as MidiEvent).pitch,
              noteOn: cur,
              noteOff: null,
            });
          }
          if (this.isNoteOffEvent(cur)) {
            const note = acc
              .flat()
              .find(
                (note) =>
                  note.pitch === (cur.event as MidiEvent).pitch &&
                  R.isNullish(note.noteOff)
              );
            if (note) note.noteOff = cur;
          }
          return acc;
        }, []);

        const { elements } = midiNotes.reduce<{
          time: number;
          elements: ReturnType<typeof Core.Note.build>[];
        }>(
          (acc, cur) => {
            const start = this.calcDuration(
              cur.noteOn.deltaTime ?? 0,
              data.mthd.resolution
            );
            const duration = this.calcDuration(
              cur.noteOff?.deltaTime ?? 0,
              data.mthd.resolution
            );

            acc.time += start;
            acc.elements.push(
              Core.Note.build({
                pitch: (cur.noteOn.event as MidiEvent).pitch,
                time: {
                  start: acc.time,
                  duration,
                },
              })
            );
            acc.time += duration;
            return acc;
          },
          { time: 0, elements: [] }
        );
        if (R.isEmpty(elements)) return trackAcc;
        trackAcc.tracks.push({ elements });

        return trackAcc;
      },
      {
        tracks: [],
        metadata: { timeSignature: undefined, bpm: undefined },
      }
    );
    return new CoreImporter({ tracks, metadata }, this.options).import();
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
