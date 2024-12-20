const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load the .env config file
dotenv.config({ path: `${__dirname}/config.env` });

const app = require("./app");

mongoose
  .connect(process.env.DATABASE_URI)
  .then((db) =>
    console.log(`Connection to ${db.connections[0].name} DB successful!`)
  );

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

const testTour = new Tour({
  name: "Test tour",
  price: 0,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log("ERROR 💥\n ", err));

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
