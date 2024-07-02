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
    role:{
        type:String,
        required:true,
        default:'employee',
    enum:['employee','admin','hr'],
    }
})

const EmployeeModel=mongoose.model("employee",EmployeeSchema)
module.exports=EmployeeModel