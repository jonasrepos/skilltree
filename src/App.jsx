import { useState } from "react";
import "./App.css";
import PolygonGrid from "./components/polygonGrid/polygonGrid";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PolygonGrid></PolygonGrid>
    </>
  );
}

export default App;
