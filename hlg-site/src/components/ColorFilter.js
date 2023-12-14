// UI for selecting a color filter for the galaxy images
import React from "react";
import "./FilterStyles.css";

const ColorFilter = ({ selectedColor, setSelectedColor }) => {
  // list of colors
  const colors = [
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple",
    "Pink",
    "White",
    "Black",
  ];

  // Handle the color filter
  const handleColor = (e) => {
    setSelectedColor(e.target.value);
  };

  // Renders the color filter
  return (
    <div className="color-filter">
      <label htmlFor="color">Color</label>
      <select
        name="color"
        id="color"
        value={selectedColor}
        onChange={handleColor}
      >
        <option value="">All</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  )};

export { ColorFilter };
