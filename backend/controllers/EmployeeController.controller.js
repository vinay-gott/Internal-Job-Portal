
const EmployeeModel=require("../models/EmployeeModel.model")


async function getEmployeeById(req,res){
    const emp=await EmployeeModel.findById(req.params.id)


    res.status(200).send(emp)

}

module.exports={getEmployeeById}