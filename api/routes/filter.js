const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const { fetchFilteredData } = require("../controllers/filterController");
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

// Apply filters and pagination to fetch paintings
router.get("/", async (req, res) => {
  const { subject, color, limit = 10, offset = 0 } = req.query;
  let query = "SELECT * FROM paintings";
  let conditions = [];
  let values = [];

  if (subject) {
    conditions.push("subjects @> $1::jsonb");
    values.push(JSON.stringify([subject]));
  }

  if (color) {
    conditions.push("colors @> $2::jsonb");
    values.push(JSON.stringify([color]));
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(parseInt(limit, 10), parseInt(offset, 10));

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

module.exports = router;
