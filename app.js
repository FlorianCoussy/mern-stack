const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tours");
const userRouter = require("./routes/users");

const API_VERSION = "/api/v1";
const PORT = 3000;

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

// Mounting the routers
app.use(`${API_VERSION}/tours`, tourRouter);
app.use(`${API_VERSION}/users`, userRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
