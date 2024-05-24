const express=require('express')
const signupRoute=express.Router()

//const EmployeeModel=require('../models/EmployeeModel.model')
const emp=require('../controllers/signUpController.controller')


signupRoute.post('/',emp.saveEmployee)
module.exports=signupRoute