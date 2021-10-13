const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const boolParser = require("express-query-boolean");
const { usersRouter } = require("./routes/api");
const { transactionsRouter } = require("./routes/api");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(boolParser());
app.use(helmet("/api/users"), usersRouter);
app.use(helmet("/api/transactions"), transactionsRouter);
app.use(helmet("/swagger"), swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((error, _, res, __) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    message,
  });
});
module.exports = app;
