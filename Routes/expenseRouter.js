const { Router } = require("express");
const ExpenseData = require("../model/expense");
const Jwt = require("jsonwebtoken");
const expenseRouter = Router();

// Post ------Expense Creation API------
expenseRouter.post("/:userid/expense", async (req, res) => {
  const { title, amount, date } = req.body;
  let { userid } = req.params;
  const token = req.headers["authorization"].split(" ")[1];

  console.log(token);
  let expenses = await new ExpenseData({
    title,
    amount,
    date,
    userId: userid,
  });
  expenses.save((err, success) => {
    try {
      const varification = Jwt.verify(token, "SECRET");
      if (varification) {
        return res.status(201).send({
          status: true,
          message: `Expense with ${userid} created successfully`,
          success: success["_doc"],
        });
      }

      // -----validation fail-----
      else if (!varification) {
        return res
          .status(400)
          .send({ success: false, message: "validation fail" });
      }
    } catch (error) {
      return res
        .status(400)
        .send({ success: false, message: "validation fail" });
    }
  });
});

//  -----Token invalid-----
expenseRouter.post("/:userid/invalid", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const varification = Jwt.verify(token, "SECRET");
    if (!varification) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
});

// GET -----/expense/summary-----
expenseRouter.get("/:userid/expense/summary", async (req, res) => {
  const { userid } = req.params;
  const token = req.headers["authorization"].split(" ")[1];
  const userSummary = await ExpenseData.find({ userId: userid });
  const varification = Jwt.verify(token, "SECRET");
  if (varification) {
    res.send(userSummary);
  } else if (userSummary == null) {
    res.send(0);
  }
});

//   -----Expense Summary invalid-----
expenseRouter.get("/:userid/expense/invalid", async (req, res) => {
  const { userid } = req.params;
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const varification = Jwt.verify(token, "SECRET");
    if (!varification) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
});

//  -----Get Admin API-----
expenseRouter.get("/expense/summary", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  let data = req.query.data;
  let posts;
  try {
    const varification = Jwt.verify(token, "SECRET");
    if (varification) {
      if (data) {
        posts = await ExpenseData.find({ categories: data });
      } else {
        posts = await ExpenseData.find({});
        //
      }

      return res.status(200).send({ posts });
    }
  } catch (error) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
});

module.exports = expenseRouter;
