const { updateToken } = require("../../repositories/users");
const HttpCode = require("../../helpers/constants");

const logout = async (req, res) => {
  const id = req.user.id;

  await updateToken(id, null);

  return res.json({
    status: "success",
    code: HttpCode.OK,
    message: "Success logout",
  });
};

module.exports = logout;
