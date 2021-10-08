const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { v4 } = require("uuid");

const isIntegerRegexp = /^(\-)?\d+(\.\d{1,2})?$/; // Проверяет является ли число целым и имеет не больше двух цифер после точки.

const BalanceSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    email: {
      type: String,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    balance: {
      type: Number,
      match: isIntegerRegexp,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

const Balance = model("balance", BalanceSchema);

const joiBalanceSchema = Joi.object({
  owner: Joi.string().min(3).required(),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  balance: Joi.number().required(),
});

module.exports = {
  Balance,
  joiBalanceSchema,
};
