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
    const { subject, color } = req.query;
    let query = "SELECT * FROM paintings";
    let conditions = [];
    let values = [];

    let index = 1;

    if (color) {
      conditions.push(
        `(colors @> $${index}::jsonb OR color_hex @> $${index}::jsonb)`
      );
      values.push(JSON.stringify([color])); // This assumes color could be either name or hex
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

    console.log("Executing query:", query, "with values:", values); // Add this line for debugging

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "An unexpected error occurred" });
    console.error(err.stack);
  }
});

module.exports = router;
