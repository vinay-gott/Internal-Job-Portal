const DiscussionModel = require('../models/DiscussionModel.model');
const JobModel=require('../models/JobModel.model')

async function createComment(req, res) {
  try {
    const job=JobModel.findOne({_jodId: req.body._jobId})
    if(!job){
      return res.status(404).json({message: 'Job not found'})
    }
    else{
    const comment = new DiscussionModel({
      _jobId: req.body._jobId,
      empId: req.body.empId,
      comment: req.body.comment,
      createdAt:new Date()
    });
    console.log(comment)
    
    await comment.save();
    console.log(1)
    res.status(200).send({ message: 'Comment created successfully' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error creating comment' });
  }
}

async function getComments(req, res) {
    try {
      const comm = await DiscussionModel.findOne({ _jobId: req.params.id });
      if(!comm){
        console.log("1");
       return res.status(404).send({ message: 'No comments found' });
       
      }
      else{
        const comment = await DiscussionModel.find({ _jobId: req.params.id });
        console.log("2");
        return res.status(200).send(comment);
    
      }
    } catch (err) {
      res.status(500).send({ message: 'Error fetching comments' });
    }
  }



// async function deleteComment(req, res) {
//   try {
//     const comment=await DiscussionModel.findOne({_jobId:req.params.id})
  
//     if(!comment){
//         return res.status(404).send('comment not found');
//     }
//     else{
//         const c=await DiscussionModel.delete({_jobId:req.params.id});
//     if (!c) {
//       res.status(404).send({ message: 'Comment not found' });
//     } else {
//       res.status(200).send({ message: 'Comment deleted successfully' });
//     }
//   } catch (err) {
//     res.status(500).send({ message: 'Error deleting comment' });
//   }
// }

module.exports = {createComment,getComments};