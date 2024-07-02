import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from 'react-router-dom'
import AllJobsComponent from './AllJobsComponent'
//import logo from './'


function HeaderComponent() {
  const nav=useNavigate()
  return (
    <>
    <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <div class="container-fluid">
  
    <a class="navbar-brand" href="#" onClick={()=>{nav('/home')}}>
      <img src="/logo1.jpeg" alt="Logo" width="30" height="24" style={{ borderRadius: '10%' }} class="d-inline-block align-text-top"/> CareerHub</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#" onClick={()=>{nav('/home')}}>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#" onClick={()=>{nav('/jobs')}}>Jobs</a>
        </li>       
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search Jobs" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <button class="btn btn-outline-success" onClick={()=>{nav('/login')}}>Login</button>
    </div>
  </div>
</nav>
    </div>
    </>
  )
}

export default HeaderComponent