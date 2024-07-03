import React, { useState } from 'react';
import axios from 'axios';

const JobAddModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobId: '', // Add jobId state
    jobLocation: '',
    jobType: '',
    jobDesc: '',
    salary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3128/job/add', formData);
      console.log('Job added:', response.data);
      alert('Job added successfully!');
      onClose(); // Close modal after adding job
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Job</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="jobTitle" className="form-label">Job Title</label>
                <input type="text" className="form-control" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="jobId" className="form-label">Job ID</label>
                <input type="text" className="form-control" id="jobId" name="jobId" value={formData.jobId} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="jobLocation" className="form-label">Location</label>
                <input type="text" className="form-control" id="jobLocation" name="jobLocation" value={formData.jobLocation} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="jobType" className="form-label">Job Type</label>
                <input type="text" className="form-control" id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="jobDesc" className="form-label">Job Description</label>
                <textarea className="form-control" id="jobDesc" name="jobDesc" value={formData.jobDesc} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="salary" className="form-label">Salary</label>
                <input type="number" className="form-control" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary">Add Job</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAddModal;
