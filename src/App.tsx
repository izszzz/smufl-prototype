import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as Soundfont2 from "soundfont2";

import * as Browser from "./models/browser";

import "./models/files/mxl/extensions/sheet";
import "./models/sheet/extensions/to_svg";

function App() {
  const [fontSize, setFontSize] = useState(30);

  const [soundfont2, setSoundfont2] = useState<Soundfont2.Sf2>();

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    (async () => {
      const buffer = await fetch("/A320U.sf2").then((res) => res.arrayBuffer());
      setSoundfont2(new Soundfont2.Sf2(new Uint8Array(buffer)));
    })();
  }, []);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (!soundfont2) return;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file) return;
      const importer = new Browser.Importer();
      await importer.import(file);
      if (ref.current) {
        while (ref.current.firstChild) {
          ref.current.removeChild(ref.current.firstChild);
        }
        ref.current.appendChild(importer.core.toSVG({ ratio: 4 }));

        // setAudioPlayer(new Audio.Player(core, soundfont2));
        // setFontSize(svgRenderer.options.fontSize);
      }
    }
  };

  return (
    <div>
      <div
        ref={ref}
        className="bravura"
        style={{ padding: "30px", height: "70vh" }}
      />
      <button type="button" onClick={() => {}}>
        play
      </button>
      <button type="button" onClick={() => {}}>
        pause
      </button>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".midi, .mid, .json, .mxl"
      />
      <input
        type="range"
        value={0}
        min={0}
        max={100}
        onChange={(e) => {
          // setVolume(Number(e.target.value));
          // if (audioPlayer) audioPlayer.volume.gain.value = volume / 100;
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
      <label>layout</label>
    </div>
  );
}

export default App;
