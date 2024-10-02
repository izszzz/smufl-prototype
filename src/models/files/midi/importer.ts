import * as R from "remeda";
import * as Core from "../../core";
import * as Unit2X from "../../unit2x";
import { Midi as MidiFile } from ".";
import Metadata from "./metadata.json";
import { SetOptional } from "type-fest";

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
        const { notes, time, name } = trackCur.events.reduce(
          (acc, cur) => {
            acc.time += MidiFile.calcDuration(
              cur.deltaTime,
              data.mthd.resolution
            );
            if (this.isMetaEvent(cur)) {
              if (R.isNonNullish(cur.event.timeSignature))
                trackAcc.metaevents?.push({
                  name: "Timesignature",
                  params: [
                    {
                      ...R.omit(cur.event.timeSignature, ["clock", "bb"]),
                      start: acc.time,
                    },
                  ],
                });
              if (R.isNonNullish(cur.event.tempo))
                trackAcc.metaevents?.push({
                  name: "Bpm",
                  params: [
                    {
                      ...{ value: new Unit2X.Tempo(cur.event.tempo).bpm },
                      start: acc.time,
                    },
                  ],
                });
              if (R.isNonNullish(cur.event.keySignature))
                trackAcc.metaevents?.push({
                  name: "Keysignature",
                  params: [
                    {
                      ...{
                        tonality: !!cur.event.keySignature.mi,
                        accidental: cur.event.keySignature.sf,
                      },
                      start: acc.time,
                    },
                  ],
                });
              if (R.isNonNullish(cur.event.trackName))
                acc.name = cur.event.trackName;
            }
            if (this.isNoteOffEvent(cur)) {
              const note = acc.notes.findLast(
                (note) => note.pitch === cur.event.pitch
              );
              if (note) note.end = acc.time;
            }
            if (this.isNoteOnEvent(cur))
              acc.notes.push({ pitch: cur.event.pitch, start: acc.time });
            return acc;
          },
          { notes: [], time: 0 } as {
            notes: SetOptional<
              ConstructorParameters<typeof Core.Track>[0]["notes"][number],
              "duration" | "end" | "start"
            >[];
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
        metaevents: [],
        end: 0,
      } as ConstructorParameters<typeof Core.Importer>[0]
    );

    return new Core.Importer({ tracks, metaevents, start: 0, end }).import();
  }

  isMetaEvent(event: MidiTrackEvent): event is MidiTrackEvent<MetaEvent> {
    return (
      event.statusByte.type === Metadata.mtrk.metaEvent.type &&
      event.statusByte.channel === 15
    );
  }
  isNoteOnEvent(event: MidiTrackEvent): event is MidiTrackEvent<MidiEvent> {
    return event.statusByte.type === Metadata.mtrk.midiEvents.noteOn.type;
  }
  isNoteOffEvent(event: MidiTrackEvent): event is MidiTrackEvent<MidiEvent> {
    return (
      event.statusByte.type === Metadata.mtrk.midiEvents.noteOff.type ||
      (this.isNoteOnEvent(event) && event.event.velocity === 0)
    );
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
interface MidiTrackEvent<
  Event extends MetaEvent | MidiEvent = MetaEvent | MidiEvent,
> {
  statusByte: {
    type:
      | typeof Metadata.mtrk.metaEvent.type
      | typeof Metadata.mtrk.midiEvents.noteOn.type
      | typeof Metadata.mtrk.midiEvents.noteOff.type;
    channel: number;
  };
  deltaTime: number;
  event: Event;
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
