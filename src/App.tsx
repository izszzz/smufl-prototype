import React, { ChangeEvent, useRef, useState } from "react";
import { midi_importer } from "./models/importer/midi_importer";
import SVGRenderer from "./models/renderer/svg_renderer";
import * as SMUFL from "./models/smufl";

function App() {
	const [fontSize, setFontSize] = useState(0);
	const [layoutType, setLayoutType] =
		useState<SMUFL.Score["type"]>("HorizontalScroll");
	const ref = useRef(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.target;

		if (input.files && input.files.length > 0) {
			const midiFile = input.files[0];

			const reader = new FileReader();
			reader.onload = (e) => {
				const arrayBuffer = e.target?.result as ArrayBuffer;
				const midiImporter = new midi_importer(arrayBuffer);
				if (ref.current) {
					const svgRenderer = new SVGRenderer(ref.current, midiImporter.score, {
						fontSize,
						layoutType,
					});
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
			></div>
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
