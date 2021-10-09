const { findByEmail, create } = require("../../repositories/users");

const HttpCode = require("../../helpers/constants");

const signup = async (req, res, next) => {
  const { email } = req.body;
  const user = await findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      contentType: "application/json",
      code: HttpCode.CONFLICT,
      responseBody: {
        message: "Email in use",
      },
    });
  }
  try {
    const newUser = await create(req.body);
    return res.json({
      status: "created",
      contentType: "application/json",
      code: HttpCode.CREATED,
      responseBody: {
        user: {
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
