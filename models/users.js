const User = require("./user");

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (userOptions) => {
  const user = new User(userOptions);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const getCurrentUser = async (id) => {
  return await User.findOne({ _id: id }, "email");
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  getCurrentUser,
};
