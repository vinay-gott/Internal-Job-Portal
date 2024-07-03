import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './NavBarComponent';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [hrs, setHrs] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3128/job/details');
        const allEmployees = response.data;
        
        // Separate employees and HRs
        const employees = allEmployees.filter(emp => emp.role === 'employee');
        const hrs = allEmployees.filter(emp => emp.role === 'hr');
        
        setEmployees(employees);
        setHrs(hrs);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="container mt-5">
        <div className="row py-2">
          <div className=" text-center col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Admin Dashboard</h1>
            <br></br>
          </div>
        </div>
        
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-3">HR Details</h2>
                <table className="table table-hover table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Employee ID</th>
                      <th>Email</th>
                      <th>Mobile Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hrs.map(hr => (
                      <tr key={hr._id}>
                        <td>{hr.empId}</td>
                        <td>{hr.email}</td>
                        <td>{hr.mobileNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-3">Employee Details</h2>
                <table className="table table-hover table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Employee ID</th>
                      <th>Email</th>
                      <th>Mobile Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(employee => (
                      <tr key={employee._id}>
                        <td>{employee.empId}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobileNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
