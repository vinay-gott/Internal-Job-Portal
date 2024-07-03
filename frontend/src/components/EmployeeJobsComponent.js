

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from './NavBarComponent';


const EmployeeJobsComponent = ({ empId }) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3128/job/home');
        console.log('Fetched jobs:', response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    console.log('Jobs state updated:', jobs);
  }, [jobs]);

  const applyForJob = async (jobId) => {
    try {
      const response = await axios.post('http://localhost:3128/job/apply', { jobId, empId });
      console.log('Applied for job:', response.data);
      alert('Applied successfully!');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to apply for job');
    }
  };

  return (
    <main>
            <NavbarComponent userRole={'employee'}/>

      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Available Jobs</h1>
            <p className="lead text-muted">Browse through the available job opportunities below.</p>
            <button className="btn btn-primary" onClick={() => navigate('/applied-jobs', { state: { empId } })}>
              View Applied Jobs
            </button>
          </div>
        </div>
      </section>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div className="col" key={job._id}>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{job.jobTitle}</h5>
                      <p className="card-text">{job.jobDesc}</p>
                      <p className="card-text">Location : {job.jobLocation}</p>
                      <p className="card-text">Salary : {job.salary}</p>
                      <p className="card-text">Job Type : {job.jobType}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => applyForJob(job.jobId)}>Apply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="lead text-muted">No jobs available</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmployeeJobsComponent;
