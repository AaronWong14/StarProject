import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export function starOperations() {
  // TODO: maybe move the fetch stars completely to StarUniverse
  // const [stars, setStars] = useState([]);
  // const fetchStars = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/stars");
  //     const data = await res.json();
  //     setStars(data);
  //   } catch (error) {
  //     console.error("Error fetching stars:", error);
  //   }
  // };

  // Create a new star with a message in a random position
  // TODO: rollback if save to database fails (should be caught as an 
  // error, but double check)
  const createStar = async (message, addStarToState) => {
    try {
      console.log(JSON.stringify(message))
      const res = await fetch("http://localhost:5000/api/stars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const createdStar = await res.json();
      createdStar.starId = uuidv4();
      console.log(createdStar)
      addStarToState(createdStar); 
    } catch (error) {
      console.error("Error creating star:", error);
    }
  };

  // useEffect(() => {
  //   fetchStars();
  // }, []);

  return { createStar };
}