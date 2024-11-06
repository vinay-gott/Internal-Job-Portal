import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavbarComponent from './NavBarComponent';
import { useNavigate } from 'react-router-dom'; 
import UserContext from './UserContext';

const AppliedJobsComponent = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { empId: contextEmpId, userRole: contextUserRole } = useContext(UserContext); 

  let empId = location.state?.empId || contextEmpId || localStorage.getItem('empId');
  let userRole = location.state?.userRole || contextUserRole || localStorage.getItem('userRole');

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
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3128/job/applied/${empId}`);
        setAppliedJobs(response.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };
    fetchAppliedJobs();
  }, [empId]);

  const getCardColorStyle = (status) => {
    switch (status) {
      case 'approve':
        return {
          background: 'linear-gradient(to bottom right, #5bff76, #aaff9d)',
        };
      case 'reject':
        return {
          background: 'linear-gradient(to bottom right, #ff5b5b, #ff9d9d)',
        };
      case 'pending':
        return {
          background: 'linear-gradient(to bottom right, #ffeb3b, #fffb9d)',
        };
      default:
        return {
          background: '#f8f9fa',
        };
    }
  };

  return (
    <main>
      <NavbarComponent userRole={'employee'} />
      <section className="py-4 text-center container">
        <div className="row py-2">
          <div className="col-lg-8 col-md-10 mx-auto">
            <h1 className="fw-light">Applied Jobs</h1>
            <p className="lead text-muted">These are the jobs you've applied for. Stay updated on their status here.</p>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {appliedJobs.length > 0 ? (
              appliedJobs.map((job) => (
                <div className="col" key={job.jobId}>
                  <div className="card shadow-sm h-100" style={{ ...getCardColorStyle(job.status), borderRadius: '8px' }}>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-2">{job.jobTitle}</h5>
                      <p className="card-text text-muted mb-4">{job.jobDesc}</p>

                      <div className="mb-3">
                        <p className="card-text"><strong>Location:</strong> {job.jobLocation}</p>
                        <p className="card-text"><strong>Salary:</strong> {job.salary}</p>
                        <p className="card-text"><strong>Job Type:</strong> {job.jobType}</p>
                      </div>

                      <div className="mt-auto">
                        <p className="card-text fw-bold">
                          Status: {job.status === 'approve' ? 'Approved' : job.status === 'reject' ? 'Rejected' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted">You have not applied for any jobs yet.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppliedJobsComponent;
