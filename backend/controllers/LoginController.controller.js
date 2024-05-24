const express=require("express")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const LoginModel=require("../models/LoginModel.model")

async function checkUser(req,res){

    const {empId,password}=req.data;
    
    if(!empId||!password){
        res.status(404).send({message:"Pleas enter details"})
    }
    else{
    const emp=await LoginModel.findOne({employeeId:empId})
    
    if(!emp)
        res.status(404).send({message:"Employee does not exist"})
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