const { updateToken } = require("../../repositories/users");
const HttpCode = require("../../helpers/constants");

const logout = async (req, res) => {
  const id = req.id;
  await updateToken(id, null);

  return res.json({
    status: "success",
    code: HttpCode.NO_CONTENT,
    message: "Success logout",
  });
};

module.exports = logout;
