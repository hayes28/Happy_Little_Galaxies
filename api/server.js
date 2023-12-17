const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

require("dotenv").config({ path: "../.env" });

// Import the filter route from the routes directory
const filterRouter = require("./routes/filter");

// Middlewares
app.use(express.json());
app.use(cors());

// Use the filter route for any '/filter' endpoint calls
app.use("/filter", filterRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
