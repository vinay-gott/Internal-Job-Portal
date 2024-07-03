import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarComponent from './NavBarComponent';
import HeaderComponent from './HeaderComponent';

const JobComponent = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3128/job/home');
        console.log('Fetched jobs:', response.data); // Log fetched data
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    console.log('Jobs state updated:', jobs); // Log state updates
  }, [jobs]);

  return (
    <main>
      <HeaderComponent/>
      <section className="py-2 text-center container">
        <div className="row py-lg-2">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Available Jobs</h1>
            <p className="lead text-muted">Browse through the available job opportunities below.</p>
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
                      <h5 className="card-title"><b>{job.jobTitle}</b></h5>
                      <p className="card-text">{job.jobDesc}</p>
                      <p className="card-text"><b>Job Type :</b> {job.jobType}</p>
                      <p className="card-text"><b>Salary : </b>{job.salary}</p>
                      <p className="card-text"><b>Location : </b>{job.jobLocation}</p>
                      
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
}

export default JobComponent;
