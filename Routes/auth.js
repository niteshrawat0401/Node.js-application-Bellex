const {Router} = require("express");
const User= require("../model/authuser")

const authRouter= Router();

authRouter.post("/signup", async(req,res)=>{
    const newuser = await new User(req.body);
    newuser.save((err, success) => {
        try {
          return res
            .status(201)
            .send({success: true ,message: "Sign up Successfully", newuser: success["_doc"] });
        } catch (error) {
          return res.status(500).send({ message: "Something wen wrong" });
        }
      });
})

authRouter.post("/userexists", async(req,res)=>{
    const { username } = req.body;
    const user = await User.findOne( {username} )
    console.log(user);
            if(user)
          return res
            .status(400)
            .send({success: false ,message: `username ${user} already present`});
})


module.exports= authRouter