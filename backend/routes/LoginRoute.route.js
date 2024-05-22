const express=require("express")
const app=express()
app.use(express.json());
const LoginRouter=express.Router()
const LoginController=require("../controllers/LoginController.controller")

LoginRouter.post("/login",LoginController.checkUser)