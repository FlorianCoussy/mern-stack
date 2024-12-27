const { mongoose } = require("mongoose");

// A Schema describes the data's structure, default values, and validations
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"], // Validator
    unique: true,
    trim: true,
  },
  summary: {
    type: String,
    required: [true, "A tour must have a summary"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a maximum group size"],
  },
  startDates: [Date],
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  discount: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// A Model acts as a wrapper for the schema providing interface for CRUD operations
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
