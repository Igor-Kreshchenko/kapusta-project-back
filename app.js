const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const {transactionsRouter} = require("./routes/api")

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("api/transactions", transactionsRouter);

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
