const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});
console.log("DB_PASS:", process.env.DB_PASS);

router.get("/filter", async (req, res) => {
  const { subject, color } = req.query;

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

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

module.exports = router;
