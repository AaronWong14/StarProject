import React, { useState, useEffect } from "react";
import { Stars } from "@react-three/drei";
import Star from "./Star";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CreateStarPopup from "../popups/CreateStarPopup";
import { starOperations } from "./StarOperations";

export default function StarUniverse() {
  const { stars, createStar } = starOperations();
  const [starData, setStarData] = useState([
    { key: 1, starId:1, position: [2, 1, -2], message: "Hello from OG Star!" },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const addStarToState = (newStar) => {
    console.log(newStar);
    setStarData((prev) => [...prev, newStar]);
  };

  useEffect(() => {
    if (stars) {
      setStarData(stars);
    }
  }, [stars]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas>
        <OrbitControls enableZoom={true} enablePan={true} />
        <ambientLight intensity={0.5} />
        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} />

        {/* Render each star with a message */}
        {starData.map((star) => (
          <Star key={star.starId} starId={star.starId} position={star.position} message={star.message} />
        ))}
      </Canvas>

      <button
        onClick={handleOpenPopup}
        style={{
          position: 'absolute',
          top: '3%',
          right: '3%',
          width: '40px',
          height: '40px',
        }}
      >
        Create Star
      </button>

      {isPopupOpen && (
        <CreateStarPopup onClose={handleClosePopup} onSubmit={(message) => createStar(message, addStarToState)} />
      )}
    </div>
  );
}