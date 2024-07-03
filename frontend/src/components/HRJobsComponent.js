
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobEditModal from './JobEditModal'; // Import the JobEditModal

const HRJobsComponent = () => {
  const [jobs, setJobs] = useState([]);
  const [editJobId, setEditJobId] = useState(null);

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

  const handleEdit = (jobId) => {
    setEditJobId(jobId); // Set the jobId to edit
  };

  const handleCloseEdit = () => {
    setEditJobId(null); // Close the edit mode
    fetchJobs(); // Fetch jobs again to update the list after editing
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3128/job/home');
      console.log('Fetched jobs:', response.data);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

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
                      <p className="card-text">Location : {job.jobLocation}</p>
                      <p className="card-text">Salary : {job.salary}</p>
                      <p className="card-text">Job Type : {job.jobType}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleEdit(job._id)}>Edit</button>
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

      {/* Render JobEditModal if editJobId is set */}
      {editJobId && (
        <JobEditModal
          jobId={editJobId}
          initialFormData={{ jobTitle: '', jobLocation: '', jobType: '', jobDesc: '', salary: '' }}
          onClose={handleCloseEdit}
        />
      )}
    </main>
  );
};

export default HRJobsComponent;
