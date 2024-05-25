const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
//const LoginModel=require("../models/LoginModel.model")
const EmployeeModel=require("../models/EmployeeModel.model")

async function checkUser(req,res){

    const {empId,password}=req.body;
    
    if(!empId||!password){
        return res.status(404).send({message:"Pleas enter details"})
    }
    else{
    const emp=await EmployeeModel.findOne({empId:empId})
    
    if(!emp)
        return res.status(404).send({message:"Employee does not exist"})
    else if(emp.password!=password)
        res.status(404).send({message :"Password is incorrect"})
    else{
         const payload = {
             emp: {
                id: emp.empId,
                 role: emp.role
            }
          };
         const token = jwt.sign(payload, process.env.JWT_PVT_KEY);
    
         res.header('auth-token', token).send({ token });

          // res.status(200).send("true");
        }   
    }
}

module.exports={checkUser}