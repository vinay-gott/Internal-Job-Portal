import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobEditModal from './JobEditModal';
import JobAddModal from './JobAddModal';
import ViewApplicantsModal from './ViewApplicantsModal';
import NavbarComponent from './NavBarComponent';

const HRJobsComponent = () => {
  const [jobs, setJobs] = useState([]);
  const [editJobId, setEditJobId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobApplicants, setJobApplicants] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3128/job/home');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleEdit = (jobId) => {
    setEditJobId(jobId);
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:3128/job/delete/${jobId}`);
      fetchJobs(); // Update job list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleAddJob = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    fetchJobs(); // Update job list after adding new job
  };

  const handleViewApplicantions = (jobId) => {
    setSelectedJobId(jobId);
    fetchApplicants(jobId);
  };

  const fetchApplicants = async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:3128/job/view/${jobId}`);
      setJobApplicants(response.data);
    } catch (error) {
      console.error('Error fetching job applicants:', error);
    }
  };

  const handleApprove = async (jobId, empId) => {
    try {
      await axios.post('http://localhost:3128/job/approve', { jobId, empId });
      alert("approved");
      // After successful approval, refresh applicants and jobs
    await fetchApplicants(jobId);
    await fetchJobs();
    setSelectedJobId(null); // Close modal
      
    } catch (error) {
      console.error('Error approving job application:', error);
    }
  };

  const handleReject = async (jobId, empId) => {
    try {
      await axios.post('http://localhost:3128/job/reject', { jobId, empId });
      alert("rejected");
      await fetchApplicants(jobId);
    await fetchJobs();
    setSelectedJobId(null); // Close modal
      
    } catch (error) {
      console.error('Error rejecting job application:', error);
    }
  };

  return (
    <main>
      <NavbarComponent userRole={'hr'}/>
      <section className="py-2 text-center container">
        <div className="row py-lg-2">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Available Jobs Postings</h1>
            
            <p className="lead text-muted">
              Browse through the job postings below.
            </p>
            <button className="btn btn-primary mb-3" onClick={handleAddJob}>
              Add New Job
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
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleEdit(job._id)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger ms-2"
                            onClick={() => handleDelete(job.jobId)}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-info ms-2"
                            onClick={() => handleViewApplicantions(job.jobId)}
                          >
                            View Applicants
                          </button>
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

      {editJobId && (
        <JobEditModal
          jobId={editJobId}
          initialFormData={{
            jobTitle: '',
            jobLocation: '',
            jobType: '',
            jobDesc: '',
            salary: '',
          }}
          onClose={() => {
            setEditJobId(null);
            fetchJobs(); // Update job list after editing
          }}
        />
      )}

      {showAddModal && <JobAddModal onClose={handleCloseAddModal} />}

      {selectedJobId && (
        <ViewApplicantsModal
          jobId={selectedJobId}
          onClose={() => setSelectedJobId(null)}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      )}
    </main>
  );
};

export default HRJobsComponent;
