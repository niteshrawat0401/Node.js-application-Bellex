const {Router} = require("express");
const ExpenseData= require("../model/expense");

const expenseRouter= Router();

expenseRouter.post("/:id/expense",async(req,res)=>{

    let {id}= req.params;
    let expenses= await new ExpenseData( {
        title,
        amount,
        date
    } )
})

module.exports= expenseRouter;