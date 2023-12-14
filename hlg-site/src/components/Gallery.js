// Manages the gallery of images on the home page
import React, { useState, useEffect } from "react";
import {ColorFilter} from "./ColorFilter";
import {SubjectFilter} from "./SubjectFilter";

const Gallery = () => {
  const [paintings, setPaintings] = useState([]); // array of paintings
  const [selectedColor, setSelectedColor] = useState(""); // selected color
  const [selectedSubject, setSelectedSubject] = useState(""); // selected subject
  const [error, setError] = useState(null); // error message

  // fetches the paintings from the API
  const fetchPaintings = async () => {
    try {
      const response = await fetch(
        `/api/filter?color=${selectedColor}&subject=${selectedSubject}`
      );
      const data = await response.json();
      setPaintings(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // fetches the paintings when the component mounts
  useEffect(() => {
    fetchPaintings();
  }, [selectedColor, selectedSubject]);

  // renders the gallery
  return (
    <div>
      <div className="filter-container">
        <ColorFilter
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <SubjectFilter
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <div className="gallery">
        {paintings.map((painting) => (
          <img
            key={painting.id}
            src={painting.image_url}
            alt={painting.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
