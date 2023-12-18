import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ColorStyles.css";
import M from "materialize-css";

const ColorFilter = ({ selectedColor, setSelectedColor }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/filter/colors");
        setColors(response.data);
      } catch (error) {
        console.error("Failed to fetch colors", error);
      }
    };

    fetchColors();
  }, []);

  // Initialize Materialize CSS select after the component mounts and whenever subjects change
  useEffect(() => {
    // Ensure Materialize is available and subjects/colors are loaded
    if (window.M && colors.length) {
      const select = document.querySelector("colors");
      M.FormSelect.init(select);
    }
  }, [colors]);

  const handleColor = (e) => {
    setSelectedColor(e.target.value);
  };

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
        {colors.map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export { ColorFilter };
