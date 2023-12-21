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

// Endpoint to fetch combined color names and hex values
router.get("/combined-colors", async (req, res) => {
  try {
    // Fetch the combined color names and hex values from each painting
    const result = await pool.query(`
      SELECT p.colors, p.color_hex FROM paintings p;
    `);

    // Assuming each painting's colors and color_hex are aligned arrays
    const combinedColors = result.rows.flatMap((row) =>
      row.colors.map((color, index) => ({
        name: color,
        hex: row.color_hex[index] || "#FFFFFF", // Fallback if no corresponding hex
      }))
    );

    // Send unique combined colors
    const uniqueCombinedColors = Array.from(
      new Set(combinedColors.map((cc) => JSON.stringify(cc)))
    ).map((str) => JSON.parse(str));

    res.json(uniqueCombinedColors);
  } catch (err) {
    console.error("Error fetching combined colors", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Fetch paintings with optional filters
router.get("/", async (req, res) => {
  try {
    console.log("Received query:", req.query); // Log the received query

    // Parse colors and subjects from query parameters
    let colors = req.query.colors ? req.query.colors : [];
    if (typeof colors === "string") {
      try {
        colors = JSON.parse(colors);
      } catch (err) {
        // If parsing as JSON fails, treat it as a single color
        colors = [colors];
      }
    }
    const subjects = req.query.subjects || [];

    // Build the WHERE clause
    const whereClauses = [];
    const values = [];

    if (colors.length) {
      colors.forEach((color, index) => {
        whereClauses.push(`colors @> $${index + 1}::jsonb`);
        values.push(JSON.stringify([color]));
      });
    }

    // If no colors or subjects are provided, return all paintings
    if (!subjects.length && !colors.length) {
      const { rows } = await pool.query("SELECT * FROM paintings");
      return res.json(rows);
    }

    if (subjects.length) {
      whereClauses.push(`subjects @> $${values.length + 1}`);
      values.push(JSON.stringify(subjects));
    }

    // Execute the query
    const query = `SELECT * FROM paintings WHERE ${whereClauses.join( "AND" )}`;
    console.log("Executing query:", query, "with values:", values);
    const { rows } = await pool.query(query, values);
    res.json(rows);
    console.log("Executing query:", query, "with values:", values);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

module.exports = router;
