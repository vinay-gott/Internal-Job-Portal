const express=require("express");
const JobRoute=express.Router()
JobRoute.use(express.json())
JobRoute.use(express.urlencoded({ extended: true }));

//const JobModel=require("../models/JobModel.model")
var jr=require("../controllers/JobController.controller")

JobRoute.get("/home",jr.getHomeJobs)


module.exports=JobRoute




    
