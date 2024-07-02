// JobEditComponent.jsx

import React, { useState } from 'react';
import axios from 'axios';

const JobEditComponent = ({ jobId, initialFormData, onClose }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3128/job/edit/${jobId}`, formData);
      console.log('Job updated:', response.data);
      alert('Job updated successfully!');
      onClose(); // Close the edit form after successful update
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job');
    }
  };

  return (
    <div className="container">
      <h2>Edit Job</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">Job Title</label>
          <input type="text" className="form-control" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="jobLocation" className="form-label">Job Location</label>
          <input type="text" className="form-control" id="jobLocation" name="jobLocation" value={formData.jobLocation} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="jobType" className="form-label">Job Type</label>
          <input type="text" className="form-control" id="jobType" name="jobType" value={formData.jobType} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobDesc" className="form-label">Job Description</label>
          <textarea className="form-control" id="jobDesc" name="jobDesc" value={formData.jobDesc} onChange={handleInputChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="number" className="form-control" id="salary" name="salary" value={formData.salary} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Job</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default JobEditComponent;
