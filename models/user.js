const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarUrl: {
      type: String,
      default: () => {
        return gravatar.url(this.email);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const joiSchemaAddUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email(emailRegexp).required(),
  name: Joi.string().required(),
});

const joiSchemaChangeUser = Joi.object({
  password: Joi.string(),
  email: Joi.string().email(emailRegexp),
  name: Joi.string(),
});

const joiSchemaVerifyEmail = Joi.object({
  email: Joi.string().email(emailRegexp).required(),
});

const User = model("user", UserSchema);

module.exports = {
  User,
  joiUserSchema,
  joiSchemaAddUser,
  joiSchemaChangeUser,
  joiSchemaVerifyEmail,
};
