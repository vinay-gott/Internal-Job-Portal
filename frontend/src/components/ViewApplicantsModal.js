import axios from 'axios';
import React, { useState, useEffect } from 'react'; 


const ViewApplicantsModal = ({ jobId, onClose, handleApprove, handleReject }) => {
  const [jobApplicants, setJobApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null); 
  const [applicantDetails, setApplicantDetails] = useState(null); 
  useEffect(() => {
    const fetchJobApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:3128/job/view/${jobId}`);
        setJobApplicants(response.data);
      } catch (error) {
        console.error('Error fetching job applicants:', error);
      }
    };

    fetchJobApplicants();
  }, [jobId]);

  const fetchApplicantDetails = async (empId) => {
    try {
      const response = await axios.get(`http://localhost:3128/hr/emp/${empId}`); 
      setApplicantDetails(response.data);
    } catch (error) {
      console.error('Error fetching applicant details:', error);
    }
  };

  const handleApplicantClick = (applicant) => {
    setSelectedApplicant(applicant);
    fetchApplicantDetails(applicant.empId); 
  };

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
              <div>
                <h5>Select an applicant to view details:</h5>
                <ul className="list-group">
                  {jobApplicants.map((applicant) => {
                  return(
                    
                    <li
                      key={applicant.empId}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      onClick={() => handleApplicantClick(applicant)}
                    >
                      <div>
                        {applicant.empId}
                      </div>
                      <div>
                        {/* Display applicant's status */}
                        {applicant.status === 'approve' ? (
                          <span className="badge bg-success">Approved</span>
                        ) : applicant.status === 'reject' ? (
                          <span className="badge bg-danger">Rejected</span>
                        ) : (
                          <span className="badge bg-warning">Pending</span>
                        )}
                      </div>
                    </li>
                  );
                  })}
                </ul>
              </div>
            ) : (
              <p>No applicants found</p>
            )}

            {/* Display selected applicant details */}
            {selectedApplicant && applicantDetails && (
              <div className="mt-4">
                <h5>Applicant Details</h5>
                <p><strong>Employee ID:</strong> {applicantDetails.empId}</p>
                <p><strong>Name:</strong> {applicantDetails.name}</p>
                <p><strong>Email:</strong> {applicantDetails.email}</p>
                <p><strong>Phone:</strong> {applicantDetails.mobileNumber}</p>
                <p><strong>Age:</strong> {applicantDetails.age}</p>
                <p><strong>Gender:</strong> {applicantDetails.gender}</p>

                {/* Approve and Reject buttons */}
                {selectedApplicant.status === 'pending' && (
                  <div className="mt-3">
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(jobId, selectedApplicant.empId)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleReject(jobId, selectedApplicant.empId)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
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

