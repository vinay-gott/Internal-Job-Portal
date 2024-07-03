import React from 'react';

const JobApplicantsModal = ({ selectedJobId, jobApplicants, onClose }) => (
  <div
    className="modal fade"
    id="applicantsModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Applicants for Job ID: {selectedJobId}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              onClose();
            }}
          ></button>
        </div>
        <div className="modal-body">
          {jobApplicants.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {jobApplicants.map((applicant) => (
                  <tr key={applicant._id}>
                    <td>{applicant.empId}</td>
                    <td>{applicant.name}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.location}</td>
                    <td>{applicant.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No applicants found</p>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={() => {
              onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default JobApplicantsModal;
