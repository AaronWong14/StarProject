import React, { useState } from "react";
import { Stars } from "@react-three/drei";
import Star from "./Star";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CreateStarPopup from "../popups/CreateStarPopup";
import { useStarContext } from "./StarContext";

export default function StarUniverse() {
  const { stars, addStar, createStar } = useStarContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="star-universe">
      <Canvas style={{ background: 'black' }}>
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
        <CreateStarPopup onClose={handleClosePopup} onSubmit={(message) => createStar(message, addStar)} />
      )}
    </div>
  );
}