
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewApplicantsModal = ({ jobId, onClose, handleApprove, handleReject }) => {
  const [jobApplicants, setJobApplicants] = useState([]);

  useEffect(() => {
    const fetchJobApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:3128/job/view/${jobId}`);
        console.log('Applicants fetched:', response.data); // Debugging: Log the applicants data
        setJobApplicants(response.data);
      } catch (error) {
        console.error('Error fetching job applicants:', error);
      }
    };

    fetchJobApplicants();
  }, [jobId]);

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Applicants for Job ID: {jobId}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {jobApplicants.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Status</th>
                    {/* <th>Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {jobApplicants.map((applicant) => (
                    <tr key={applicant.empId}>
                      <td>{applicant.empId}</td>
                      <td>{applicant.email}</td>
                      <td>{applicant.mobileNumber}</td>
                      <td>
                      <span>{applicant.status === 'approve' ? 'Approved' : applicant.status=='pending' ? 'Pending' : 'Rejected'}</span></td> {/* Display the status */}
                      <td>
                        {applicant.status === 'pending' ? (
                          <>
                            <button className="btn btn-success" onClick={() => handleApprove(jobId, applicant.empId)}>Approve</button>
                            <button className="btn btn-danger ms-2" onClick={() => handleReject(jobId, applicant.empId)}>Reject</button>
                          </>
                        ) : (null
                          // <span>{applicant.status === 'approved' ? 'Approved' : 'Rejected'}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No applicants found</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicantsModal;
