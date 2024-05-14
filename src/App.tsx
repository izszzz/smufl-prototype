import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MidiImporter } from "./importers/midi_importer";
import { Soundfont2 } from "./models/files/soundfont2";
import * as SMUFL from "./models/smufl";
import { AudioPlayer } from "./player/audio_player";
import SVGRenderer from "./renderer/svg_renderer";

function App() {
  const [fontSize, setFontSize] = useState(0);
  const [layoutType, setLayoutType] =
    useState<SMUFL.Score["type"]>("HorizontalScroll");
  const [volume, setVolume] = useState<number>(50);
  const [svgRenderer, setSVGRenderer] = useState<SVGRenderer>();
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayer>();
  const [soundfont2, setSoundfont2] = useState<Soundfont2>();

  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      const buffer = await fetch("/A320U.sf2").then((res) => res.arrayBuffer());
      setSoundfont2(new Soundfont2(new Uint8Array(buffer)));
    })();
  }, []);
  useEffect(() => {
    svgRenderer?.changeFontSize(fontSize);
  }, [fontSize, svgRenderer]);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (!soundfont2) return;
    if (input.files && input.files.length > 0) {
      const midiFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const score = new MidiImporter(arrayBuffer, {
          generate: { rest: true, bar: true },
        }).import();
        if (ref.current) {
          const svgRenderer = new SVGRenderer(ref.current, score, {
            fontSize,
            layoutType,
          });
          setSVGRenderer(svgRenderer);
          setAudioPlayer(new AudioPlayer(score, soundfont2));
          setFontSize(svgRenderer.fontSize);
        }
      };

      reader.readAsArrayBuffer(midiFile);
    }
  };

  return (
    <div>
      <div
        ref={ref}
        className="App bravura"
        style={{ padding: "30px", height: "70vh" }}
      />
      <button
        type="button"
        onClick={() => {
          audioPlayer?.play();
        }}
      >
        play
      </button>
      <button
        type="button"
        onClick={() => {
          audioPlayer?.pause();
        }}
      >
        pause
      </button>
      <input type="file" onChange={handleFileChange} accept=".midi, .mid" />
      <input
        type="range"
        value={volume}
        min={0}
        max={100}
        onChange={(e) => {
          setVolume(Number(e.target.value));
          if (audioPlayer) audioPlayer.volumeNode.gain.value = volume / 100;
        }}
      />
      <label>
        fontSize
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </label>
      <label>
        layout
        <select
          value={layoutType}
          onChange={(e) => setLayoutType(e.target.value as typeof layoutType)}
        >
          <option value="Page">Page</option>
          <option value="VerticalScroll">VerticalScroll</option>
          <option value="HorizontalScroll">HorizontalScroll</option>
        </select>
      </label>
    </div>
  );
}

export default App;
