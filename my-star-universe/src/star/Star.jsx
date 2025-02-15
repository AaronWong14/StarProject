import React, { useState } from "react";
import { Sphere, Html } from "@react-three/drei";


// TODO add more properties to the star such as color and emissive
export default function Star({ starId, position, message }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <mesh
      position={position}
      onClick={(e) => {
        e.stopPropagation(); // prevent parent controls from interfering
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
            style={{position: 'absolute',
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
            <div className='starInfo' style={{ padding: '40px' }}>
              <p><strong>Star ID:</strong> {starId}</p>
              <p><strong>Message:</strong> {message}</p>
              <p><strong>Coordinates:</strong> [{position[0].toFixed(2)}, {position[1].toFixed(2)}, {position[2].toFixed(2)}]</p>
            </div>
          </div>
        
        </Html>
      )}
    </mesh>
  );
}