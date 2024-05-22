const express=require("express");
const app = express();
const JobController=require("../controllers/JobController.controller")
const JobRoute=express.Router()
app.use(express.json());
JobRoute.get("/hr",JobController.getJobs)
JobRoute.delete("/hr/delete/:id",JobController.jobDelete)
JobRoute.get("/hr/jobEdit/:id",JobController.jobEditData)
JobRoute.put("/hr/jobEdit/:id",JobController.jobEditSave)
JobRoute.post("/hr/jobSave",JobController.jobSave)




    
