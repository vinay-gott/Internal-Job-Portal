const mongoose=require("mongoose")


const JobSchema=mongoose.Schema({

    _jobId:{type:Number,
        required:true
    },
    jobTitle:{type:String},
    jobLocation:{type:String},
    jobType:{type:String},
    jobDesc:{type:String},
    salary:{type:String}

})

const JobModel=mongoose.model("jobModel",JobSchema)

module.exports=JobModel