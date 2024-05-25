const express=require("express");
const JobRoute=express.Router()


//const JobModel=require("../models/JobModel.model")
var jr=require("../controllers/JobController.controller")
const comment=require("../controllers/DiscussionController.controller")


JobRoute.get("/home",jr.getHomeJobs)
JobRoute.get("/home/:id",jr.jobEditData)

module.exports=JobRoute




    
