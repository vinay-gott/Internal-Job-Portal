import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from './NavBarComponent';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom'; 

const EmployeeJobsComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { empId: contextEmpId, userRole: contextUserRole } = useContext(UserContext); 

  let empId = location.state?.empId || contextEmpId || localStorage.getItem('empId');
  let userRole = location.state?.userRole || contextUserRole || localStorage.getItem('userRole');

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filter, setFilter] = useState({
    title: '',
    location: '',
    type: '',
    salaryRange: '' 
  });

  useEffect(() => {
    if (!empId) {
      alert('Error: No employee ID provided. Please log in again.');
      navigate('/login'); 
    } else {
      localStorage.setItem('empId', empId);
      localStorage.setItem('userRole', userRole);
    }
  }, [empId, navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3128/job/home');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (empId) {
      const fetchAppliedJobs = async () => {
        try {
          const response = await axios.get(`http://localhost:3128/job/applied/${empId}`);
          setAppliedJobs(response.data);
        } catch (error) {
          console.error('Error fetching applied jobs:', error);
        }
      };
      fetchAppliedJobs();
    }
  }, [empId]);

  const applyForJob = async (jobId) => {
    const alreadyApplied = appliedJobs.some(appliedJob => appliedJob.jobId === jobId);

    if (alreadyApplied) {
      alert('You have already applied to this job earlier.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3128/job/apply', { jobId, empId });
      alert('Applied successfully!');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to apply for job');
    }
  };

  const clearFilters = () => {
    setFilter({
      title: '',
      location: '',
      type: '',
      salaryRange: ''
    });
  };

  const filteredJobs = jobs.filter(job => {
    const isTitleMatch = job.jobTitle.toLowerCase().includes(filter.title.toLowerCase());
    const isLocationMatch = job.jobLocation.toLowerCase().includes(filter.location.toLowerCase());
    const isTypeMatch = filter.type ? job.jobType.toLowerCase() === filter.type.toLowerCase() : true;

    let isSalaryMatch = true;
    if (filter.salaryRange) {
      const salary = parseFloat(job.salary.replace(/[^\d.-]/g, '')); 
      const [min, max] = filter.salaryRange.split('-').map(Number);
      isSalaryMatch = (salary >= min && (!max || salary < max));
    }

    return isTitleMatch && isLocationMatch && isTypeMatch && isSalaryMatch;
  });

  if (!empId) {
    return <div>Error: No employee ID provided.</div>;
  }

  return (
    <main>
      <NavbarComponent userRole={'employee'} />

      <div className="container py-5">
        <h1 className="fw-light text-center mb-4">Available Jobs</h1>
        <p className="lead text-center mb-4">Browse through the available job opportunities below.</p>

        <div className="row">
          <div className="col-lg-3">
            {/* Filter Section */}
            <h2 className="fw-light">Filter Jobs</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter job title"
                  value={filter.title}
                  onChange={(e) => setFilter({ ...filter, title: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                  value={filter.location}
                  onChange={(e) => setFilter({ ...filter, location: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Job Type</label>
                <select
                  className="form-select"
                  value={filter.type}
                  onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                >
                  <option value="">Select job type</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="intern">Intern</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Salary Range</label>
                <select
                  className="form-select"
                  value={filter.salaryRange}
                  onChange={(e) => setFilter({ ...filter, salaryRange: e.target.value })}
                >
                  <option value="">Select salary range</option>
                  <option value="0-50000">0 - 50,000</option>
                  <option value="50000-100000">50,000 - 1,00,000</option>
                  <option value="100000-"> > 1,00,000</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </form>
          </div>

          <div className="col-lg-9">
            {/* Job Listings Section */}
            <div className="album py-5 bg-light">
              <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <div className="col" key={job._id}>
                        <div className="card shadow-sm">
                          <div className="card-body">
                            <h5 className="card-title">{job.jobTitle}</h5>
                            <p className="card-text">{job.jobDesc}</p>
                            <p className="card-text">Location: {job.jobLocation}</p>
                            <p className="card-text">Salary: {job.salary}</p>
                            <p className="card-text">Job Type: {job.jobType}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => applyForJob(job.jobId)}
                                >
                                  Apply
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmployeeJobsComponent;
