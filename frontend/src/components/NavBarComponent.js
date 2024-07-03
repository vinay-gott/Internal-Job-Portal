
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

const NavbarComponent = ({ userRole }) => {
  const navigate = useNavigate();
  const { empId } = useContext(UserContext);

  const handleLogout = () => {
    alert('Logged out');
    navigate('/home');
  };

  const handleHomeClick = () => {
    if (userRole === 'employee') {
      navigate('/employee-home');
    } else if (userRole === 'hr') {
      navigate('/hr-home');
    } else{
      navigate('/admin-home');
    }
  };

  const handleJobsClick = () => {
    if (userRole === 'employee') {
      navigate('/employee-dashboard', { state: { empId } });
    } else if (userRole === 'hr') {
      navigate('/hr-dashboard');
    } else if (userRole === 'admin') {
      navigate('/admin-dashboard');
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{
      position: 'sticky',
      top: '0',
      zIndex: '1000',
      backgroundColor: '#343a40',
    }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={handleHomeClick}>
          <img src="/logo1.jpeg" alt="Logo" width="30" height="24" style={{ borderRadius: '10%' }} className="d-inline-block align-text-top" /> CareerHub
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#" onClick={handleHomeClick}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#" onClick={handleJobsClick}>Jobs</a>
            </li>
          </ul>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
