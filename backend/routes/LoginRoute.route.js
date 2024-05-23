const express=require("express")
//const app=express()
const LoginRouter=express.Router()
LoginRouter.use(express.json())
//const LoginModel=require("../models/LoginModel.model")

const LoginController=require("../controllers/LoginController.controller")

LoginRouter.post("/login",LoginController.checkUser)

module.exports=LoginRouter