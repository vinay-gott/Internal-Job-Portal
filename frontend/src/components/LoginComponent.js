// import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginComponent = () => {
//   const [empId, setEmpId] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3128/login', { empId, password });
//       console.log(response.data);
//       alert('Login successful');
//       // Optionally navigate to another page
//       navigate('/home');
//     } catch (error) {
//       console.error('Error logging in:', error);
//       if (error.response) {
//         console.error('Server Error:', error.response.data);
//         alert(`Error: ${error.response.data.message}`);
//       } else if (error.request) {
//         console.error('Request Error:', error.request);
//         alert('Request error, please try again later.');
//       } else {
//         console.error('Error:', error.message);
//         alert('Something went wrong, please try again later.');
//       }
//     }
//   };

//   return (
//     <section className="vh-100 vw-80">
//       <div className="container-fluid h-custom">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-md-9 col-lg-6 col-xl-5">
//             <img src="./the.jpeg" className="img-fluid" alt="Sample image" />
//           </div>
//           <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//             <form onSubmit={handleSubmit}>
//               {/* Employee ID input */}
//               <div className="form-outline mb-4">
//                 <input 
//                   type="text" 
//                   id="form3Example1" 
//                   className="form-control form-control-lg"
//                   placeholder="Enter your employee ID"
//                   value={empId}
//                   onChange={(e) => setEmpId(e.target.value)}
//                   required
//                 />
//                 <label className="form-label" htmlFor="form3Example1">Employee ID</label>
//               </div>

//               {/* Password input */}
//               <div className="form-outline mb-3">
//                 <input 
//                   type="password" 
//                   id="form3Example4" 
//                   className="form-control form-control-lg"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <label className="form-label" htmlFor="form3Example4">Password</label>
//               </div>

//               <div className="text-center text-lg-start mt-4 pt-2">
//                 <button type="submit" className="btn btn-primary btn-lg">Login</button>
//                 <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
//                   <a href="#!" className="link-danger" onClick={() => navigate('/signup')}>Register</a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LoginComponent;


import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
    const [empId, setEmpId] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('employee'); // Default to employee
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3128/login', { empId, password, userType });
            console.log(response.data);
            alert('Login successful');
            // Optionally navigate to another page
            navigate('/home');
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response) {
                console.error('Server Error:', error.response.data);
                alert(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                console.error('Request Error:', error.request);
                alert('Request error, please try again later.');
            } else {
                console.error('Error:', error.message);
                alert('Something went wrong, please try again later.');
            }
        }
    };

    return (
        <section className="vh-100 vw-80">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="./the.jpeg" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            {/* Employee ID input */}
                            <div className="form-outline mb-4">
                                <input 
                                    type="text" 
                                    id="form3Example1" 
                                    className="form-control form-control-lg"
                                    placeholder="Enter your employee ID"
                                    value={empId}
                                    onChange={(e) => setEmpId(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="form3Example1">Employee ID</label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <input 
                                    type="password" 
                                    id="form3Example4" 
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            {/* User type selection */}
                            <div className="mb-3">
                                <label className="form-label" htmlFor="userType">Login As:</label>
                                <select 
                                    className="form-select" 
                                    id="userType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                >
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg">Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                                    <a href="#!" className="link-danger" onClick={() => navigate('/signup')}>Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginComponent;
