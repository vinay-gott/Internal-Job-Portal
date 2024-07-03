

// export default AppliedJobsComponent;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AppliedJobsComponent = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const location = useLocation();
  const { empId } = location.state;

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3128/job/applied/${empId}`);
        console.log('Fetched applied jobs:', response.data);
        setAppliedJobs(response.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };
    fetchAppliedJobs();
  }, [empId]);

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Applied Jobs</h1>
            <p className="lead text-muted">Here are the jobs you have applied for.</p>
          </div>
        </div>
      </section>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {appliedJobs.length > 0 ? (
              appliedJobs.map((job) => (
                <div className="col" key={job.jobId}>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{job.jobTitle}</h5>
                      <p className="card-text">{job.jobDesc}</p>
                      <p className="card-text">Location: {job.jobLocation}</p>
                      <p className="card-text">Salary: {job.salary}</p>
                      <p className="card-text">Job Type: {job.jobType}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="lead text-muted">You have not applied for any jobs</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppliedJobsComponent;

