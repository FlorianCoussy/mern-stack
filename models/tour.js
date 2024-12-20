const { mongoose } = require("mongoose");

// A Schema describes the data's structure, default values, and validations
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"], // Validator
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  difficulty: String,
  premium: Boolean,
});

// A Model acts as a wrapper for the schema providing interface for CRUD operations
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
