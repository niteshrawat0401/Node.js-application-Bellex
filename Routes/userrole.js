const {Router} = require("express");
const Userrole= require("../model/user")

const userRoleRouter= Router();

userRoleRouter.post("/role", (req,res)=>{
    const { name }= req.body;
    const userdata= new Userrole( {name});
    userdata.save((err, success)=>{
        if(userdata){
            return res.status(201).send({success:true, meassage: "Role created successfully", userdata:success["_doc"] })
        }
   
        return res.status(400).send({ "success": false, meassage: `Role not created`})
    })
})



module.exports= userRoleRouter;