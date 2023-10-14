import React, { useEffect, useRef } from 'react';
import SVGRenderer from './models/renderer/svg/renderer';
//@ts-ignore
import { MIDIImporter } from './models/importer/midi_importer';

function App() {
  const ref = useRef(null);
  useEffect(()=>{
    (async()=>{
      const score = await MIDIImporter()
      console.log(score)
      if(ref.current){
        const svg_renderer = new SVGRenderer(ref.current, score);
      }
    })()
  }, [ref]);
  return (
    <div ref={ref} className="App bravura" style={{padding: "30px", height:"100vh"}}>
    </div>
  );
}

export default App;
