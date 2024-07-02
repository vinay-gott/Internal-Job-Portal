import React from 'react'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'

function HomeComponent() {
  return (
      <>
      <HeaderComponent/>

      <div class="px-4 py-5 my-5 text-center">
    <img class="d-block mx-auto mb-4" src="./logo1.jpeg" alt="" width="72" height="57"/>
    <h1 class="display-5 fw-bold text-body-emphasis">Career Hub</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">“Discover your passion, shape your career!”</p>
      
    </div>
  </div>

      <FooterComponent/>
      </>
    )
}

export default HomeComponent