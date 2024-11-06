import React, { useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import UserContext from './UserContext';
import { useLocation } from 'react-router-dom';

const NavbarComponent = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { empId: contextEmpId, userRole: contextUserRole } = useContext(UserContext);

  const empId = location.state?.empId || contextEmpId || localStorage.getItem('empId');
  const userRole = location.state?.userRole || contextUserRole || localStorage.getItem('userRole');

  useEffect(() => {
    if (contextEmpId && contextUserRole) {
      localStorage.setItem('empId', empId);
      localStorage.setItem('userRole', userRole);
    }
  }, [contextEmpId, contextUserRole]);

  const handleLogout = () => {
    localStorage.removeItem('empId');
    localStorage.removeItem('userRole');
    alert('Logged out');
    navigate('/home');
  };

  const handleHomeClick = () => {
    navigate('/homepage', { state: { userRole } });
  };

  const handleJobsClick = () => {
    if (userRole === 'employee') {
      navigate('/emp-job', { state: { empId } });
    } else if (userRole === 'hr') {
      navigate('/hr-job');
    } else if (userRole === 'admin') {
      navigate('/admin-dashboard');
    }
  };

  const handleAccountInfoClick = () => {
    navigate('/profile', { state: { empId, userRole } });
  };
  
  const handleAppliedJobsClick = () => {
    navigate('/applied-jobs', { state: { empId } });
  }

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
            <li className="nav-item" style={{ marginRight: '15px' }}>
              <a className="nav-link active" aria-current="page" href="#" onClick={handleHomeClick}>Home</a>
            </li>
            <li className="nav-item" style={{ marginRight: '15px' }}>
              {userRole === 'admin' ? (
                <a className="nav-link active" href="#" onClick={handleJobsClick}>Dashboard</a>
              ) : userRole === 'hr' ? (
                <a className="nav-link active" href="#" onClick={handleJobsClick}>Job Postings</a>
              ) : (
                <a className="nav-link active" href="#" onClick={handleJobsClick}>Jobs</a>
              )}
            </li>

            {userRole === 'employee' && (
              <li className="nav-item" style={{ marginRight: '15px' }}>
                <a className="nav-link active" href="#" onClick={handleAppliedJobsClick}>Applied Jobs</a>
              </li>
            )}
            <li className="nav-item" style={{ marginRight: '15px' }}>
              <a className="nav-link active" href="#" onClick={handleAccountInfoClick}>Profile</a>
            </li>
          </ul>

          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
