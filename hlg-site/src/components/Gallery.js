import React, { useState } from "react";
import { SubjectFilter } from "../components/Subjects/SubjectFilter";
import { FilterControls } from "../components/Buttons/FilterButtons";
import usePaintings from "../hooks/usePaintings";
import ColorSwatch from "../components/Colors/ColorSwatch";
import "./FilterStyles.css";

const Gallery = () => {
  const { paintings, loading, error, setFilters } = usePaintings();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSubject, setSelectedSubject] = useState();

  // This function is called when the filter values change
  const handleFilterChange = (newColor, newSubject) => {
    setSelectedColor(newColor);
    console.log("Selected color:", newColor);
    setSelectedSubject(newSubject);
    // Prepare the filters in the format that the backend expects
    const filters = {};
    if (newColor) filters.color = newColor;
    if (newSubject) filters.subject = newSubject;
    setFilters(filters);
  };

  // Called when the "Apply" button is clicked
  const applyFilters = () => {
    console.log(
      "Applying filters with color:",
      selectedColor,
      "subject:",
      selectedSubject
    );
    setFilters({ color: selectedColor, subject: selectedSubject });
  };

  // Called when the "Clear" button is clicked
  const clearFilters = () => {
    setSelectedColor("");
    setSelectedSubject("");
    setFilters({});
  };

  console.log("Paintings to render:", paintings); // Log the paintings state

  const paintingsPerPage = 10; // Number of paintings to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(paintings.length / paintingsPerPage);

  const indexOfLastPainting = currentPage * paintingsPerPage;
  const indexOfFirstPainting = indexOfLastPainting - paintingsPerPage;
  const currentPaintings = paintings.slice(
    indexOfFirstPainting,
    indexOfLastPainting
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
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
          <ColorSwatch
            onColorSelect={(color) =>
              handleFilterChange(color, selectedSubject)
            }
          />
        </div>
        <div className="col s4 center-align">
          <SubjectFilter
            selectedSubject={selectedSubject}
            setSelectedSubject={(subject) =>
              handleFilterChange(selectedColor, subject)
            }
          />
        </div>
        <div className="col s4 center-align">
          <FilterControls onApply={applyFilters} onClear={clearFilters} />
        </div>
      </div>
      <div className="gallery">
        {currentPaintings.map((painting) => (
          <div className="card" key={painting.id}>
            <div className="card-image">
              <img src={painting.painting_url} alt={painting.title} />
            </div>
            <div className="card-content">
              <span className="card-title white-text">{painting.title}</span>
              <p className="white-text">Colors: {painting.colors.join(", ")}</p>
              <p className="white-text">
                Subjects: {painting.subjects.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ul className="pagination center-align">
        <li className={currentPage === 1 ? "disabled" : "waves-effect"}>
          <a href="#!" onClick={() => handlePageClick(currentPage - 1)}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li
            key={i}
            className={i + 1 === currentPage ? "active" : "waves-effect"}
          >
            <a href="#!" onClick={() => handlePageClick(i + 1)}>
              {i + 1}
            </a>
          </li>
        ))}
        <li
          className={currentPage === totalPages ? "disabled" : "waves-effect"}
        >
          <a href="#!" onClick={() => handlePageClick(currentPage + 1)}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Gallery;
