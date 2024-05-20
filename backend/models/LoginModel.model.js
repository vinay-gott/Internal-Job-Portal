const mongoose=require('mongoose');
const LoginSchema =mongoose.Schema({
    empid:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const LoginModel=mongoose("login",LoginSchema)
module.exports=LoginModel
