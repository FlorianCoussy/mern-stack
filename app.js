const express = require("express");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server side!");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
