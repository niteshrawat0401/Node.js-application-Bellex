const express = require("express");
const connect = require("./db/db");
const userRoleRouter = require("./Routes/userrole");
const authRouter = require("./Routes/auth");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userRoleRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

let PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connect;
  console.log("Server Started on http://localhost:8080");
});
