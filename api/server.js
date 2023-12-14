const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
require("dotenv").config({ path: "../.env" });

// Import the filter route
const filterRouter = require("./routes/filter");

app.use(express.json());
app.use(cors());

// Use the filter route
app.use(filterRouter);

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
