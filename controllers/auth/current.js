const { getCurrentUser } = require("../../repositories/users");
const HttpCode = require("../../helpers/constants");

const current = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getCurrentUser(userId);
    console.log(user);
    if (user) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        user: {
          email: user.email,
        },
      });
    } else {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Not authorized",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = current;
