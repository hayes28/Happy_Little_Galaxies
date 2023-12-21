import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ColorStyles.css";

function ColorSwatch({ selectedColors, setSelectedColors }) {
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

  // Handler to toggle selection of colors
  const handleColorSelect = (hex) => {
    const isSelected = selectedColors.includes(hex);
    // If the color is already selected, remove it, otherwise add it
    setSelectedColors(
      isSelected
        ? selectedColors.filter((color) => color !== hex)
        : [...selectedColors, hex]
    );
  };

  return (
    <div className="color-bg shared-bg">
      <div className="color-swatches">
        {colors.map((color) => (
          <button
            key={`${color.name}-${color.hex}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleColorSelect(color.hex)}
            title={color.name}
            // Apply 'selected' class if the color is in the selectedColors array
            className={`color-swatch ${
              selectedColors.includes(color.hex) ? "selected" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorSwatch;
