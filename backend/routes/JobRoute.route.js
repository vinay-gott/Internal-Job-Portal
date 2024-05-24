const express=require("express");
const JobRoute=express.Router()

//const JobModel=require("../models/JobModel.model")
var jr=require("../controllers/JobController.controller")

JobRoute.get("/home",jr.getHomeJobs)


module.exports=JobRoute




    
