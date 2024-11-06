import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from './UserContext';
import NavbarComponent from './NavBarComponent';
import axios from 'axios';
import ProfileEditModal from './ProfileEditModal';
import { useNavigate } from 'react-router-dom'; 

const ProfileComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { empId: contextEmpId, userRole: contextUserRole } = useContext(UserContext); 

    let empId = location.state?.empId || contextEmpId || localStorage.getItem('empId');
    let userRole = location.state?.userRole || contextUserRole || localStorage.getItem('userRole');

    const [employeeDetails, setEmployeeDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!empId) {
      alert('Error: No employee ID provided. Please log in again.');
      navigate('/login'); 
    } else {
      localStorage.setItem('empId', empId);
      localStorage.setItem('userRole', userRole);
    }
  }, [empId, navigate]);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
          if (empId) {
            try {
              const response = await axios.get(`http://localhost:3128/hr/emp/${empId}`);
              setEmployeeDetails(response.data);
              setLoading(false);
            } catch (err) {
              setError(err.message);
              setLoading(false);
            }
          }
        };
        fetchEmployeeDetails();
      }, [empId]);
    

        if (!empId) {
            return <div className="alert alert-danger">Error: No employee ID provided.</div>;
        }

        if (loading) {
            return <div className="alert alert-info">Loading employee details...</div>;
        }

        if (error) {
            return <div className="alert alert-danger">Error: {error}</div>;
        }


  return (
    <main>
      <NavbarComponent userRole={userRole} />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Profile Details</h2>
        {employeeDetails && (
          <div className="card">
            <div className="card-body">
              <div className="mb-3"><strong>Name:</strong> {employeeDetails.name}</div>
              <div className="mb-3"><strong>Employee ID:</strong> {employeeDetails.empId}</div>
              <div className="mb-3"><strong>Role:</strong> {employeeDetails.role}</div>
              <div className="mb-3"><strong>UserRole:</strong> {userRole}</div>
              <div className="mb-3"><strong>Email:</strong> {employeeDetails.email}</div>
              <div className="mb-3"><strong>Mobile Number:</strong> {employeeDetails.mobileNumber}</div>
              <div className="mb-3"><strong>Age:</strong> {employeeDetails.age}</div>
              <div className="mb-3"><strong>Gender:</strong> {employeeDetails.gender}</div>
              <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        )}
        {isEditing && (
          <ProfileEditModal
            employeeId={empId}
            initialFormData={employeeDetails}
            onClose={() => setIsEditing(false)}
          />
        )}
      </div>
    </main>
  );
};

export default ProfileComponent;




 
  
  

  