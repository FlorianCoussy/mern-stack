const express = require("express");
const {
  checkBodyValues,
  checkIfTourExists,
  createTour,
  deleteTourById,
  getAllTours,
  getTourById,
  updateTourById,
} = require("../controllers/tours");

// Defining routers
const router = express.Router();

// Param validators
router.param("id", checkIfTourExists);

// Chaining route handlers
router.route("/").get(getAllTours).post(checkBodyValues, createTour);

router
  .route("/:id")
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
