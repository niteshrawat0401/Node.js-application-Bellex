const express = require("express");
const connect = require("./db/db");
const userRoleRouter = require("./Routes/userRoleRouter");
const authRouter = require("./Routes/authRouter");
const expenseRouter = require("./Routes/expenseRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userRoleRouter);
app.use("/auth", authRouter);
app.use("/userexpen", expenseRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

let PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connect;
  console.log("Server Started on http://localhost:8080");
});
