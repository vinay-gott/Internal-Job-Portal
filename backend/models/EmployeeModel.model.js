const mongoose=require('mongoose');
const EmployeeSchema =mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    empId:{
        type:String,
        required:true
    },
    mobileNumber:{type:String},
    department:{type:Boolean},
    role:{
        type:String,
        required:true
    }
})

const EmployeeModel=mongoose.model("employee",EmployeeSchema)
module.exports=EmployeeModel