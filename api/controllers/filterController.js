// Function to fetch filtered data with pagination
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

const fetchFilteredData = async (limit, offset) => {
  try {
    const query = `SELECT * FROM paintings LIMIT $1 OFFSET $2`;
    const values = [limit, offset];

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching filtered data from database:", error);
    throw error;
  }
};

module.exports = { fetchFilteredData };

