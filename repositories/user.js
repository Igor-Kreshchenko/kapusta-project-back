const { User } = require("../models");

const addUser = async (body) => {
  const result = await User.create(body);
  return result;
};

module.exports = {
  addUser,
};
