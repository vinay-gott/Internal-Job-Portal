
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';
import './LoginComponent.css'; 

const LoginComponent = () => {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee');
  const navigate = useNavigate();
  const { setEmpId: setContextEmpId, setUserRole } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3128/login', { empId, password, userType });
      if (response.data.success) {
        setContextEmpId(empId);
        setUserRole(userType); 
        localStorage.setItem('userRole', userType);
        navigate('/homepage',{ state: { userType } })
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
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card shadow-lg p-4 rounded bg-light">
        <div className="text-center mb-4">
          <h3 className="mb-3">Login</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="empId">Employee ID</label>
            <input 
              type="text" 
              id="empId" 
              className="form-control form-control-lg"
              placeholder="Enter your employee ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              required
            />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <p className="small fw-bold mb-0">Don't have an account? 
            <a href="#!" className="link-danger" onClick={() => navigate('/signup')}> Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
