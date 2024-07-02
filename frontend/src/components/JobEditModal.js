// JobEditModal.jsx

import React from 'react';
import JobEditComponent from './JobEditComponent';

const JobEditModal = ({ jobId, initialFormData, onClose }) => {
  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Job</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <JobEditComponent jobId={jobId} initialFormData={initialFormData} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobEditModal;
