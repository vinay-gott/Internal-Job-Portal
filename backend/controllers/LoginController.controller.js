const express=require("express")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const LoginModel=require("../models/LoginModel.model")

async function checkUser(req,res){

    const {employeeId,password}=req.data;
    
    if(!employeeId||!password){
        res.status(404).send({message:"Pleas enter details"})
    }
    else{
    const emp=await LoginModel.find({employeeId:employeeId})
    
    if(!emp)
        res.status(404).send({message:"Employee does not exist"})
    else if(emp.password!=password)
        res.status(404).send({message :"Password is incorrect"})
    
    res.status(200).send("true");
    }
}

module.exports={checkUser}