const { model, Schema } = require("mongoose");

const ExpenseDataSchema = new Schema({
  title: String,
  amount: Number,
  date: String,
  userId: String,
//   date: {type: Date, default:Date.now},
});

const ExpenseData = model("Expense", ExpenseDataSchema);
module.exports = ExpenseData;
