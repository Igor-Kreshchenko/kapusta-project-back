const queryString = require("query-string")
const axios = require("axios")
const { findByEmail, updateToken } = require("../../repositories/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const googleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
    const urlObj = new URL(fullUrl)
    const urlParams = queryString.parse(urlObj.search)
    const code = urlParams.code
    const tokenData = await axios({
        url: "https://oauth2.googleapis.com/token",
        method: "post",
        data: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
            grant_type: "authorization_code",
            code
        }
    })
    //console.log('tokenData:')
    //console.log(tokenData.data)
    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`
        }
    })
    //console.log('userData:')
    //console.log(userData.data)

    /*якщо юзера не існує, то реєструємо його, а інакше пускаємо;
    також створюємо токен (accessToken) і перенаправляємо:
    return res.redirect(
        `${process.env.FRONTEND_URL}/google-redirect/?accessToken=${accessToken}`
    )*/
    const user = await findByEmail(userData.data.email)
    //console.log('user:')
    //console.log(user)
    if (!user) {
        return res.redirect(
            `${process.env.FRONTEND_URL}/signup`
        )
    }
    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" })
    await updateToken(user.id, token)
    return res.redirect(
        `${process.env.FRONTEND_URL}/transactions`
    )
 }

module.exports = googleRedirect
