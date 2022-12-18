const { Router } = require("express");
const Userrole = require("../model/user");

const userRoleRouter = Router();

// POST  ------Role Creation-----
userRoleRouter.post("/role", async (req, res) => {
  const { name } = req.body;
    const userdata = await new Userrole({ name });
    userdata.save((err, success) => {
      if (userdata) {
        return res.status(201).send({
          success: true,
          meassage: "Role created successfully",
          userdata: success["_doc"],
        });
      }
  
      return res
        .status(500)
        .send({ success: false, meassage: "Something went wrong" });
    });
  

});

// ----Existing user-----
userRoleRouter.post("/exists", async (req, res) => {
  let { name } = req.body;
  let existuser = await Userrole.findOne({ name: name });
    if (existuser) {
      {
        return res.status(400).send({
          success: false,
          meassage: `Role with ${name} already present`,
        });
      }
    }
    //   -----Invalid-----
    return res
      .status(400)
      .send({ success: false, meassage: `Role ${name} is invalid` });

});

module.exports = userRoleRouter;
