import React, { useState, useEffect } from "react";
import { Sphere, Html } from "@react-three/drei";
import { useStarContext } from "./StarContext";

export default function Star({ starId }) {
  const { stars } = useStarContext();
  const [starInfo, setStarInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const star = stars.find((s) => s.starId === starId);
    if (star) {
      setStarInfo({
        starId: star.starId,
        date: star.date,
        message: star.message,
        position: star.position,
      });
    }
  }, [stars, starId]);

  if (!starInfo) {
    return null; // or a loading spinner
  }

  return (
    <mesh
      position={starInfo.position}
      onClick={(e) => {
        e.stopPropagation();
        setShowInfo((prev) => !prev);
      }}
    >
      {/* The star's sphere */}
      <Sphere args={[0.4, 16, 16]}>
        <meshStandardMaterial color="yellow" emissive="purple" />
      </Sphere>

      {/* Conditionally render message on click */}
      {showInfo && (
        <Html position={[0, 0.5, 0]} center>
          <div className='starPopup' 
            style={{
              position: 'absolute',
              top: '3%', right: '3%',
              backgroundColor: 'white', borderRadius: '15px',
              position: 'relative', width:'200%', padding: '0px' 
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(false);
              }}
              style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              X
            </button>
            {/* TODO: Add the date of when the star was created */}
            <div className='starInfo' style={{ padding: '40px' }}>
              <p><strong>Star ID:</strong> {starInfo.starId}</p>
              <p><strong>Date:</strong> {starInfo.date}</p>
              <p><strong>Message:</strong> {starInfo.message}</p>
              <p><strong>Coordinates:</strong> [{starInfo.position[0].toFixed(2)}, {starInfo.position[1].toFixed(2)}, {starInfo.position[2].toFixed(2)}]</p>
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
}