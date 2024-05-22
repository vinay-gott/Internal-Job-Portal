const AppliedJobModel=require('../models/AppliedJobModel.model')

async function showJobs(req,res){
    const jobs=await AppliedJobModel.find({});
    res.status(200).send(jobs);
}



module.exports={showJobs};
