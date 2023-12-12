const { Pool } = require("pg");
require("dotenv").config({ path: "../.env" });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  url: process.env.DATABASE_URL,
});
console.log(process.env.DB_PASS);

const testQuery = async () => {
  const subject = "Galaxy"; // hardcoded value for testing
  const color = "#4E1500"; // hardcoded value for testing

  try {
    const result = await pool.query(
      "SELECT * FROM paintings WHERE subjects @> $1::jsonb AND colors @> $2::jsonb",
      [JSON.stringify([subject]), JSON.stringify([color])]
    );
    console.log(result.rows); // output the rows to the console
  } catch (err) {
    console.error("Error executing query", err);
  } finally {
    await pool.end(); // close the database connection
  }
};

testQuery();
