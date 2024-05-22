
const LoginModel=require("../models/LoginModel.model")

async function checkUser(req,res){

    const {empId,password}=req.data;
    //const 

     res.send("true");
}

module.exports={checkUser}