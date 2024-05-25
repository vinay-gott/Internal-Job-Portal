const express=require("express");
const DiscussionRoute=express.Router()


//const JobModel=require("../models/JobModel.model")
// var jr=require("../controllers/JobController.controller")
const comment=require("../controllers/DiscussionController.controller")


DiscussionRoute.post("/addComment/",comment.createComment)
DiscussionRoute.get("/comments/:id",comment.getComments)



module.exports=DiscussionRoute




    
