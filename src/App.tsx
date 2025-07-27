import { ChangeEvent, useEffect, useRef, useState } from "react";
import Soundfont2 from "soundfont2";
import * as Browser from "./models/browser";
import * as Sheet from "./models/sheet";
import * as Audio from "./models/browser/audio/controller";

function App() {
  const [sheetController, setSheetController] = useState<Sheet.Controller>();
  const [audioPlayer, setAudioPlayer] = useState<Audio.Controller>();
  const [soundfont2, setSoundfont2] = useState<Soundfont2>();

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    (async () => {
      const buffer = await fetch("/A320U.sf2").then((res) => res.arrayBuffer());
      setSoundfont2(Soundfont2.create(new Uint8Array(buffer)));
    })();
  }, []);
  const layouting = () => {
    if (!sheetController) return;
    sheetController.layout(sheetController.layoutType);
    sheetController.score.rows
      .flatMap((row) =>
        row.masterbars.flatMap((masterbar) =>
          masterbar.bars.flatMap((bar) => bar.staves)
        )
      )
      .map((stave) => {
        stave.setGroup();
        stave.group.order();
      });

    if (ref.current) {
      while (ref.current.firstChild)
        ref.current.removeChild(ref.current.firstChild);
      const svg = sheetController.score.toSVG(500, 500, {
        ratio: 4,
        scale: sheetController.scale,
      });
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
      const ctx = new AudioContext();
      const sheetController = new Sheet.Controller(
        score!.toSMUFL(),
        Sheet.LayoutType.Horizontal
      );
      setSheetController(sheetController);

      setAudioPlayer(
        new Audio.Controller(score!.toAudio(ctx), soundfont2, ctx)
      );
      layouting();
    }
  };

  return (
    <div>
      <h3>{sheetController?.score.name}</h3>
      <div
        ref={ref}
        className="bravura"
        style={{ height: "70vh", overflow: "auto" }}
      />
      <button
        type="button"
        onClick={() => {
          audioPlayer?.play();
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
          defaultValue={30}
          onChange={(e) => {
            if (sheetController) sheetController.scale = Number(e.target.value);
            layouting();
          }}
        />
      </label>

      <label>
        layout
        <select
          onChange={(e) => {
            if (sheetController)
              sheetController.layoutType = Number(e.target.value);
            layouting();
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
