const express = require("express");
const Status = require("../types/status");

// Defining routers
const router = express.Router();

// Route handlers
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

// Chaining route handlers
router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
