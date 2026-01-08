import React from "react";
import "../styles/About.scss";
import aboutImg from "../pics/06.JPG";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

//--------------------------------------------------------

function About() {
  return (
    <div className="about">
      <Navbar />
      <section className="intro">
        <h2>
          At <span>Blood Link</span>, we believe that every drop of blood has the power to save a life.
        </h2>
        <img src={aboutImg} alt="Blood Link Team" />
      </section>

      <section className="info-section">
        <div className="info-box">
          <div className="title">
            <span className="icon">🩸</span>
            <h3>Our Mission</h3>
          </div>
          <p>
            Our mission is to create a reliable digital bridge between blood donors,
            hospitals, and patients in need. <br />
            We aim to make the process of donating and requesting blood faster,
            safer, and more accessible — because every drop counts, and every donation can save a life.
          </p>
        </div>

        <div className="info-box">
          <div className="title">
            <span className="icon">🩸</span>
            <h3>Our Goals</h3>
          </div>
          <ul>
            <p>
              Encourage Blood Donation<br></br>
              Connect Donors and Hospitals Efficiently<br></br>
              Simplify the Donation Process<br></br>
              Use Technology for Good<br></br>
              Build a Supportive Community<br></br>
            </p>
          </ul>
        </div>

        <div className="info-box">
          <div className="title">
            <span className="icon">🩸</span>
            <h3>Our Partners</h3>
          </div>
          <ul className="links">
            <p>
              Ismalia Plasma Donor Center<br></br>
              Ismailia Medical Complex<br></br>
              Fayed Specialized Hospital<br></br>
              Abu Khalifa Emergency Hospital<br></br>
              Al Khair and Al Baraka Hospital<br></br>
              Ismailia Hospital
          </p>
          </ul>
        </div>
      </section>

      <footer className="footer">
        <div className="links">
          <span>Privacy Policy</span>
          <span>Contact Us</span>
          <span>Terms of Service</span>
        </div>
        <div className="social-login">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} className='face' />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className='insta' />
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGoogle} className='google' />

          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} className='google' />

          </a>
        </div>
      </footer>
    </div>
  );
}
//--------------------------------------------------------

export default About;
