import React, { useEffect, useRef } from 'react';
import './App.css';
import Score from './models/score';
import SVGRenderer from './models/renderer/svg/renderer';

function App() {
  const ref = useRef(null);
  useEffect(()=>{
    const score = new Score({title: ""});
    if(ref.current){
      const svg_renderer = new SVGRenderer(ref.current, score);
    }
  }, [ref]);
  return (
    <div ref={ref} className="App bravura" style={{padding: "30px"}}>
    </div>
  );
}

export default App;
