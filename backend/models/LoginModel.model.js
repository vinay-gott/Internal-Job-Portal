const mongoose=require('mongoose');
const LoginSchema =mongoose.Schema({
    empId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    }
})

const LoginModel=mongoose.model("login",LoginSchema)
module.exports=LoginModel

