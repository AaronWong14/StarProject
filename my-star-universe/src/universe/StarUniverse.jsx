import React, { useState, useEffect } from "react";
import { Stars } from "@react-three/drei";
import Star from "../star/Star";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CreateStarPopup from "../popups/CreateStarPopup";
import { useStarContext } from "../star/StarContext";

export default function StarUniverse() {
  const { stars, addStar, createStar } = useStarContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleReturnToLandingPage = () => {
    const element = document.getElementById("landing-page");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="star-universe">
      <Canvas key={`${windowSize.width}-${windowSize.height}`}>
        <OrbitControls enableZoom={true} enablePan={true} />
        <ambientLight intensity={0.5} />
        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} />

        {/* Render each star with a message */}
        {stars.map((star) => (
          <Star key={star.starId} starId={star.starId} position={star.position} message={star.message} />
        ))}
      </Canvas>

      <button
        onClick={handleReturnToLandingPage}
        style={{
          position: 'absolute',
          top: '3%',
          left: '3%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        Back to Landing Page
      </button>

      <button
        onClick={handleOpenPopup}
        style={{
          position: 'absolute',
          top: '3%',
          right: '3%',
        }}
      >
        Create Star
      </button>

      {isPopupOpen && (
        <CreateStarPopup onClose={handleClosePopup} onSubmit={(message) => createStar(message, addStar)} />
      )}
    </div>
  );
}