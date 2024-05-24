const express=require("express")
const mongoose=require("mongoose")

const jwt=require("jsonwebtoken")







async function saveEmployee(req,res){
    const {email,password,empId,mobileNumber,department,role} = req.body;

    if (!email || !password || !mobileNumber||!empId||!department||!role) {
        return res.status(400).send({ message: 'Please fill all the fields' });
    }
    try{
    const id=req.body.empId
    const emp=await EmployeeModel.findOne({empId:id})
    if(emp){
        res.status(404).send({message:"Employee with this id already exists"})
    }
    else{
        const emps=new EmployeeModel({email,password,empId,mobileNumber,department,role});
        emps.save();
        res.status(200).send("New Employee added");
    }
}
catch(err){
    console.log({message:err})
}
}
