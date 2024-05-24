const mongoose=require('mongoose');
const LoginSchema =mongoose.Schema({
    empId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LoginModel=mongoose.model("login",LoginSchema)
module.exports=LoginModel
