import React from "react";
import { StarProvider } from "./star/StarContext";
import StarUniverse from "./star/StarUniverse";
import './css/App.css'; // Ensure you import the CSS file

// TODO: Fix the CSS file layout
function App() {
  return (
    <div className="canvas-container">
      <StarProvider>
        <StarUniverse />
      </StarProvider>
    </div>
  );
}

export default App;
