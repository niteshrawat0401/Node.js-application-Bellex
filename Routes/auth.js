const { Router } = require("express");
const User = require("../model/authuser");
const Jwt = require("jsonwebtoken");

const authRouter = Router();

// -----Signup API------
authRouter.post("/signup", async (req, res) => {
  const newuser = await new User(req.body);
  newuser.save((err, success) => {
    try {
      return res.status(201).send({
        success: true,
        message: "Sign up Successfully",
        newuser: success["_doc"],
      });
    } catch (error) {
      return res.status(500).send({ message: "Something wen wrong" });
    }
  });
});

// Username alrady exist
authRouter.post("/userexists", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user)
    return res
      .status(400)
      .send({ success: false, message: `username ${user} already present` });

  //   Validation errors
  return res
    .status(400)
    .send({ success: false, message: `username should correct` });
});

// -----Login API------
authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const correctUser = await User.find({ username, password });

  //   If redentials are incorrect
  if (correctUser.length < 1 || !correctUser || !password) {
    return res.status(400).send({ message: "Username/Password is invalid" });
  }

  //   If credentials are correct
  const token = Jwt.sign({ username }, "SECRET", { expiresIn: "1 hour" });

  const refreshToken = Jwt.sign({ username }, "REFRESHPASSWORD", {
    expiresIn: "20days",
  });

  let { _id } = correctUser[0];
  return res
    .status(200)
    .send({ success: true, token: token, refreshToken: refreshToken, _id });
});

authRouter.post("/newToken", (req, res) => {
  const refreshToken = req.headers["authorization"].split(" ")[1];

  const validation = Jwt.verify(refreshToken, "REFRESHPASSWORD");
  //   console.log("valid", validation);
  if (validation) {
    const newPrimaryToken = Jwt.sign({ username }, "SECRET", {
      expiresIn: "1 hour",
    });
    return res.send({ token: newPrimaryToken });
  }
});

// ----User Profile Get Api-----
authRouter.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  try {
    const varification = Jwt.verify(token, "SECRET");
    //   console.log("valid",varification);
    if (varification) {
      const user = await User.findOne({ _id: id });
      res.send({ profile: "userProfile", user });
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
});

module.exports = authRouter;
