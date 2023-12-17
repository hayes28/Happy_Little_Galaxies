import React, { useState } from "react";
import { ColorFilter } from "../components/Colors/ColorFilter";
import { SubjectFilter } from "../components/Subjects/SubjectFilter";
import usePaintings from "../hooks/usePaintings";
import "./FilterStyles.css";

const Gallery = () => {
  const { paintings, loading, error, setFilters } = usePaintings();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleFilterChange = (color, subject) => {
    setSelectedColor(color);
    setSelectedSubject(subject);
    setFilters({ color, subject });
  };

  return (
    <div className="filter-bg">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="filter-header">
        <ColorFilter
          selectedColor={selectedColor}
          setSelectedColor={(color) => handleFilterChange(color, selectedSubject)}
        />
        <SubjectFilter
          selectedSubject={selectedSubject}
          setSelectedSubject={(subject) =>
            handleFilterChange(selectedColor, subject)
          }
        />
      </div>
      <div className="gallery">
        {paintings.map((painting) => (
          <div className="card" key={painting.id}>
          <div className="card-image">
            <img src={painting.painting_url} alt={painting.title} />
          </div>
          <div className="card-content">
            <span className="card-title">{painting.title}</span>
            <p>Colors: {painting.colors.join(", ")}</p>
            <p>Subjects: {painting.subjects.join(", ")}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
