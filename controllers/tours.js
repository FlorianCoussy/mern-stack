const Status = require("../types/status");
const Tour = require("../models/tour");

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
  // eslint-disable-next-line no-undef
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
    const query = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete query[field]);

    const tours = await Tour.find(query);

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

exports.deleteTourById = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: Status.SUCCESS,
      data: null,
    });
  } catch (err) {
    console.log("ERROR 💥\n ", err);

    res.status(500).json({
      status: Status.FAILURE,
      message: err,
    });
  }
};
