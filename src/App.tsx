import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MidiImporter } from "./importer/midi_importer";
import * as SMUFL from "./models/smufl";
import { AudioPlayer } from "./player/audio_player";
import SVGRenderer from "./renderer/svg_renderer";

function App() {
	const [fontSize, setFontSize] = useState(0);
	const [layoutType, setLayoutType] =
		useState<SMUFL.Score["type"]>("HorizontalScroll");
	const [svgRenderer, setSVGRenderer] = useState<SVGRenderer>();
	const [audioPlayer, setAudioPlayer] = useState<AudioPlayer>();
	const ref = useRef(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.target;

		if (input.files && input.files.length > 0) {
			const midiFile = input.files[0];

			const reader = new FileReader();
			reader.onload = (e) => {
				const arrayBuffer = e.target?.result as ArrayBuffer;
				const midiImporter = new MidiImporter(arrayBuffer);
				if (ref.current) {
					const svgRenderer = new SVGRenderer(ref.current, midiImporter.score, {
						fontSize,
						layoutType,
					});
					setSVGRenderer(svgRenderer);
					setFontSize(svgRenderer.fontSize);
				}
			};

			reader.readAsArrayBuffer(midiFile);
		}
	};
	useEffect(() => {
		svgRenderer?.changeFontSize(fontSize);
	}, [fontSize, svgRenderer]);
	useEffect(() => {
		const ap = new AudioPlayer();
		ap.init();
		setAudioPlayer(ap);
	}, []);

	return (
		<div>
			<div
				ref={ref}
				className="App bravura"
				style={{ padding: "30px", height: "70vh" }}
			></div>
			<button onClick={() => audioPlayer?.play()}>play</button>
			<input type="file" onChange={handleFileChange} accept=".midi, .mid" />
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
