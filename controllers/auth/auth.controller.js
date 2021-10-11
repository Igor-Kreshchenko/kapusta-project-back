const queryString = require("query-string");
const axios = require("axios");
const { findByEmail, updateToken } = require("../../repositories/users");
const HttpCode = require("../../helpers/constants");
const { User } = require("../../models");
const URL = require("url");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  let loginUser = await User.findByEmail({ email: userData.data.email });
  if (!loginUser || !loginUser.FRONTEND_URL) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      responseBody: {
        message: "You should register first",
      },
    });
  }

  //   const payload = loginUser.id;
  //   const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" });
  //   const refreshToken = await User.updateToken(payload, accessToken);

  return res.redirect(
    `${process.env.FRONTEND_URL}?email=${userData.data.email}`
  );

  //   return res.redirect(
  //     `${process.env.FRONTEND_URL}/google-redirect/?accessToken=${accessToken}&refreshToken=${refreshToken}`
  //   );
};
