const mongoose = require("mongoose");
// const db = require("../models/db");
require("dotenv").config();

const app = require("../app");

const { DB_HOST, PORT = 4000 } = process.env;

// db.then(
//   app.listen(PORT, () => {
//     console.log(`Server running. Use our API on port: ${PORT}`);
//   })
// ).catch((error) => console.log(error.message));

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

module.exports = app;
