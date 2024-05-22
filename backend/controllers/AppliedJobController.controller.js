const AppliedJobModel=reqiure('../models/AppliedJobModel.js')

async function showJobs(req,res){
    const jobs=await AppliedJobModel.find({});
    res.status(200).send(jobs);
}



module.exports={showJobs};
