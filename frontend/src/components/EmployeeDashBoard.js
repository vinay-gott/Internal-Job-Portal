
import React from 'react';
import { useLocation } from 'react-router-dom';
import EmployeeJobsComponent from './EmployeeJobsComponent';

const EmployeeDashboard = () => {
    const location = useLocation();
    const { empId } = location.state;

    return (
        <div>
            <EmployeeJobsComponent empId={empId} />
        </div>
    );
};

export default EmployeeDashboard;
