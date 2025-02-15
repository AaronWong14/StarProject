import React from "react";
import { Link } from "react-scroll";
import downArrow from "../assets/down-arrow.svg"; 
import sparkle from "../assets/sparkle.svg";

function LandingPage({ onEnter }) {
  return (
    <div className="landing-page">
      <h1>a sky of wishes</h1>
      <p>Send a wish into the universe and watch it become a star. 
      Explore a night sky filled with the hopes and dreams of strangers.</p>
      <p>Let's go!</p>
      <Link 
        to="star-universe"
        smooth={true}
        duration={500}
        onClick={onEnter}
        className="arrow-down-link"
      >
        <button className="arrow-down-button">          
          <img src={downArrow} alt="Down Arrow" className="down-arrow" />
        </button>
      </Link>
    </div>
  );
}

export default LandingPage;