// UI for selecting a subject filter for the galaxy images
import React from "react";
import "./FilterStyles.css";

const SubjectFilter = ({ selectedSubject, setSelectedSubject }) => {
  // list of subjects
  const subjects = [
    "Galaxy",
    "Nebula",
    "Star Cluster",
    "Solar System",
    "Supernova",
    "Black Hole",
  ];

  // Handle the subject filter
  const handleSubject = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Renders the subject filter
  return (
    <div className="subject-filter">
      <label htmlFor="subject">Subject</label>
      <select
        name="subject"
        id="subject"
        value={selectedSubject}
        onChange={handleSubject}
      >
        <option value="">All</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  )};

export { SubjectFilter };
