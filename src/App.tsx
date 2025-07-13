import { ChangeEvent, useEffect, useRef, useState } from "react";
import Soundfont2 from "soundfont2";
import * as Browser from "./models/browser";
import * as Sheet from "./models/sheet";
import * as Audio from "./models/browser/audio/controller";
import * as R from "remeda";

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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (!soundfont2) return;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file) return;
      const importer = new Browser.Importer();
      const core = await importer.import(file);
      const ctx = new AudioContext();
      const sheetController = new Sheet.Controller(
        core!.toSMUFL(),
        Sheet.LayoutType.Horizontal
      );
      setSheetController(sheetController);

      setAudioPlayer(new Audio.Controller(core!.toAudio(ctx), soundfont2, ctx));
      // ** コピペ
      console.log(sheetController);
      sheetController.layout(
        sheetController.layoutType,
        ref.current?.clientWidth ?? 0
      );
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
      sheetController.score.rows.forEach((row) => row.order());
      sheetController.score.width =
        (R.firstBy(sheetController.score.rows, [R.prop("width"), "desc"])
          ?.width ?? 0) * 10; // svg側でscale 10しているので調整

      if (ref.current) {
        while (ref.current.firstChild)
          ref.current.removeChild(ref.current.firstChild);
        const svg = sheetController.score.toSVG({ ratio: 4, scale: 10 });
        if (svg) ref.current.appendChild(svg);
      }
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
        layout
        <select
          onChange={(e) => {
            if (sheetController) {
              sheetController.layout(
                Number(e.target.value) as Sheet.LayoutType,
                ref.current?.clientWidth ?? 0
              );
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
              sheetController.score.rows.forEach((row) => row.order());
              sheetController.score.width =
                (R.firstBy(sheetController.score.rows, [
                  R.prop("width"),
                  "desc",
                ])?.width ?? 0) * 10; // svg側でscale 10しているので調整
              console.log(sheetController.score);

              const svgElement = sheetController.score.toSVG({
                ratio: 4,
                scale: 10,
              });

              while (ref.current?.firstChild)
                ref.current.removeChild(ref.current.firstChild);
              if (svgElement) ref.current?.appendChild(svgElement);
            }
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
