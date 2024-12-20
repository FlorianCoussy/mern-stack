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

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
