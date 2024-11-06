import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    empId: '',
    mobileNumber: '',
    name: '',
    age: '', 
    gender: '', 
    role: 'employee' 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3128/signup', formData);
      alert('New employee added successfully');

      setFormData({
        email: '',
        password: '',
        empId: '',
        mobileNumber: '',
        name: '', 
        age: '', 
        gender: '', 
        role: 'employee'
      });

      navigate('/login');
    } catch (error) {
      console.error('Error adding new employee:', error);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Request Error:', error.request);
        alert('Error: Request error, please try again later.');
      } else {
        console.error('Error:', error.message);
        alert('Error: Something went wrong, please try again later.');
      }
    }
  };

  return (
    <>
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="Sample photo" className="img-fluid" />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">Create an Account</h3>
                      <form onSubmit={handleSubmit}>

                      
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="name">Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control form-control-lg"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="empId">Employee ID</label>
                          <input
                            type="text"
                            id="empId"
                            name="empId"
                            className="form-control form-control-lg"
                            value={formData.empId}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label">Role</label>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id="employeeRole"
                              value="employee"
                              checked={formData.role === 'employee'}
                              onChange={handleRoleChange}
                            />
                            <label className="form-check-label" htmlFor="employeeRole">Employee</label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id="hrRole"
                              value="hr"
                              checked={formData.role === 'hr'}
                              onChange={handleRoleChange}
                            />
                            <label className="form-check-label" htmlFor="hrRole">HR</label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id="adminRole"
                              value="admin"
                              checked={formData.role === 'admin'}
                              onChange={handleRoleChange}
                            />
                            <label className="form-check-label" htmlFor="adminRole">Admin</label>
                          </div>
                        </div>
                       
                        <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="age">Age</label>
                            <input
                              type="number"
                              id="age"
                              name="age"
                              className="form-control form-control-lg"
                              value={formData.age}
                              onChange={handleChange}
                              min="18" 
                              max="60"
                              title="Age must be between 18 and 60." 
                              required
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="gender">Gender</label>
                            <select
                              id="gender"
                              name="gender"
                              className="form-control form-control-lg"
                              value={formData.gender}
                              onChange={handleChange}
                              required
                            >
                              <option value=""></option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="email">Email ID</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control form-control-lg"
                            value={formData.email}
                            onChange={handleChange}
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            title="Please enter a valid email address (e.g., example@domain.com)."
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="mobileNumber">Phone number</label>
                          <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            className="form-control form-control-lg"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            pattern="\d{10}"
                            title="Phone number must be exactly 10 digits."
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="password">Password</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="d-flex justify-content-end pt-3">
                          <button type="submit" className="btn btn-warning btn-lg ms-2">Submit form</button>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpComponent;
