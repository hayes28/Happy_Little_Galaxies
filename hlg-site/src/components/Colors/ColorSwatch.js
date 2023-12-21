// ColorSwatch.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ColorStyles.css";

function ColorSwatch({ onColorSelect }) {
  const [colors, setColors] = useState([]);

  // Fetch combined color names and hex values
  useEffect(() => {
    axios
      .get("http://localhost:4000/filter/combined-colors")
      .then((response) => {
        // Deduplicate color options
        const colorSet = new Set();
        const uniqueColors = response.data.filter((color) => {
          const signature = `${color.name}-${color.hex}`;
          if (colorSet.has(signature)) {
            return false;
          }
          colorSet.add(signature);
          return true;
        });

        setColors(uniqueColors);
      })
      .catch((error) => {
        console.error("Failed to fetch combined colors", error);
      });
  }, []);

  return (
    <div className="color-bg shared-bg">
      <div className="color-swatches">
        {colors.map((color) => (
          <button
            key={`${color.name}-${color.hex}`} // Unique key using name and hex
            style={{ backgroundColor: color.hex }} // Apply the background color directly
            onClick={() => onColorSelect(color.hex)}
            title={color.name}
            className="color-swatch"
          />
        ))}
      </div>
    </div>
  );
}

export default ColorSwatch;
