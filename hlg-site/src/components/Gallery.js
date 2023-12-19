import React, { useState } from "react";
import { SubjectFilter } from "../components/Subjects/SubjectFilter";
import { FilterControls } from "../components/Buttons/FilterButtons";
import usePaintings from "../hooks/usePaintings";
import ColorSwatch from "../components/Colors/ColorSwatch";
import "./FilterStyles.css";

const Gallery = () => {
  const { paintings, loading, error, setFilters } = usePaintings();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const applyFilters = () => {
    setFilters({ color: selectedColor, subject: selectedSubject });
  }

  const clearFilters = () => {
    setSelectedColor("");
    setSelectedSubject("");
    setFilters({ color: "", subject: "" });
  }

  const handleFilterChange = (color, subject) => {
    setSelectedColor(color);
    setSelectedSubject(subject);
    setFilters({ color: color, subject: subject }); // Use the new color and subject
  };


  return (
    <div className="filter-bg">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
        <div className="row filter-header">
          <div className="col s4">
            <h3 className="white-text center-align">Filter By Color</h3>
          </div>
          <div className="col s4">
            <h3 className="white-text center-align">Filter By Subject</h3>
          </div>
          <div className="col s4">
            <h3 className="white-text center-align">Apply Filters</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s4 center-align">
            <ColorSwatch onColorSelect={(color) => handleFilterChange(color, selectedSubject)} />
          </div>
          <div className="col s4 center-align">
            <SubjectFilter
              selectedSubject={selectedSubject}
              setSelectedSubject={(subject) => handleFilterChange(selectedColor, subject)}
            />
          </div>
          <div className="col s4 center-align">
            <FilterControls onApply={applyFilters} onClear={clearFilters} />
          </div>
        </div>
        <div className="gallery">
          {paintings.map((painting) => (
            <div className="card" key={painting.id}>
              <div className="card-image">
                <img src={painting.painting_url} alt={painting.title} />
              </div>
              <div className="card-content">
                <span className="card-title white-text">{painting.title}</span>
                <p className="white-text">Colors: {painting.colors.join(", ")}</p>
                <p className="white-text">Subjects: {painting.subjects.join(", ")}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Gallery;
