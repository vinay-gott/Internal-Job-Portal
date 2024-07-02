// // import React from 'react'
// // import "bootstrap/dist/css/bootstrap.min.css"
// // import SignUpComponent from './SignUpComponent'
// // import { Link } from 'react-router-dom'
// // import { useNavigate } from 'react-router-dom'



// // const LoginComponent = () => {
// //   const nav=useNavigate()
// //   return (
// //     <>

// // {/* <div class="px-4 py-5 my-5 text-center">
// //     <img class="d-block mx-auto mb-4" src="./logo1.jpeg" alt="" width="72" height="57"/>
// //     <h1 class="display-5 fw-bold text-body-emphasis">Career Hub</h1>
// //   </div> */}

// //         <section class="vh-100 vw-80">
// //   <div class="container-fluid h-custom">
// //     <div class="row d-flex justify-content-center align-items-center h-100">
// //       <div class="col-md-9 col-lg-6 col-xl-5">
// //         <img src="./the.jpeg" class="img-fluid" alt="Sample image"/>
// //       </div>
// //       <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
// //         <form>
            
// //           {/* <!-- Email input --> */}
// //           <div data-mdb-input-init class="form-outline mb-4">
// //             <input type="email" id="form3Example3" class="form-control form-control-lg"
// //               placeholder="Enter a valid email address" />
// //             <label class="form-label" for="form3Example3">Email address</label>
// //           </div>

// //           {/* <!-- Password input --> */}
// //           <div data-mdb-input-init class="form-outline mb-3">
// //             <input type="password" id="form3Example4" class="form-control form-control-lg"
// //               placeholder="Enter password" />
// //             <label class="form-label" for="form3Example4">Password</label>
// //           </div>

// //           <div class="text-center text-lg-start mt-4 pt-2">
// //             <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Login</button>
// //             <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
// //             <a href="#!"
// //                 class="link-danger" onClick={()=>{nav('/signup')}}>Register</a>
// //                 {/* <Link class="link-danger"  to="/signup">SignUp</Link> */}
// //                 </p>
// //           </div>

// //         </form>
// //       </div>
// //     </div>
// //   </div>
  
// // </section>
// //     </>
    
// //   )
// // }

// // export default LoginComponent


// import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginComponent = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3128/login', { email, password });
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
//               {/* Email input */}
//               <div className="form-outline mb-4">
//                 <input 
//                   type="email" 
//                   id="form3Example3" 
//                   className="form-control form-control-lg"
//                   placeholder="Enter a valid email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <label className="form-label" htmlFor="form3Example3">Email address</label>
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3128/login', { empId, password });
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
