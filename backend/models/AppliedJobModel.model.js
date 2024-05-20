const mongoose=require("mongoose")


const AppliedJobSchema=mongoose.schema({
    jobId:{type:String},
    employeeId:{type:String},
    appliedDate:{type:Date},

})

const AppliedJobModel=mongoose.model("AppliedJobModel",AppliedJobSchema)

module.exports=AppliedJobModel