
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import AllJobsComponent from './components/AllJobsComponent';
import JobComponent from './components/JobComponent';
import HRJobsComponent from './components/HRJobsComponent';
import EmployeeJobsComponent from './components/EmployeeJobsComponent';
import EmployeeDashboard from './components/EmployeeDashBoard.js';
import HRDashboard from './components/HRDashboard';
import AdminDashboard from './components/AdminDashboard.js';
import AppliedJobsComponent from './components/AppliedJobsComponent.js';
import JobApplicationsComponent from './components/JobApplicationsComponent.js';
import EmpHomeComponent from './components/EmpHomeComponent.js';
import HRHomeComponent from './components/HRHomeComponent.js';
import AdminHomeComponent from './components/AdminHomeComponent.js';
import { UserProvider } from '../src/components/UserContext.js';


function App() {
  return (
    <UserProvider>
      <div>
        <header>
          <Router>
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignUpComponent />} />
              <Route path="/job" element={<JobComponent />} />
              <Route path="/hr-job" element={<HRJobsComponent />} />
              <Route path="/emp-job" element={<EmployeeJobsComponent />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/hr-dashboard" element={<HRDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/applied-jobs" element={<AppliedJobsComponent />} />
              <Route path="/job-applications/:jobId" element={<JobApplicationsComponent />} />
              <Route path="/employee-home" element={<EmpHomeComponent />} />
              <Route path="/hr-home" element={<HRHomeComponent />} />
              <Route path="/admin-home" element={<AdminHomeComponent />} />
            </Routes>
          </Router>
        </header>
      </div>
    </UserProvider>
  );
}

export default App;
