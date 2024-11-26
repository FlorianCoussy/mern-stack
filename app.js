const fs = require("fs");
const express = require("express");

const API_VERSION = "/api/v1";
const PORT = 3000;
const FILE_FORMAT = "UTF-8";

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, FILE_FORMAT)
);

app.get(`${API_VERSION}/tours`, (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
