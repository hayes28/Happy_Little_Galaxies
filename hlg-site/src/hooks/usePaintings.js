import { useState, useEffect } from "react";

const usePaintings = () => {
  const [paintings, setPaintings] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaintings = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = new URLSearchParams(filters).toString();
        console.log("Fetching with query:", queryString); // Log the query string
        const response = await fetch(
          `http://localhost:4000/filter?${queryString}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPaintings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, [filters]);

  return { paintings, loading, error, setFilters };
};

export default usePaintings;
