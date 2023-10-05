import React, { useEffect, useRef } from 'react';
import Score from './models/score';
import SVGRenderer from './models/renderer/svg/renderer';
//@ts-ignore
import { Midi } from "@tonejs/midi";

function App() {
  const ref = useRef(null);
  useEffect(()=>{
    (async()=>{
      const midi = await Midi.fromUrl(`${process.env.PUBLIC_URL}/tests/test.mid`)
      const score = new Score({title: "", midi});
      if(ref.current){
        const svg_renderer = new SVGRenderer(ref.current, score);
      }
    })()
  }, [ref]);
  return (
    <div ref={ref} className="App bravura" style={{padding: "30px"}}>
    </div>
  );
}

export default App;
