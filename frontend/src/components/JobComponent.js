import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
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
                      <h5 className="card-title">{job.jobTitle}</h5>
                      <p className="card-text">{job.jobDesc}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-muted">{job.jobLocation}</small>
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
}

export default JobComponent;
