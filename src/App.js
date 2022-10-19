import React, { useState } from "react";
import "./App.css";
import ScienitificCalc from "./ScientificCalc";
import NormalCalc from "./Normalcalc";
import { Switch } from 'evergreen-ui';


const App = () => {
  const [state,setstate] = useState(false);
  return (
    <div>
      <h1 className="Toggler">Ultra Calculator</h1>
      <Switch checked={state} onChange={() => setstate(!state)} />
      
      {!state && <NormalCalc />}
      {state && <ScienitificCalc />}    
    </div>
  );
};

export default App;