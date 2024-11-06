import React, { useState } from 'react';
import axios from 'axios';

const EmpEditComponent = ({ employeeId, initialFormData, onClose }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3128/hr/empedit/${employeeId}`, formData);
      alert('Employee updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
        <input type="text" className="form-control" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">Gender</label>
        <select className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Save Changes</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EmpEditComponent;
