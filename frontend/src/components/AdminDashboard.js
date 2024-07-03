import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="mb-3">HR Details</h2>
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

      <div className="row">
        <div className="col-12">
          <h2 className="mb-3">Employee Details</h2>
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
  );
};

export default AdminDashboard;
