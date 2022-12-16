const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server Started on http://localhost:8080");
});
