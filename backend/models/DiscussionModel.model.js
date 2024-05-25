const mongoose=require('mongoose');
const DiscussionSchema =mongoose.Schema({
    
    empId:{
        type:String,
        required:true
    },
    _jobId:{
        type:Number,
        required:true
    },
    comment: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }

})

const DiscussionModel=mongoose.model("commentSection",DiscussionSchema)
module.exports=DiscussionModel