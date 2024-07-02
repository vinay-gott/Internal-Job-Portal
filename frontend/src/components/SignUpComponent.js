import React, { useState } from 'react';
import axios from 'axios';


const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    empId: '',
    mobileNumber: '',
    department: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3128/signup', formData);
      console.log(response.data);
      alert('New employee added successfully');
      // Optionally reset form fields
      setFormData({
        email: '',
        password: '',
        empId: '',
        mobileNumber: '',
        department: '',
        role: ''
      });
    } catch (error) {
      console.error('Error adding new employee:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server Error:', error.response.data);
            alert(`Error 1: ${error.response.data.message}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error:', error.request);
            alert('Error 2: Request error, please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            alert('Error 3: Something went wrong, please try again later.');
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
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control form-control-lg"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="email">Email ID</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="password">Password</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="empId"
                            name="empId"
                            className="form-control form-control-lg"
                            value={formData.empId}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="empId">Employee ID</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            className="form-control form-control-lg"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="mobileNumber">Phone number</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="department"
                            name="department"
                            className="form-control form-control-lg"
                            value={formData.department}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="department">Department</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="role"
                            name="role"
                            className="form-control form-control-lg"
                            value={formData.role}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="role">Role</label>
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
