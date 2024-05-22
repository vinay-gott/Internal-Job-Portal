
const EmployeeModel=require("../models/EmployeeModel.model")

async function getEmployee(req,res){
    const emp=await EmployeeModel.find({});
    res.status(200).send(emp)

}


async function getEmployeeById(req,res){
    const emp=await EmployeeModel.findById(req.params.id)


    res.status(200).send(emp)

}

async function editEmployee(req,res){
    const emp=await EmployeeModel.findByIdAndUpdate(req.body.id,req.body);
    res.status(200).send(emp)

}

async function saveEmployee(req,res){
    const emp=new EmployeeModel(req.body);
    EmployeeModel.push(emp);
    res.status(200).send("New Employee added");
}

async function deleteEmployee(req,res){
    const emp=await EmployeeModel.findByIdAndDelete(req.params.id);
    if(!emp){
        res.status(404).send('Invalid employee id');
    }
    res.status(200).send("Employee deleted successfully")
}
module.exports={getEmployee,getEmployeeById,editEmployee,saveEmployee,deleteEmployee};