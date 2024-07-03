const mongoose=require("mongoose")

const jwt=require("jsonwebtoken")

const EmployeeModel=require("../models/EmployeeModel.model")

async function getEmployee(req,res){
    const emp=await EmployeeModel.find({role:"employee"});
    if(!emp){
        return res.status(404).send({message:"Error finding employees"})
    }
    else
        res.status(200).send(emp)

}


async function getEmployeeById(req,res){
    const emp=await EmployeeModel.findOne({empId:req.params.id,role:"employee"})
    if(!emp){
        return res.status(404).send({message:"Error finding employees"})
    }
    else
        res.status(200).send(emp)

}

async function editEmployee(req,res){
    //const e=await EmployeeModel.find({empId:req.body.empId})
    const id=req.params.id;
    if(id!=req.body.empId)
        return res.send({message:"ID mis-match"})

    const emp=await EmployeeModel.findOne({empId:id})
    console.log(emp)
    if(emp.role!="employee")
        return res.status(400).json({message :"You can only edit employee"})
    else if(!emp){
       return  res.status(404).send({message:"Job with this id does not exist"})
    }
    else{
        const edit=await EmployeeModel.replaceOne({empId:id},req.body);
        console.log(edit)
        res.status(200).send("Updated Succesfully")
    }
}

async function saveEmployee(req,res){
    const {email,password,empId,mobileNumber,department,role} = req.body;

    if (!email || !password || !mobileNumber||!empId||!department||!role) {
        return res.status(400).send({ message: 'Please fill all the fields' });
    }
    else if(role!="employee")
        return res.status(400).json({message :"You can only add employee"})
    try{
    const id=req.body.empId
    const emp=await EmployeeModel.findOne({empId:id})
    if(emp){
        return res.status(404).send({message:"Employee with this id already exists"})
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

async function deleteEmployee(req,res){
    const emp=await EmployeeModel.findOne({empId:req.params.id})
    if(!emp){
       return  res.status(404).send('Employee not found');
    }
    else if(emp.role!="employee")
        return res.status(400).json({message :"You can only delete employee"})
    else{
        const j=await EmployeeModel.deleteOne({empId:req.params.id});
        console.log(j)
        res.status(200).send("Emplopyee deleted successfully")
    }
}


module.exports={getEmployee,getEmployeeById,editEmployee,saveEmployee,deleteEmployee};