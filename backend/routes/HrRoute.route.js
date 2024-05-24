const express=require("express");
const HrRoute=express.Router()
HrRoute.use(express.json())
HrRoute.use(express.urlencoded({ extended: true }));

//const JobModel=require("../models/JobModel.model")
var jr=require("../controllers/JobController.controller")
const emp=require('../controllers/EmployeeController.controller');
const appliedJobs=require('../controllers/AppliedJobController.controller')

const isHR = require("../middleware/isHR.middleware");
const auth = require("../middleware/auth.middleware");

HrRoute.use(auth)
HrRoute.use(isHR)

//Jobs
HrRoute.get("/jobs",jr.getJobs)
HrRoute.delete("/jobDelete/:id",jr.jobDelete)
HrRoute.get("/jobEdit/:id",jr.jobEditData)
HrRoute.put("/jobEdit/:id",jr.jobEditSave)
HrRoute.post("/addJob",jr.jobSave)
HrRoute.get("/allAppliedJobs",appliedJobs.allAppliedJobs)

//Employees
HrRoute.get('/allEmployees',emp.getEmployee)
HrRoute.get('/emp/:id',emp.getEmployeeById)
HrRoute.put('/empEdit/:id',emp.editEmployee)
HrRoute.post('/empSave/',emp.saveEmployee)
HrRoute.delete('/empDelete/:id',emp.deleteEmployee)

module.exports=HrRoute




    
