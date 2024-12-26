const express = require("express");
const {
  createTour,
  deleteTourById,
  getAllTours,
  getTourById,
  updateTourById,
} = require("../controllers/tours");

// Defining routers
const router = express.Router();

// Param validators (disabled because MongoDB handles ID validation)
// router.param("id", checkIfTourExists);

// Chaining route handlers
router.route("/").get(getAllTours).post(createTour);

router
  .route("/:id")
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
