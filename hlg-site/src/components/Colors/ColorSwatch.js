// ColorSwatch.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ColorStyles.css";

function ColorSwatch({ onColorSelect }) {
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

  return (
    <div className="color-bg">
      <div className="color-swatches">
        {colors.map((color, index) => (
          <button
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
            title={color}
            className="color-swatch"
          />
        ))}
      </div>
    </div>
  );
}

export default ColorSwatch;
