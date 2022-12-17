const {Router} = require("express");
const ExpenseData= require("../model/expense");

const expenseRouter = Router();

// Post expene
expenseRouter.post("/:userid/expense",async(req,res)=>{
    const {title, amount, date}= req.body;
    let {userid}= req.params;
    const token = req.headers["authorization"].split(" ")[1];
    let expenses= await new ExpenseData( {
        title,
        amount,
        date,
        userId: userid,
    } )
    expenses.save((err, success)=>{
            if(token){
                return res.status(201).send( { "status" : true, message :`Expense with ${userid} created successfully`, success: success["_doc"]} )                
             }        
        })
})


// "title": "machine exp",
// "amount": 500,
// "date": "19-12-2022"

// validations fails
expenseRouter.post("/:userid/validfail" , (req, res)=>{
    const token = req.headers["authorization"].split(" ")[1];
    if(token==null){
        return res.status(400).send({"success": false, message:"validation fail"})
    }
})

// Token invalid
expenseRouter.post("/:userid/invalid" ,async (req, res)=>{
    const token = req.headers["authorization"].split(" ")[1];
    try {
        const varification = Jwt.verify(token, "SECRET");
        if (varification) {
          const user = await ExpenseData.findOne({ _id: id });
          res.send({ message: "user wrong" });
        } else {
          return res.status(401).send({"success" : false,message: "Unauthorized"});
        }
      } catch (error) {
        return res.status(401).send({"success" : false,message: "Unauthorized"});
      }
})

// GET /expense/summary
expenseRouter.get("/:userid/expense/summary", async (req, res) => {
    const { userid } = req.params;
    const token = req.headers["authorization"].split(" ")[1];
    const userSummary = await ExpenseData.find({ userId: userid });
    if(token){
        res.send(userSummary);
    }
    else{
        res.send(0)
    }
  });

  expenseRouter.get("/:userid/expense/summary" ,async (req, res)=>{
    const { userid } = req.params;
    const token = req.headers["authorization"].split(" ")[1];
    try {
        const varification = Jwt.verify(token, "SECRET");
        if (varification) {
          const user = await ExpenseData.find({ userId: userid });
          res.send({ message: "user got" });
        } else {
          return res.status(401).send({"success" : false,message: "Unauthorized"});
        }
      } catch (error) {
        return res.status(401).send({"success" : false,message: "Unauthorized"});
      }
})


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pdGVzaCIsImlhdCI6MTY3MTI1NDMxOCwiZXhwIjoxNjcxMjU3OTE4fQ.6n6JfghTg5sHGmDEXSexPRH_bjGj4COv4T1CJPz2R3U

module.exports= expenseRouter