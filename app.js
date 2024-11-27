const fs = require("fs");
const express = require("express");

const API_VERSION = "/api/v1";
const PORT = 3000;
const FILE_FORMAT = "UTF-8";

const app = express();
app.use(express.json()); // express.json is a middleware that parse incoming JSON payloads and make data available in the req.body

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

app.post(`${API_VERSION}/tours`, async (req, res) => {
  const newTour = { id: tours.length, ...req.body };
  const data = [...tours, newTour];

  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(data),
    FILE_FORMAT,
    () => {
      res.status(201).json({
        status: "success",
        results: data.length,
        data: { tour: newTour },
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
