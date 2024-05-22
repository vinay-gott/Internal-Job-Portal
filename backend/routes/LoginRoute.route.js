const express=require("express")
const app=express()
const LoginRouter=express.Router()
const LoginController=require("../controllers/LoginController.controller")

LoginRouter.post("/login",LoginController.checkUser)