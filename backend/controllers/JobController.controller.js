
const JobModel=require("../models/JobModel.model")

async function getJobs(req,res){

    const jobs=await JobModel.find({})
    if(!jobs){
        res.status(404).send({message:"Error finding jobs data"})
    }
    res.status(200).send(jobs);
}
async function getHomeJobs(req,res){

    const jobs=await JobModel.find({})
    if(!jobs){
        res.status(404).send({message:"Error finding jobs data"})
    }
    res.status(200).send(jobs);
}

async function jobEditData(req,res){
    const id=req.params.id;
    const job=await JobModel.findById(id);
    if(!job)
        res.status(404) .send({message:"Error finding job"})
    res.status(200).send(job)
}

async function jobEditSave(req,res){
    const id=req.params.id;
    const job=await JobModel.findByIdAndUpdate(id,req.body);
    res.status(200).send(job)
}

async function jobSave(req,res){
    const job=new JobModel(req.body)
    await JobModel.push(req.body);
    res.status(200).send(job)
}

async function jobDelete(req,res){
    const job=await JobModel.findByIdAndDelete(req.params.id);
    if(!job){
        res.status(404).send('Invalid employee id');
    }
    res.status(200).send("Job deleted successfully")
}


module.exports={getJobs,getHomeJobs,jobEditData,jobEditSave,jobSave,jobDelete}