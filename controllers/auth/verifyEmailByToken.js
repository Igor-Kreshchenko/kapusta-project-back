const { User } = require("../../models");
const HttpCode = require("../../helpers/constants");

const verifyEmailByToken = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verifyToken: verificationToken });

  if (!user) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      contentType: "application/json",
      code: HttpCode.NOT_FOUND,
      responseBody: {
        message: "User not found",
      },
    });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verifyToken: null,
  });

  return res.status(HttpCode.OK).json({
    status: "success",
    contentType: "application/json",
    code: HttpCode.OK,
    responseBody: {
      message: "Verification successful",
    },
  });
};

module.exports = verifyEmailByToken;
