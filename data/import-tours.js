/**
 * This script imports the tours-simple.json file content into MongoDB.
 */
const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require("mongoose");

const Tour = require("../models/tour");

dotenv.config({ path: `${__dirname}/../config.env` });

const FILE_URI = `${__dirname}/tours-simple.json`;
const FILE_FORMAT = "UTF-8";

const start = async () => {
  try {
    const data = JSON.parse(
      fs.readFileSync(FILE_URI, { encoding: FILE_FORMAT })
    );

    const db = await mongoose.connect(process.env.DATABASE_URI);
    console.log(`🔌 Connection to ${db.connections[0].name} DB successful!`);

    await Tour.deleteMany();
    console.log("🗑️ Collection has been purged!");

    await Tour.create(data);
    console.log("✅ Fresh data have been imported!");

    process.exit(0);
  } catch (err) {
    console.log("ERROR 💥\n ", err);
    process.exit(1);
  }
};

start();
