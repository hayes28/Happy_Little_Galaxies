const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");

const csvFilePath = path.join(
  __dirname,
  "HLG_data - Sheet1 (4).csv"
);
const jsonFilePath = path.join(__dirname, "data.json");

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    // Convert color and hex strings into arrays and remove all newline characters
    const updatedJsonObj = jsonObj.map((painting) => {
      return {
        ...painting,
        // Remove all types of newline characters, then split by comma and trim each entry
        colors: painting.colors
          .replace(/(\r\n|\n|\r)/gm, "")
          .split(",")
          .map((color) => color.trim()),
        color_hex: painting.color_hex
          .replace(/(\r\n|\n|\r)/gm, "")
          .split(",")
          .map((hex) => hex.trim()),
        subjects: painting.subjects
          .replace(/(\r\n|\n|\r)/gm, "")
          .split(",")
          .map((subject) => subject.trim()),
        painting_url: painting.painting_url.replace(/(\r\n|\n|\r)/gm, ""),
      };
    });

    console.log(updatedJsonObj); // log the updated JSON array
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(updatedJsonObj, null, 2),
      "utf-8"
    ); // write to the JSON file
  });

  console.log("JSON file created");
