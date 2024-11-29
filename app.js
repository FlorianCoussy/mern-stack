const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const API_VERSION = "/api/v1";
const PORT = 3000;
const FILE_FORMAT = "UTF-8";

const Status = {
  SUCCESS: "success",
  FAILURE: "failure",
};

const app = express();

// express.json is a middleware that parse incoming JSON payloads and make data available in the req.body
app.use(express.json());

// morgan is a logger middleware
// "dev" format : :method :url :status :response-time ms - :res[content-length]
app.use(morgan("dev"));

// Defining a customed middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");

  req.requestedAt = new Date().toISOString();

  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, FILE_FORMAT)
);

// Route handlers
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: Status.FAILURE,
    message: "This route is not implemented",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: Status.FAILURE,
    message: "This route is not implemented",
  });
};

const getUserById = (req, res) => {
  res.status(500).json({
    status: Status.FAILURE,
    message: "This route is not implemented",
  });
};

const updateUserById = (req, res) => {
  res.status(500).json({
    status: Status.FAILURE,
    message: "This route is not implemented",
  });
};

const deleteUserById = (req, res) => {
  res.status(500).json({
    status: Status.FAILURE,
    message: "This route is not implemented",
  });
};

// Defining routers
const tourRouter = express.Router();
const userRouter = express.Router();

// Chaining route handlers
tourRouter.route("/").get(getAllTours).post(createTour);

tourRouter
  .route("/:id")
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

// Mounting the routers
app.use(`${API_VERSION}/tours`, tourRouter);
app.use(`${API_VERSION}/users`, userRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
