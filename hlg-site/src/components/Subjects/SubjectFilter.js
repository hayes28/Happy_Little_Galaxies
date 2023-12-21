import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubjectStyles.css";
import "../FilterStyles.css";
import M from "materialize-css";

const SubjectFilter = ({ selectedSubjects, setSelectedSubjects }) => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      console.log("Fetching subjects");
      try {
        const response = await axios.get(
          "http://localhost:4000/filter/subjects"
        );
        setSubjects(response.data);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
        setError("Failed to fetch subjects");
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectChange = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, len = options.length; i < len; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedSubjects(value);
  };


  // Initialize Materialize CSS select after the component mounts and whenever subjects change
  useEffect(() => {
    // Ensure Materialize is available and subjects are loaded
    if (window.M && subjects.length) {
      const selectElements = document.querySelectorAll("select");
      M.FormSelect.init(selectElements, { isMultiple: true });
    }
  }, [subjects]);


  return (
    <div className="subject-bg shared-bg">
      <div className="subject-filter">
        <select
          multiple
          name="subject"
          id="subject"
          value={selectedSubjects}
          onChange={handleSubjectChange}
        >
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export { SubjectFilter };
