const { Router } = require("express");
const Userrole = require("../model/user");

const userRoleRouter = Router();

// POST
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

// Existuser
userRoleRouter.post("/exists", async (req, res) => {
  let { name } = req.body;
  let existuser = await Userrole.findOne({ name: name });
  console.log(name);

  try {
    if (existuser) {
      {
        return res.status(400).send({
          success: false,
          meassage: `Role with ${name} already present`,
        });
      }
    }
    //   Invalid
    return res
      .status(400)
      .send({ success: false, meassage: `Role ${name} is invalid` });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, meassage: `Role ${error} is invalid` });
  }
});

// Invalid
// userRoleRouter.post("/invalid", async (req, res) => {
//   let { name } = req.body;
//   let invaliduser = await Userrole.find({ name });
//   // console.log(invaliduser);
//   if (invaliduser !== name) {
//     return res
//       .status(400)
//       .send({ success: false, meassage: `Role ${name} is invalid` });
//   }
// });

module.exports = userRoleRouter;
