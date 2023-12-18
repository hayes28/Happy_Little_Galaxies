const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config({ path: "../.env" });

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Fetch distinct subjects
router.get("/subjects", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT DISTINCT jsonb_array_elements_text(subjects) as subject FROM paintings;"
    );
    const subjects = result.rows.map((row) => row.subject);
    res.json(subjects);
  } catch (err) {
    console.error("Error fetching subjects", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Fetch distinct colors
router.get("/colors", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT DISTINCT jsonb_array_elements_text(colors) as color FROM paintings;"
    );
    const colors = result.rows.map((row) => row.color);
    res.json(colors);
  } catch (err) {
    console.error("Error fetching colors", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Fetch paintings with optional filters
router.get("/", async (req, res) => {
  try {
    const { subject, color } = req.query;
    let query = "SELECT * FROM paintings";
    let conditions = [];
    let values = [];

    let index = 1;

    if (color) {
      conditions.push(`colors @> $${index}::jsonb`);
      values.push(JSON.stringify([color]));
      index++;
    }

    if (subject) {
      conditions.push(`subjects @> $${index}::jsonb`);
      values.push(JSON.stringify([subject]));
      index++;
    }


    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    console.log(query, values); // Add this line for debugging

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "An unexpected error occurred" });
    console.error(err.stack);
  }
});

module.exports = router;
