import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubjectStyles.css";

const SubjectFilter = ({ selectedSubject, setSelectedSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
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

  useEffect(() => {
    console.log(subjects);
  }, [subjects]);

  const handleSubject = (e) => {
    setSelectedSubject(e.target.value);
  };

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
        {subjects.length ? (
          subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))
        ) : (
          <option disabled>Loading subjects...</option>
        )}
      </select>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export { SubjectFilter };
