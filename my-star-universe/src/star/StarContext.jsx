/*
  This file is the context provider for the Star Universe. It provides the information of all the stars.
*/ 

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const StarContext = createContext();

export const useStarContext = () => useContext(StarContext);

// TODO: add the date of when the star was created
// we dont need to fetch the stars every time (ex: when screen is refreshed)
export const StarProvider = ({ children }) => {
  const [stars, setStars] = useState([]);

  const generateStarRandomPosition = () => {
    return [
      Math.random() * 10 - 5, // X position between -5 and 5
      Math.random() * 10 - 5, // Y position between -5 and 5
      Math.random() * 10 - 5  // Z position between -5 and 5
    ];
  };

  // Fetch stars from the database
  const getStars = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/stars");
      const data = await res.json();
      console.log(data);
      const stars = data.map((star) => ({
        key: star.starId,
        starId: star.starId,
        position: generateStarRandomPosition(),
        message: star.message,
      }));
      return stars; // Return the fetched data in star format
    } catch (error) {
      console.error("Error fetching stars:", error);
      return [];
    }
  }, []);

  // Create a new star and POST to backend
  const createStar = async (message, addStarToState) => {
    const starId = uuidv4();
    const starInfo = JSON.stringify({ message, starId });
    try {
      const res = await fetch("http://localhost:5000/api/stars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: starInfo,
      });
      const createdStar = await res.json();
      createdStar.starId = starId;
      createdStar.position = generateStarRandomPosition();
      addStarToState(createdStar);
      // Cache the new star in the stars state
      setStars((prevStars) => [...prevStars, createdStar]);
    } catch (error) {
      console.error("Error creating star:", error);
    }
  };

  useEffect(() => {
    const fetchStars = async () => {
      console.log(stars.length);
      if (stars.length === 0) {
        const data = await getStars();
        setStars(data);
      }
    };
    fetchStars();
  }, [getStars, stars.length]);

  const addStar = (newStar) => {
    setStars((prev) => [...prev, newStar]);
  };

  return (
    <StarContext.Provider value={{ stars, addStar, createStar }}>
      {children}
    </StarContext.Provider>
  );
};