
const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  jobId: { type: String, required: true },
  jobTitle: { type: String },
  jobLocation: { type: String },
  jobType: { type: String },
  jobDesc: { type: String },
  salary: { type: String },
});

const JobModel = mongoose.model('jobModel', JobSchema);

module.exports = JobModel;
