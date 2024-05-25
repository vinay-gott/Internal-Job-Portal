const mongoose=require("mongoose")
const EmployeeModel=require("../models/EmployeeModel.model")

async function getAllHR(req,res){
    const emp=await EmployeeModel.find({role:"hr"});
    if(!emp){
       return res.status(404).send({message:"Error finding HR"})
    }
    else
        res.status(200).send(emp)

}


async function updateHR(req,res){
    //const e=await EmployeeModel.find({empId:req.body.empId})
    const id=req.params.id;
    if(id!=req.body.empId && req.body.role!="hr")
        return res.send({message:"Details mis-match"})
    const emp=EmployeeModel.findOne({empId:id})
    console.log(emp)
    if(!emp){
        return res.status(404).send({message:"HR with this id does not exist"})
    }
    else{
        const edit=await EmployeeModel.replaceOne({empId:id},req.body);
        console.log(edit)
        res.status(200).send("Updated Succesfully")
    }
}

async function addHR(req,res){
    const {email,password,empId,mobileNumber,department,role} = req.body;

    if (!email || !password || !mobileNumber||!empId||!department||!role) {
        return res.status(400).send({ message: 'Please fill all the fields' });
    }
    if(role!="hr")
        return res.status(404).send({message:"Please add HR roles only"})
    try{
    const id=req.body.empId
    const emp=await EmployeeModel.findOne({empId:id})
    if(emp){
        return res.status(404).send({message:"HR with this id already exists"})
    }
    else{
        const emps=new EmployeeModel({email,password,empId,mobileNumber,department,role});
        emps.save();
        res.status(200).send("New HR added");
    }
}
catch(err){
    console.log({message:err})
}
}

async function deleteHR(req,res){
    const emp=await EmployeeModel.findOne({empId:req.params.id})
    if(!emp && emp.role!="hr"){
        return res.status(404).send('HR not found');
    }
    else{
        const j=await EmployeeModel.deleteOne({empId:req.params.id});
        console.log(j)
        res.status(200).send("HR deleted successfully")
    }
}

module.exports={getAllHR,updateHR,addHR,deleteHR};