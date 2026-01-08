import React from "react";
import Navbar from "./Navbar";
import "../styles/Faq.scss";
import { FaTint, FaTimesCircle, FaCheck } from "react-icons/fa";
//--------------------------------------------------------
const FAQ = () => {
  return (
    <div className="faq-page">
      <Navbar />
      <div className="faq-content">
        <h1>Frequently Asked Questions</h1>

        <div className="faq-section">
          <h3><FaTint className="icon red" /> Who Can Donate?</h3>
          <ul>
            <li>Age: Between 18 and 60 years old</li>
            <li>Weight: At least 50 kg (110 lbs)</li>
            <li>Health: Must be in good health — no fever, infections, or chronic diseases</li>
            <li>Interval: Wait at least 3 months between donations.</li>
          </ul>
        </div>

        <div className="faq-section">
          <h3><FaTimesCircle className="icon danger" /> Who Should Not Donate?</h3>
          <ul>
            <li>Anyone who recently had surgery or an infection.</li>
            <li>Pregnant or breastfeeding women.</li>
            <li>People who recently got tattoos or piercings (within 6 months).</li>
            <li>Anyone who tested positive for hepatitis, HIV, or other blood-related diseases.</li>
          </ul>
        </div>

        <div className="faq-section">
          <h3><FaCheck className="icon green" /> Required Tests Before Donation</h3>
          <ul>
            <li>Blood Pressure — to make sure it's within a normal range.</li>
            <li>Hemoglobin Level — to ensure you’re not anemic.</li>
            <li>Body Temperature — to confirm there’s no fever or infection.</li>
            <li>Pulse Rate — to check your heart’s condition.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
//--------------------------------------------------------
export default FAQ;
