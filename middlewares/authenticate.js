const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const { SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  if (beare !== "Bearer") {
    throw new Unauthorized();
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Unauthorized();
  }
  console.log(id);
};

module.exports = authenticate;
