import { ChangeEvent, useEffect, useRef, useState } from "react";
import Soundfont2 from "soundfont2";
import * as Browser from "./models/browser";
import * as Sheet from "./models/sheet";
import * as Audio from "./models/browser/audio/controller";
const audioContext = new AudioContext();
function App() {
  const [sheetController, setSheetController] = useState<Sheet.Controller>();
  const [audioController, setAudioController] = useState<Audio.Controller>();
  const [soundfont2, setSoundfont2] = useState<Soundfont2>();

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    (async () => {
      const buffer = await fetch("/A320U.sf2").then((res) => res.arrayBuffer());
      setSoundfont2(Soundfont2.create(new Uint8Array(buffer)));
    })();
  }, []);
  const layouting = (sheetController: Sheet.Controller | undefined) => {
    if (!sheetController) return;
    sheetController.layout(sheetController.layoutType);

    if (ref.current) {
      while (ref.current.firstChild)
        ref.current.removeChild(ref.current.firstChild);
      const svg = sheetController.score.toSVG(
        window.innerWidth,
        window.innerHeight,
        {
          ratio: 4,
          scale: sheetController.scale,
        }
      );
      if (svg) ref.current.appendChild(svg);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (!soundfont2) return;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file) return;
      const importer = new Browser.Importer();
      const score = await importer.import(file);
      const sheetController = new Sheet.Controller(
        score!.toSMUFL(),
        Sheet.LayoutType.Horizontal
      );

      window.addEventListener("resize", () => {
        layouting(sheetController);
      });
      setSheetController(sheetController);

      setAudioController(
        new Audio.Controller(
          score!.toAudio().toBrowserAudio(audioContext, soundfont2),
          audioContext
        )
      );
      layouting(sheetController);
    }
  };

  return (
    <div>
      <h3>{sheetController?.score.name}</h3>
      <div ref={ref} className="bravura" style={{ overflow: "auto" }} />
      <button
        type="button"
        onClick={() => {
          audioController?.play();
        }}
      >
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
        scale
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => {
            if (sheetController) sheetController.scale = Number(e.target.value);
            layouting(sheetController);
          }}
        />
      </label>

      <label>
        layout
        <select
          onChange={(e) => {
            if (sheetController)
              sheetController.layoutType = Number(e.target.value);
            layouting(sheetController);
          }}
        >
          <option value={Sheet.LayoutType.Horizontal}>horizontal</option>
          <option value={Sheet.LayoutType.Vertical}>vertical</option>
        </select>
      </label>
    </div>
  );
}

export default App;
