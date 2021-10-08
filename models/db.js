const mongoose = require("mongoose");
// const dotenv = require("dotenv");
require("dotenv").config();

const uriDb = process.env.DB_HOST;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection to DB closed and app termination");
    process.exit(1);
  });
});

module.exports = db;