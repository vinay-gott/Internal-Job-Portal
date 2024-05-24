const express=require("express")
const LoginRouter=express.Router()
//const LoginModel=require("../models/LoginModel.model")

const LoginController=require("../controllers/LoginController.controller")

LoginRouter.post("/",LoginController.checkUser)

module.exports=LoginRouter