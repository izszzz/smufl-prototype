import React, { useEffect, useRef, useState } from 'react';
import SVGRenderer from './models/renderer/svg_renderer';
//@ts-ignore
import { MIDIImporter } from './models/importer/midi_importer';
import *  as SMUFL from "./models/smufl"

function App() {
  const [fontSize, setFontSize] = useState(0)
  const [layoutType, setLayoutType] = useState<SMUFL.Stave["type"]>("HorizontalScroll")
  const ref = useRef(null);
  useEffect(()=>{
    (async()=>{
      const score = await MIDIImporter()
      if(ref.current)  {
        const svgRenderer = new SVGRenderer(ref.current, score, { fontSize, layoutType });
        setFontSize(svgRenderer.fontSize)
      }
    })()
  }, [layoutType, fontSize, ref]);
  return (
    <div>
      <div ref={ref} className="App bravura" style={{padding: "30px", height:"70vh"}}>
      </div>
      <label>
        fontSize
        <input type="number" value={fontSize} onChange={(e)=>setFontSize(Number(e.target.value))}/>
      </label>
      <label>
        layout
        <select value={layoutType} onChange={(e)=> setLayoutType(e.target.value as typeof layoutType)}>
          <option value="Page">Page</option>
          <option value="VerticalScroll">VerticalScroll</option>
          <option value="HorizontalScroll">HorizontalScroll</option>
        </select>
      </label>
    </div>
  );
}

export default App;
