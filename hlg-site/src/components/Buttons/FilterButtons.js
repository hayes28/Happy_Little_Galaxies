// Apply and clear filter buttons
import React from "react";
import "../FilterStyles.css";
import './FilterButtonStyles.css';

function FilterControls({ onApply, onClear }) {
  return (
    <div className="control-bg shared-bg">
      <div className="filter-controls">
        <button onClick={onApply} className="apply-button btn-large black waves-effect waves-light">
        <i className="material-icons right">check</i>
          Apply
        </button>
        <button onClick={onClear} className="clear-button btn-large black waves-effect waves-light">
          <i className="material-icons right">clear</i>
          Clear
        </button>
      </div>
    </div>
  );
}

export { FilterControls }
