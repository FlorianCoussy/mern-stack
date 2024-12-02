const fs = require("fs");
const { dirname } = require("path");

const appDir = dirname(require.main.filename);
const Status = require("../types/status");

const FILE_FORMAT = "UTF-8";
const FILE_URI = `${appDir}/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(FILE_URI, FILE_FORMAT));

exports.checkBodyValues = (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.price) {
    res.status(400).json({
      status: Status.FAILURE,
      message: "Tour name or price is missing",
    });
    return;
  }

  next();
};

exports.checkIfTourExists = (req, res, next, value) => {
  const id = Number(value);
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    res.status(404).json({
      status: Status.FAILURE,
      message: `Tour with id: ${id} not found`,
    });
    return;
  }

  next();
};

// Route handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: Status.SUCCESS,
    results: tours.length,
    data: { tours },
  });
};

exports.getTourById = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((t) => t.id === id);

  res.status(200).json({
    status: Status.SUCCESS,
    data: { tour },
  });
};

exports.createTour = async (req, res) => {
  const newTour = { id: tours.length, ...req.body };
  const data = [...tours, newTour];

  fs.writeFile(FILE_URI, JSON.stringify(data), FILE_FORMAT, () => {
    res.status(201).json({
      status: Status.SUCCESS,
      results: data.length,
      data: { tour: newTour },
    });
  });
};

exports.updateTourById = (req, res) => {
  const id = Number(req.params.id);

  const data = tours.map((t) => (t.id === id ? { ...t, ...req.body } : t));

  fs.writeFile(FILE_URI, JSON.stringify(data), FILE_FORMAT, () => {
    res.status(200).json({
      status: Status.SUCCESS,
      data: { tour: data[id] },
    });
  });
};

exports.deleteTourById = (req, res) => {
  const id = Number(req.params.id);

  const data = tours.filter((t) => t.id !== id);

  fs.writeFile(FILE_URI, JSON.stringify(data), FILE_FORMAT, () => {
    res.status(200).json({
      status: Status.SUCCESS,
      data: null,
    });
  });
};
