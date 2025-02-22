import React from "react";
import { Link } from "react-scroll";

function LandingPage({ onEnter }) {
  return (
    <div className="landing-page">
      <h1>Welcome to Star Universe</h1>
      <Link
        to="star-universe"
        smooth={true}
        duration={500}
        onClick={onEnter}
      >
        <button>Enter</button>
      </Link>
    </div>
  );
}

export default LandingPage;