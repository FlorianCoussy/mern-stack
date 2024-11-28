const fs = require("fs");
const express = require("express");

const API_VERSION = "/api/v1";
const PORT = 3000;
const FILE_FORMAT = "UTF-8";

const Status = {
  SUCCESS: "success",
  FAILURE: "failure",
};

const app = express();
app.use(express.json()); // express.json is a middleware that parse incoming JSON payloads and make data available in the req.body

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, FILE_FORMAT)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: Status.SUCCESS,
    results: tours.length,
    data: { tours },
  });
};

const getTourById = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    res.status(404).json({
      status: Status.FAILURE,
      message: `Tour with id : ${id} not found`,
    });
    return;
  }

  res.status(200).json({
    status: Status.SUCCESS,
    data: { tour },
  });
};

const createTour = async (req, res) => {
  const newTour = { id: tours.length, ...req.body };
  const data = [...tours, newTour];

  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(data),
    FILE_FORMAT,
    () => {
      res.status(201).json({
        status: Status.SUCCESS,
        results: data.length,
        data: { tour: newTour },
      });
    }
  );
};

const updateTourById = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    res.status(404).json({
      status: Status.FAILURE,
      message: `Tour with id : ${id} not found`,
    });
    return;
  }

  const data = tours.map((t) => {
    return t.id !== id ? { ...t, ...req.body } : t;
  });

  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(data),
    FILE_FORMAT,
    () => {
      res.status(200).json({
        status: Status.SUCCESS,
        data: { tour: data[id] },
      });
    }
  );
};

const deleteTourById = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    res.status(404).json({
      status: Status.FAILURE,
      message: `Tour with id : ${id} not found`,
    });
    return;
  }

  const data = tours.filter((t) => t.id !== id);

  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(data),
    FILE_FORMAT,
    () => {
      res.status(204).json({
        status: Status.SUCCESS,
        data: null,
      });
    }
  );
};

app.route(`${API_VERSION}/tours`).get(getAllTours).post(createTour);

app
  .route(`${API_VERSION}/tours/:id`)
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
