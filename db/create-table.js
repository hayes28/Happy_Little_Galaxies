const { Pool } = require("pg");
require("dotenv").config({ path: "../.env" });

// Set up your database connection information
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  url: process.env.DATABASE_URL,
});

// SQL query to create the table
const createTableQuery = `
CREATE TABLE IF NOT EXISTS paintings (
  id SERIAL PRIMARY KEY,
  title TEXT,
  colors JSONB,
  color_hex JSONB,
  subjects JSONB,
  painting_url TEXT
);
`;

// Function to create the table
async function createTable() {
  try {
    await pool.query(createTableQuery);
    console.log("Table created successfully");
  } catch (err) {
    console.error("Error creating table", err.stack);
  } finally {
    await pool.end(); // Close the connection
  }
}

// Run the create table function
createTable();
