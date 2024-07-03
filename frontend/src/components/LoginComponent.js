
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';

const LoginComponent = () => {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee');
  const navigate = useNavigate();
  const { setEmpId: setContextEmpId } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3128/login', { empId, password, userType });
      if (response.data.success) {
        setContextEmpId(empId);
        // if (userType === 'employee') {
        // //   navigate('/employee-dashboard');
        // navigate('/employee-dashboard', { state: { empId } });
        // } else if (userType === 'hr') {
        //   navigate('/hr-dashboard');
        // } else if (userType === 'admin') {
        //   navigate('/admin-dashboard');
        // }
        if (userType === 'employee') {
            navigate('/employee-home');
          } else if (userType === 'hr') {
            navigate('/hr-home');
          } else if (userType === 'admin') {
            navigate('/admin-home');
          }
        alert('Login successful');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in');
    }
  };

    return (
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="./the.jpeg" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit} className="p-5 shadow-lg rounded bg-light">
                            <h3 className="mb-4 text-center">Login</h3>
                            {/* Employee ID input */}
                            <div className="form-outline mb-4">
                                <input 
                                    type="text" 
                                    id="form3Example1" 
                                    className="form-control form-control-lg"
                                    placeholder="Enter your employee ID"
                                    value={empId}
                                    onChange={(e) => setEmpId(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="form3Example1">Employee ID</label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <input 
                                    type="password" 
                                    id="form3Example4" 
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            {/* User type selection */}
                            <div className="mb-3">
                                <label className="form-label" htmlFor="userType">Login As:</label>
                                <select 
                                    className="form-select" 
                                    id="userType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                >
                                    <option value="employee">Employee</option>
                                    <option value="hr">HR</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg w-100">Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0 text-center">Don't have an account? 
                                    <a href="#!" className="link-danger" onClick={() => navigate('/signup')}> Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginComponent;
