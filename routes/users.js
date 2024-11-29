const express = require("express");
const {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} = require("../controllers/users");

// Defining routers
const router = express.Router();

// Chaining route handlers
router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
