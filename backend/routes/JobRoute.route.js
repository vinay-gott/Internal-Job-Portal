const express=require("express");
const JobRoute=express.Router()
JobRoute.use(express.json())
JobRoute.use(express.urlencoded({ extended: true }));

//const JobModel=require("../models/JobModel.model")
var jr=require("../controllers/JobController.controller")

JobRoute.get("/home",jr.getHomeJobs)
JobRoute.get("/hr",jr.getJobs)
JobRoute.delete("/hr/delete/:id",jr.jobDelete)
JobRoute.get("/hr/jobEdit/:id",jr.jobEditData)
JobRoute.put("/hr/jobEdit/:id",jr.jobEditSave)
JobRoute.post("/hr/addJob",jr.jobSave)



module.exports=JobRoute




    
