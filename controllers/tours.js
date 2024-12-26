const fs = require("fs");
const { dirname } = require("path");
const Tour = require("../models/tour");

const appDir = dirname(require.main.filename);
const Status = require("../types/status");

const FILE_FORMAT = "UTF-8";
const FILE_URI = `${appDir}/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(FILE_URI, FILE_FORMAT));

/**
 * @deprecated - Mongoose Model makes the name and price fields required
 */
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

/**
 * @deprecated - MongoDB handles ID validation
 */
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
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: Status.SUCCESS,
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    console.log("ERROR 💥\n ", err);

    res.status(404).json({
      status: Status.FAILURE,
      message: err,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // const tour = await Tour.findOne({ _id: req.params.id });

    res.status(200).json({
      status: Status.SUCCESS,
      data: { tour },
    });
  } catch (err) {
    console.log("ERROR 💥\n ", err);

    res.status(404).json({
      status: Status.FAILURE,
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: Status.SUCCESS,
      data: { tour },
    });
  } catch (err) {
    console.log("ERROR 💥\n ", err);

    res.status(403).json({
      status: Status.FAILURE,
      message: err,
    });
  }
};

exports.updateTourById = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the upserted document
      runValidators: true,
    });
    // const tour = await Tour.updateOne({ _id: req.params.id }, req.body);

    res.status(200).json({
      status: Status.SUCCESS,
      data: { tour },
    });
  } catch (err) {
    console.log("ERROR 💥\n ", err);

    res.status(403).json({
      status: Status.FAILURE,
      message: err,
    });
  }
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
