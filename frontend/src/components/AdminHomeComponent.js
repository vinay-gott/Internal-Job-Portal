
import React from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import './HomeComponent.css'; // Import the CSS file
import NavbarComponent from './NavBarComponent';

function AdminHomeComponent() {
  return (
    <>
    <NavbarComponent userRole={'admin'}/>      

      <div className="hero-section text-center">
        <img className="logo mb-4" src="./logo1.jpeg" alt="" />
        <h1 className="display-5 fw-bold">Career Hub</h1>
        <div className="lead-text mx-auto">
          <p className="lead mb-4">“Discover your passion, shape your career!”</p>
        </div>
      </div>

      <div className="container">
        <div className="row about-section">
          <div className="col-md-8 mx-auto">
            <h2>About Us</h2>
            <p>
              Career Hub is a platform dedicated to connecting talented individuals with top employers.
              Our mission is to help you find the job that best fits your skills, passions, and career goals.
              We believe in the power of meaningful work and strive to create opportunities for everyone to thrive.
            </p>
          </div>
        </div>
        <div className="row values-section mt-4">
          <div className="col-md-8 mx-auto">
            <h2>Our Values</h2>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="value-box integrity">
                  <strong>Integrity:</strong>
                  <p>We believe in doing the right thing, always.</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="value-box innovation">
                
                <strong>Collaboration:</strong>
                <p>We work together to achieve common goals.</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="value-box excellence">
                <strong>Innovation:</strong>
                <p>We strive to bring new and creative solutions to our users.</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="value-box collaboration">
                 
                  <strong>Excellence:</strong>
                <p>We aim for the highest standards in everything we do.</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="value-box empowerment">
                  <strong>Empowerment:</strong>
                  <p>We empower individuals to take control of their careers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
}

export default AdminHomeComponent;
