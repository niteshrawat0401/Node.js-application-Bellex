const { Router } = require("express");
const Userrole = require("../model/user");

const userRoleRouter = Router();

// POST  ------Role Creation-----
userRoleRouter.post("/role", async (req, res) => {
  const { name } = req.body;

  const user = await Userrole.findOne({ name: name });
  // ----Existing user-----
  try {
    if (user) {
      if (user?.name) {
        return res.status(400).send({
          success: false,
          meassage: `Role with ${name} already present`,
        });
      }
      //  else if (user !== "admin" || user !== "user") {
      //   return res
      //     .status(400)
      //     .send({ success: false, meassage: `Role ${name} is invalid` });
      // }
    } else {
      const userData = new Userrole({ name });
      await userData.save();
      return res.status(201).send({
        success: true,
        meassage: "Role created successfully",
        userData,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//  -----Invalid-----
userRoleRouter.post("/invalid", async (req, res) => {
  let { name } = req.body;
  try {
    let existuser = await Userrole.findOne({ name: name });
    if (!existuser) {
      {
        return res
          .status(400)
          .send({ success: false, meassage: `Role ${name} is invalid` });
      }
    }
    return res.send(existuser);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = userRoleRouter;
// "title": "machine",
// "amount": 123456789,
// "date": "17-12-2022"