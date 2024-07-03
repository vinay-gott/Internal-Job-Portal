
import {React,useContext} from 'react';
import { useLocation } from 'react-router-dom';
import EmployeeJobsComponent from './EmployeeJobsComponent';
import UserContext from './UserContext';

const EmployeeDashboard = () => {
    // const location = useLocation();
    // const { empId } = location.state;
    const location = useLocation();
    const { empId: contextEmpId } = useContext(UserContext);
    const empId = location.state?.empId || contextEmpId;
  
    if (!empId) {
      return <div>Error: No employee ID provided.</div>;
    }
    return (
        <div>
            <EmployeeJobsComponent empId={empId} />
        </div>
    );
};

export default EmployeeDashboard;
