import React from 'react';
import ProfileEditComponent from './ProfileEditComponent';

const EmpEditModal = ({ employeeId, initialFormData, onClose }) => {
  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <ProfileEditComponent employeeId={employeeId} initialFormData={initialFormData} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpEditModal;
