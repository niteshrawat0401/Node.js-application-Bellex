const {Router} = require("express");
const User= require("../model/authuser")

const authRouter= Router();

authRouter.post("/signup", (req,res)=>{
    const newuser = new User(req.body);
    newuser.save((err, success) => {
        try {
          return res
            .status(201)
            .send({ message: "Sign up Successfully", newuser: success["_doc"] });
        } catch (error) {
          return res.status(500).send({ message: "Something wen wrong" });
        }
      });
})


module.exports= authRouter