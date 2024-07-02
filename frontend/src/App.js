//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import HomeComponent from './components/HomeComponent';
import  LoginComponent  from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import AllJobsComponent from './components/AllJobsComponent';
import JobComponent  from './components/JobComponent';
import AdminJobsComponent from './components/AdminJobsComponent';
import EmployeeJobsComponent from './components/EmployeeJobsComponent';
import EmployeeDashboard from './components/EmployeeDashBoard.js';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div >
      <header >
        <Router>
          <Routes>
            <Route path="/" element={<HomeComponent/>} />
            <Route path="/home" element={<HomeComponent/>} />
            <Route path="/login" element={<LoginComponent/>} />
            <Route path="/signup" element={<SignUpComponent/>} />
            {/* <Route path="/jobs" element={<AllJobsComponent/>} /> */}
            <Route path="/job" element={<JobComponent/>} />
            <Route path="/admin-job" element={<AdminJobsComponent/>} />
            <Route path="/emp-job" element={<EmployeeJobsComponent/>} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard/>} />
            <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
