const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");

const csvFilePath = path.join(__dirname, "HLG_data - Sheet1.csv");
const jsonFilePath = path.join(
  __dirname,
  "data.json"
);

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log(jsonObj); // log the JSON array
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2), "utf-8"); // write to the json file
  });
