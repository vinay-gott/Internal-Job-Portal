//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import HomeComponent from './components/HomeComponent';
import  LoginComponent  from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import AllJobsComponent from './components/AllJobsComponent';

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
            <Route path="/jobs" element={<AllJobsComponent/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
