const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { v4 } = require("uuid");

const isIntegerRegexp = /^(\-)?\d+(\.\d{1,2})?$/; // Проверяет является ли число целым и имеет не больше двух цифер после точки.
const isPositiveIntegerRegexp = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/; // Проверяет является ли число ПОЛОЖИТЕЛЬНЫМ целым и имеет не больше двух цифер после точки.
const dateRegexp =
  /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](19|20)?[0-9]{2}$/; // Проверяет соотвествует ли дата формату (MM.DD.YYYY):
const descriptionRegexp = /^.{2,100}$/; // Проверяет имеет ли строка не менее двух ЛЮБЫХ символов и не больше 100 символов.

const TransactionSchema = Schema(
  {
    balance: {
      type: Number,
      match: isIntegerRegexp,
      default: 0,
    },
    income: [
      {
        id: {
          type: String,
          default: () => v4(),
        },
        amount: {
          type: Number,
          match: isPositiveIntegerRegexp,
        },
        date: {
          type: String,
          match: dateRegexp,
        },
        category: {
          type: String,
          enum: ["ЗП", "Доп. доход"],
        },
        description: {
          type: String,
          match: descriptionRegexp,
        },
      },
    ],
    expenses: [
      {
        id: {
          type: String,
          default: () => v4(),
        },
        amount: {
          type: Number,
          match: isPositiveIntegerRegexp,
        },
        date: {
          type: Date,
          match: dateRegexp,
        },
        category: {
          type: String,
          enum: [
            "Транспорт",
            "Продукты",
            "Здоровье",
            "Алкоголь",
            "Развлечения",
            "Всё для дома",
            "Техника",
            "Коммуналка, связь",
            "Спорт, хобби",
            "Образование",
            "Прочее",
          ],
        },
        description: {
          type: String,
          match: descriptionRegexp,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", TransactionSchema);

const joiSchemaAddIncome = Joi.object({
  id: Joi.string(),
  amount: Joi.number().min(0).required(),
  date: Joi.string().pattern(dateRegexp).required(),
  category: Joi.string().valid("ЗП", "Доп. доход").required(),
  description: Joi.string().pattern(descriptionRegexp).required(),
});

const joiSchemaAddExpenses = Joi.object({
  id: Joi.string(),
  amount: Joi.number().min(0).required(),
  date: Joi.string().pattern(dateRegexp).required(),
  category: Joi.string()
    .valid(
      "Транспорт",
      "Продукты",
      "Здоровье",
      "Алкоголь",
      "Развлечения",
      "Всё для дома",
      "Техника",
      "Коммуналка, связь",
      "Спорт, хобби",
      "Образование",
      "Прочее"
    )
    .required(),
  description: Joi.string().pattern(descriptionRegexp).required(),
});

const joiSchemaRenewBalance = Joi.object({
  balance: Joi.number().required(),
});

const joiSchemaGetBalance = Joi.object({
  balance: Joi.number().required(),
});

module.exports = {
  Transaction,
  joiSchemaAddIncome,
  joiSchemaAddExpenses,
  joiSchemaRenewBalance,
  joiSchemaGetBalance,
};
