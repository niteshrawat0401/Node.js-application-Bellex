const {Router} = require("express");
const User= require("../model/authuser")

const authRouter= Router();


// Sign up
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

// username alrady exist
authRouter.post("/userexists", async(req,res)=>{
    const { username } = req.body;
    const user = await User.findOne( {username} )
    console.log(user);
            if(user)
          return res
            .status(400)
            .send({success: false ,message: `username ${user} already present`});
})

// Validation errors
authRouter.post("/usererr", async(req,res)=>{
    const { username } = req.body;
    const user = await User.findOne( {username} )
    console.log(user);
            if(!user)
          return res
            .status(400)
            .send({success: false ,message: `username ${user} already present`});
})


// Log In
// authRouter.post

module.exports= authRouter