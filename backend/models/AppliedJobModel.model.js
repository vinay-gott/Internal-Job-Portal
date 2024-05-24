const mongoose = require('mongoose')


const AppliedJobSchema=mongoose.Schema({
    _jobId:{type:Number},
    empId:{type:String},
    appliedDate:{type:Date}

})

const AppliedJobModel=mongoose.model("AppliedJobModel",AppliedJobSchema)

module.exports=AppliedJobModel