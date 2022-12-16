const { model, Schema } = require("mongoose");

const ExpenseDataSchema = new Schema({
  title: String,
  amount: String,
  date: Number,
//   date: {type: Date, default:Date.now},
});

const ExpenseData = model("Expense", ExppensDataSchema);
module.exports = ExpenseData;
