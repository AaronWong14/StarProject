import React, { useState, useEffect } from "react";
import { StarProvider } from "./star/StarContext";
import StarUniverse from "./universe/StarUniverse";
import LandingPage from "./landing-page/LandingPage";
import { Element } from "react-scroll";
import './css/App.css'; // Ensure you import the CSS file

// TODO: Fix the CSS file layout
function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleEnterStarUniverse = () => {
    const element = document.getElementById("star-universe");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-container" key={`${windowSize.width}-${windowSize.height}`}>
      <StarProvider>
        <Element name="landing-page" id="landing-page">
          <LandingPage onEnter={handleEnterStarUniverse} />
        </Element>
        <Element name="star-universe" id="star-universe">
          <StarUniverse />
        </Element>
      </StarProvider>
    </div>
  );
}

export default App;