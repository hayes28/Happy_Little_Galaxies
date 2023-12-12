app.get("/filter", async (req, res) => {
  const { subject, color } = req.query; // e.g., "/filter?subject=Trees&color=#E41500"

  let query = "SELECT * FROM paintings";
  let conditions = [];
  let params = [];

  if (subject) {
    conditions.push("subjects @> $1");
    params.push(JSON.stringify([subject]));
  }

  if (color) {
    conditions.push("colors @> $2");
    params.push(JSON.stringify([color]));
  }

  if (conditions.length) {
    query += " WHERE " + conditions.join(" AND ");
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Error in filter query", err.stack);
    res.status(500).send("Error while fetching paintings");
  }
});
