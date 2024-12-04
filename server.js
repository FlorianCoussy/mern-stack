const dotenv = require("dotenv");

// Load the .env config file
dotenv.config({ path: `${__dirname}/config.env` });

const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
