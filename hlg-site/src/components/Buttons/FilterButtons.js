// Apply and clear filter buttons
import React from "react";

function FilterControls({ onApply, onClear }) {
  return (
    <div className="filter-controls">
      <button onClick={onApply} className="apply-button">
        Apply
      </button>
      <button onClick={onClear} className="clear-button">
        Clear
      </button>
    </div>
  );
}

export { FilterControls }
