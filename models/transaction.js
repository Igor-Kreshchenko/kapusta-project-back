// const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// const TransactionSchema = Schema(
//   {
//     balance: {
//       type: Number,
//       default: 0.0,
//     },
//     income: [
//       {
//         id: {
//           type: String,
//         },
//         amount: {
//           type: Number,
//         },
//         date: {
//           type: Date,
//         },
//         category: {
//           type: String,
//           enum: ["ЗП", "Доп. доход"],
//         },
//         description: {
//           type: String,
//         },
//       },
//     ],
//     expenses: [
//       {
//         id: {
//           type: String,
//         },
//         amount: {
//           type: Number,
//         },
//         date: {
//           type: Date,
//         },
//         category: {
//           type: String,
//           enum: [
//             "Транспорт",
//             "Продукты",
//             "Здоровье",
//             "Алкоголь",
//             "Развлечения",
//             "Всё для дома",
//             "Техника",
//             "Коммуналка, связь",
//             "Спорт, хобби",
//             "Образование",
//             "Прочее",
//           ],
//         },
//         description: {
//           type: String,
//         },
//       },
//     ],
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "user",
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// const Transaction = model("transaction", TransactionSchema);

// module.exports = Transaction;
