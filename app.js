const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tours");
const userRouter = require("./routes/users");

const API_VERSION = "/api/v1";

const app = express();

// morgan is a logger middleware
// "dev" format : :method :url :status :response-time ms - :res[content-length]
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// express.json is a middleware that parse incoming JSON payloads and make data available in the req.body
app.use(express.json());
// express.static is a middleware that serves static content
app.use(express.static(`${__dirname}/public`));

// Defining a customed middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");

  req.requestedAt = new Date().toISOString();

  next();
});

// Mounting the routers
app.use(`${API_VERSION}/tours`, tourRouter);
app.use(`${API_VERSION}/users`, userRouter);

module.exports = app;
