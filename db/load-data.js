const { Pool } = require("pg");
const fs = require("fs");
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

// Read the JSON file
const paintingsData = JSON.parse(fs.readFileSync("data.json", "utf8"));

// Function to insert data
async function insertPaintings(data) {
  try {
    for (const painting of data) {
      await pool.query(
        "INSERT INTO paintings (title, colors, color_hex, subjects, painting_url) VALUES ($1, $2, $3, $4, $5)",
        [
          painting.title,
          JSON.stringify(painting.colors),
          JSON.stringify(painting.color_hex),
          JSON.stringify(painting.subjects),
          painting.painting_url,
        ]
      );
    }
    console.log("All paintings have been inserted");
  } catch (err) {
    console.error("Error inserting paintings", err.stack);
  } finally {
    await pool.end(); // Close the connection
  }
}

// Run the insert function
insertPaintings(paintingsData);
