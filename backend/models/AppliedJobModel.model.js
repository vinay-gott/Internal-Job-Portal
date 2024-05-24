const mongoose = require('mongoose')


const AppliedJobSchema=mongoose.Schema({
    _jobId:{type:Number},
    empId:{type:String},
    appliedDate:{type:Date}

})

const AppliedJobModel=mongoose.model("appliedJob",AppliedJobSchema)

module.exports=AppliedJobModel