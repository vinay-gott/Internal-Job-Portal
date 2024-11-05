const JobModel=require("../models/JobModel.model")
const AppliedJobModel = require("../models/AppliedJobModel.model");
const EmployeeModel = require("../models/EmployeeModel.model")

async function getHomeJobs(req,res){

    const jobs=await JobModel.find({})
    if(!jobs){
        return res.status(404).send({message:"Error finding jobs data"})
    }
    else
        res.status(200).send(jobs);
}

async function applyForJob(req, res) {
  try {
    const { jobId, empId } = req.body;
    const appliedJob = new AppliedJobModel({
      jobId:jobId,
      empId:empId,
      appliedDate: new Date(),
    });
    console.log("\n\n\n empid(frontend): ",empId)
    console.log("jobid:",jobId)
    await appliedJob.save();
    res.status(200).send({ message: 'Applied for job successfully' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
}



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
      const appliedJobs = await AppliedJobModel.find({ empId });
      if (appliedJobs.length === 0) {
        return res.status(404).send({ message: 'No applied jobs found' });
      }
      const jobIds = appliedJobs.map(job => job.jobId);
  
      const jobs = await JobModel.aggregate([
        { 
          $match: { 
            jobId: { $in: jobIds } 
          }
        },
        {
          $lookup: {
            from: 'appliedjobs', 
            localField: 'jobId',
            foreignField: 'jobId',
            as: 'appliedJobs'
          }
        },
        {
          $unwind: '$appliedJobs'
        },
        {
          $match: {
            'appliedJobs.empId': empId 
          }
        },
        {
          $addFields: {
            status: '$appliedJobs.status' 
          }
        },
        {
          $project: {
            appliedJobs: 0 
          }
        }
      ]);
  
      if (jobs.length === 0) {
        return res.status(404).send({ message: 'No job details found for applied jobs' });
      }
  
      res.status(200).send(jobs);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };
  
  
const addJob = async (req, res) => {
  try {
    const job = await JobModel.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    console.error('Error adding job:', error); 
    res.status(400).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    console.log("jobId: ", jobId);
    const deletedJob = await JobModel.findOneAndDelete({ jobId: jobId });
    if (!deletedJob) {
      console.log("Job not found");
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully', deletedJob });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(400).json({ message: error.message });
  }
};
async function getEmpHR(req,res){
  try {
    const employees = await EmployeeModel.find({ role: { $in: ['hr', 'employee'] } });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function viewEmp(req, res) {
  const { jobId } = req.params;
  try {
    const applications = await AppliedJobModel.find({ jobId });
    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found for this job' });
    }

    const empIds = applications.map(app => app.empId);
    const employees = await EmployeeModel.find({ empId: { $in: empIds } });

    const statusMap = applications.reduce((map, app) => {
      map[app.empId] = app.status;
      return map;
    }, {});

    const employeeDetailsWithStatus = employees.map(employee => ({
      empId: employee.empId,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      status: statusMap[employee.empId]
    }));

    res.status(200).json(employeeDetailsWithStatus);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const approveJobApplication = async (req, res) => {
  try {
    const { jobId, empId } = req.body;

    const appliedJob = await AppliedJobModel.findOneAndUpdate(
      { jobId, empId },
      { $set: { status: 'approve' } },
      { new: true }
    );
    if (!appliedJob) {
      return res.status(404).json({ message: 'Applied job not found' });
    }
    res.status(200).json({ message: 'Job application approved successfully' });
  } catch (error) {
    console.error('Error approving job application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const rejectJobApplication = async (req, res) => {
  try {
    const { jobId, empId } = req.body;

    const appliedJob = await AppliedJobModel.findOneAndUpdate(
      { jobId, empId },
      { $set: { status: 'reject' } },
      { new: true }
    );

    if (!appliedJob) {
      return res.status(404).json({ message: 'Applied job not found' });
    }

    res.status(200).json({ message: 'Job application rejected successfully' });
  } catch (error) {
    console.error('Error rejecting job application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports={getHomeJobs,applyForJob,updateJob,getAppliedJobs,addJob,deleteJob,getEmpHR,viewEmp,rejectJobApplication,approveJobApplication}