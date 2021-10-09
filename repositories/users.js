const { User } = require("../models");

const findById = async (id) => {
  return await User.findById({ _id: id });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (userOptions) => {
  const user = new User(userOptions);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate({ _id: id }, { token });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
};
