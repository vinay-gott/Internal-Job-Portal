// const mongoose = require('mongoose')


// const AppliedJobSchema=mongoose.Schema({
//     _jobId:{type:String},
//     empId:{type:String},
//     appliedDate:{type:Date}

// })

// const AppliedJobModel=mongoose.model("appliedJob",AppliedJobSchema)

// module.exports=AppliedJobModel

const mongoose = require('mongoose');

const AppliedJobSchema = mongoose.Schema({
  jobId: { type: String, required: true },
  empId: { type: String, required: true },
  appliedDate: { type: Date, default: Date.now },
  status: { type: String, default: "pending",
    enum:['pending','reject','approve']
   }
});

const AppliedJobModel = mongoose.model('appliedJob', AppliedJobSchema);

module.exports = AppliedJobModel;
