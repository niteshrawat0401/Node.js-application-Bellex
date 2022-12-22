const { Router } = require("express");
const User = require("../model/authUser");
const Jwt = require("jsonwebtoken");

const authRouter = Router();

// -----Signup API------
authRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username, password: password });

  if (username.length < 3 || username.length > 10) {
    res.send({ success: false, message: "Charactor should between 3 and 10" });
  }

  let smallCase = "abcdefghijklmnopqrstuvwxyz";
  let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let num = "1234567890";

  if (password.length > 15 || password.length < 8) {
    return res.send({
      message: "password should be between 8 to 15 characters long",
    });
  }
  let flag = true;
  for (let i = 0; i < password.length; i++) {
    if (smallCase.includes(password[i])) {
      flag = false;
      break;
    }
  }

  if (flag == true) {
    return res.send({
      message: "password should contain atleast one small case",
    });
  }

  for (let i = 0; i < smallCase.length; i++) {
    if (upperCase.includes(password[i])) {
      flag = true;
      break;
    }
  }

  if (flag == false) {
    return res.send({
      message: "password should contain atleast one upper case",
    });
  }
  for (let i = 0; i < smallCase.length; i++) {
    if (num.includes(password[i])) {
      flag = false;
      break;
    }
  }

  if (flag == true) {
    return res.send({
      message: "password should contain atleast one number",
    });
  } else {
    try {
      if (user?.username) {
        return res.status(400).send({
          success: false,
          message: `username ${username} already present`,
        });
      } else {
        const newUser = new User({ username, password });
        await newUser.save();
        return res.status(201).send({
          success: true,
          message: "Sign up Successfully",
          newUser,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
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
