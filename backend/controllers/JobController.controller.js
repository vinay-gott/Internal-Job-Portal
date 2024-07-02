const mongoose=require("mongoose")
const JobModel=require("../models/JobModel.model")
const DiscussionController=require("./DiscussionController.controller")
const DiscussionModel = require("../models/DiscussionModel.model")
const AppliedJobModel = require("../models/AppliedJobModel.model"); // Import AppliedJobModel

const getJobs=async (req,res)=>{

    const jobs=await JobModel.find({})
    if(!jobs){
        return res.status(404).send({message:"Error finding jobs data"})
    }
    else
        res.status(200).send(jobs);
}


//to be added in controller
async function getHomeJobs(req,res){

    const jobs=await JobModel.find({})
    if(!jobs){
        return res.status(404).send({message:"Error finding jobs data"})
    }
    else
        res.status(200).send(jobs);
}

async function jobEditData(req,res){
    const id=req.params.id;
    const job=await JobModel.findOne({_jobId:id});
    const comment= await DiscussionModel.find({ _jobId: id });
    
    if(!job)
        return res.status(404) .send({message:"Error finding job"})
   
    else{
        const comm = await DiscussionModel.findOne({ _jobId: req.params.id });
        let j={}
        if(!comm){
             j={"job":job,"comment":'No comments found'}
          // return res.status(404).send({ message:  });
           
          }
          else
          j={"job":job,"comment":comm}
        //res.status(200).send(job)
        
    // res.render('job-edit', {
    //      job,
    //     comment,
    //     // message: req.flash('success'),
    //     // error: req.flash('error')
    //   });
    res.status(200).send(j)
    }
}

async function jobEditSave(req,res){
    const id=req.params.id;
    if(id!=req.body._jobId)
        return res.send({message:"ID mis-match"})
    const job=await JobModel.findOne({_jobId:id})
    if(!job){
        return res.status(404).send({message:"Job with this id does not exist"})
    }
    else{
        const edit=await JobModel.replaceOne({_jobId:id},req.body);
        console.log(edit)
        res.status(200).send("Updated Succesfully")
    }
}

async function jobSave(req,res){
    // const id=req.body._jobId
    // console.log(req.body._jobId)

    const j=await JobModel.findOne({_jobId:req.body._jobId})
    
    //console.log(j)
    if(j){
        return res.status(404).send({message :"Job with this id already exists"})
    }
    else {
        const job=new JobModel(req.body)
        await job.save();
        res.status(200).send(job)

    }
}
async function jobDelete(req,res){
    //const j=await JobModel.find({})
    const job=await JobModel.findOne({_jobId:req.params.id})
  
    if(!job){
        return res.status(404).send('Job not found');
    }
    else{
        const j=await JobModel.deleteOne({_jobId:req.params.id});
        const comment= await DiscussionModel.findOne({ _jobId:req.params.id });
        if(comment){
            await DiscussionModel.deleteMany({ _jobId:req.params.id });
        }
        console.log(j)
        res.status(200).send("Job deleted successfully")
    }
}
async function applyForJob(req, res) {
    try {
      const { jobId, empId } = req.body;
      const appliedJob = new AppliedJobModel({
        _jobId: jobId,
        empId: empId,
        appliedDate: new Date(),
      });
      await appliedJob.save();
      res.status(200).send({ message: "Applied for job successfully" });
    } catch (error) {
      console.error("Error applying for job:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }

  // Example backend controller function
async function updateJob(req, res) {
    const { jobId } = req.params;
    const { jobTitle, jobLocation, jobType, jobDesc, salary } = req.body;
  
    try {
      const job = await JobModel.findOneAndUpdate(
        { _id: jobId },
        { jobTitle, jobLocation, jobType, jobDesc, salary },
        { new: true }
      );
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      res.status(200).json(job);
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

module.exports={getJobs,getHomeJobs,jobEditData,jobEditSave,jobSave,jobDelete,applyForJob,updateJob}