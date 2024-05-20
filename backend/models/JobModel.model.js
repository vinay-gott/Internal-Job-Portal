const mongoose=require("mongoose")


const JobSchema=mongoose.schema({
    jobTitle:{type:String},
    jobLocation:{type:String},
    jobType:{type:String},
    jobDesc:{type:String},
    salary:{type:String}

})

const JobModel=mongoose.model("JobModel",JobSchema)

module.exports=JobModel