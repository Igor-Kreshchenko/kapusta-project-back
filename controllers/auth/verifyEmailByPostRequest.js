const { User } = require("../../models");
const { sendMail } = require("../../utils");
const HttpCode = require("../../helpers/constants");

const verifyEmailByPostRequest = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

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

  if (user.verify) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      responseBody: {
        message: "Email is already verified !",
      },
    });
  }

  const data = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="http://localhost:4000/api/users/verify/${user.verifyToken}">Подтверджение регистрации</a>`,
  };

  await sendMail(data);

  return res.status(HttpCode.OK).json({
    status: "success",
    contentType: "application/json",
    code: HttpCode.OK,
    responseBody: {
      message: "Verification email has send",
    },
  });
};

module.exports = verifyEmailByPostRequest;
