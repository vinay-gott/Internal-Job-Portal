import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import SignUpComponent from './SignUpComponent'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



const LoginComponent = () => {
  const nav=useNavigate()
  return (
    <>

{/* <div class="px-4 py-5 my-5 text-center">
    <img class="d-block mx-auto mb-4" src="./logo1.jpeg" alt="" width="72" height="57"/>
    <h1 class="display-5 fw-bold text-body-emphasis">Career Hub</h1>
  </div> */}

        <section class="vh-100 vw-80">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="./the.jpeg" class="img-fluid" alt="Sample image"/>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
            
          {/* <!-- Email input --> */}
          <div data-mdb-input-init class="form-outline mb-4">
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" />
            <label class="form-label" for="form3Example3">Email address</label>
          </div>

          {/* <!-- Password input --> */}
          <div data-mdb-input-init class="form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" />
            <label class="form-label" for="form3Example4">Password</label>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            {/* <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div> */}
            <a href="#!" class="text-body">Forgot password?</a>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
            <a href="#!"
                class="link-danger" onClick={()=>{nav('/signup')}}>Register</a>
                {/* <Link class="link-danger"  to="/signup">SignUp</Link> */}
                </p>
          </div>

        </form>
      </div>
    </div>
  </div>
  
</section>
    </>
    
  )
}

export default LoginComponent
