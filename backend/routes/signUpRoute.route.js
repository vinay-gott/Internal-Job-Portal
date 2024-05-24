const express=require('express')
const signupRoute=express.Router()

signupRoute.use(express.json())
signupRoute.use(express.urlencoded({ extended: true }))

//const EmployeeModel=require('../models/EmployeeModel.model')
const emp=require('../controllers/EmployeeController.controller')


signupRoute.post('/',emp.saveEmployee)
module.exports=signupRoute