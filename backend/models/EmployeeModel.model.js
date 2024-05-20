const mongoose=require('mongoose');
const EmployeeSchema =mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    empId:{
        type:String,
        require:true
    },
    mobileNumber:String,
    department:boolean,
    role:{
        type:String,
        require:true
    }
})

const EmployeeModel=mongoose("employee",EmployeeSchema)
module.exports=EmployeeModel