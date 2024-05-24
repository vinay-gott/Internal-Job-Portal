const AppliedJobModel=require('../models/AppliedJobModel.model')

async function showJobs(req,res){
    const id=req.params.id;
    const jobs=await AppliedJobModel.find({empId:id});
    if(!jobs)
        res.status(404).send({msg:"Error finding jobs"})
    else
        res.status(200).send(jobs);
}

async function allAppliedJobs(req,res){
    const jobs=await AppliedJobModel.find({});
    if(!jobs)
        res.status(404).send({msg:"Error finding applied jobs"})
    else
        res.status(200).send(jobs);
}


async function jobMapping(req,res){
    try{
            const appJobs=await AppliedJobModel.find({empId:req.body.empId})
            if(appJobs.length>=2)
                return res.status(400).send("You have reached max jobs limit")
            else{
            let appliedjob=new AppliedJobModel({
                    _jobId:req.body._jobId,
                    employeeId:req.body.employeeId,
                    appliedDate:new Date()
                });
            await appliedjob.save();
            res.status(200).send("Inserted the application")
            }

        }catch(err){
            console.log("There is a error in input details "+err)
        }
}

async function deleteMapping(req,res){
    try{
        const result=await AppliedJobModel.deleteOne({_jobId:req.body._jobId,empId:req.body.empId});
        if (result.deletedCount === 1) {
            res.status(200).json({message: 'Job mapping deleted successfully' });
            
          } else {
           res.status(404).json({ message: 'Job mapping not found' });
          }
        } catch (err) {
          res.satus(404).json({ message: 'Error deleting job mapping' });
        }
 }


module.exports={showJobs,allAppliedJobs,jobMapping,deleteMapping};
