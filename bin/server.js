// const db = require("../models/db");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../app");

const { DB_HOST, PORT = 4000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

module.exports = app;
// const PORT = process.env.PORT || 4000;

// db.then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running. Use our API on port: ${PORT}`);
//   });
// }).catch((err) => {
//   console.log(`Error: ${err.message}`);
// });
