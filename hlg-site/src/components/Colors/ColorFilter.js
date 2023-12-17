import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ColorStyles.css";

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
