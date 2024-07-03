const mongoose=require("mongoose")
const JobModel=require("../models/JobModel.model")
const DiscussionController=require("./DiscussionController.controller")
const DiscussionModel = require("../models/DiscussionModel.model")
const AppliedJobModel = require("../models/AppliedJobModel.model"); // Import AppliedJobModel
const EmployeeModel = require("../models/EmployeeModel.model")

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
      jobId:jobId,
      empId:empId,
      appliedDate: new Date(),
    });
    await appliedJob.save();
    res.status(200).send({ message: 'Applied for job successfully' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).send({ message: 'Internal server error' });
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
  const getAppliedJobs = async (req, res) => {
    try {
      const { empId } = req.params;
  
      console.log(`Fetching applied jobs for empId: ${empId}`);
  
      // Find applied jobs for the given employee ID
      const appliedJobs = await AppliedJobModel.find({ empId });
      if (appliedJobs.length === 0) {
        return res.status(404).send({ message: 'No applied jobs found' });
      }
  
      console.log('Applied jobs:', appliedJobs);
  
      // Extract jobIds from appliedJobs
      const jobIds = appliedJobs.map(job => job.jobId);
  
      // Use aggregation pipeline to fetch job details
      const jobs = await JobModel.aggregate([
        { 
          $match: { 
            jobId: { $in: jobIds } // Match documents where jobId is in the jobIds array
          }
        }
      ]);
  
      console.log('Fetched jobs:', jobs);
  
      if (jobs.length === 0) {
        return res.status(404).send({ message: 'No job details found for applied jobs' });
      }
  
      // Send job details to the frontend
      res.status(200).send(jobs);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };
const addJob = async (req, res) => {
  try {
    console.log("reached 1");
    const job = await JobModel.create(req.body);
    console.log("reached 2");
    res.status(201).json(job);
    console.log("reached 3");
  } catch (error) {
    console.error('Error adding job:', error); // Log the error
    res.status(400).json({ message: error.message });
  }
};


// Edit a job
const editJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const updatedJob = await JobModel.findByIdAndUpdate(jobId, req.body, { new: true });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    console.log("reached 1");
    console.log("jobId: ", jobId);

    const deletedJob = await JobModel.findOneAndDelete({ jobId: jobId });
    console.log("reached 2");

    if (!deletedJob) {
      console.log("Job not found");
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log("reached 3");
    res.status(200).json({ message: 'Job deleted successfully', deletedJob });
    console.log("reached 4");
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(400).json({ message: error.message });
  }
};
async function getEmpHR(req,res){
  try {
    console.log("reached 1")
    const employees = await EmployeeModel.find({ role: { $in: ['hr', 'employee'] } });
    console.log("reached 2")

    res.status(200).json(employees);
    console.log("reached 3")

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function viewEmp(req, res){
  const { jobId } = req.params;
  try {
    console.log("reached 1");
    const applications = await AppliedJobModel.find({ jobId });
    console.log("reached 2");
    console.log("applications: ",applications)
    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found for this job' });
    }
    console.log("reached 3");

    const empIds = applications.map(app => app.empId);
    console.log("reached 4");
    console.log("empid: ",empIds)


    const employees = await EmployeeModel.find({ empId: { $in: empIds } });
    console.log("reached 5");
    console.log("emp: ",employees)



    res.status(200).json(employees);
    console.log("reached 6");

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports={getJobs,getHomeJobs,jobEditData,jobEditSave,jobSave,jobDelete,applyForJob,updateJob,getAppliedJobs,addJob,deleteJob,editJob,getEmpHR,viewEmp}