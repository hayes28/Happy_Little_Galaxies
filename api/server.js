const express = require("express");
const router = express.Router();
const { fetchFilterData } = require('../controllers/filterController');
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

// Define a route for filtered data with pagination
router.get('/filtered-data', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const filterData = await fetchFilteredData(limit, offset);
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching filtered data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
