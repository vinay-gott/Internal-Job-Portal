const express=require("express");
const JobRoute=express.Router()


//const JobModel=require("../models/JobModel.model")
var jr=require("../controllers/JobController.controller")
const comment=require("../controllers/DiscussionController.controller")


JobRoute.get("/home",jr.getHomeJobs)
JobRoute.get("/home/:id",jr.jobEditData)
JobRoute.post("/apply",jr.applyForJob)
JobRoute.put("/edit/:jobId",jr.updateJob)
JobRoute.get('/applied/:empId', jr.getAppliedJobs);

JobRoute.post("/add",jr.addJob);
JobRoute.delete('/delete/:jobId', jr.deleteJob);
JobRoute.get('/details',jr.getEmpHR)

module.exports=JobRoute




    
