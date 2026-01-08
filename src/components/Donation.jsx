import React from "react";
import Navbar from "./Navbar";
import "../styles/Donation.scss";
import { FaTint, FaTimesCircle, FaCheck } from "react-icons/fa";
//--------------------------------------------------------
const FAQ = () => {
  return (
    <div className="faq-page">
      <Navbar />
      <div className="faq-content">
        <h1>Donation Guidelines</h1>

        <div className="faq-section">
          <h3><FaTint className="icon red" /> Before Donation</h3>
          <ul>
            <li>Hydrate well</li>
            <li>Eat a light meal</li>
            <li>Avoid caffeine & smoking</li>
            <li>Bring Your ID</li>
            <li>Wear comfortable clothing</li>
            <li>Inform staff of medications</li>
            <li>Don’t donate if yre sick</li>
          </ul>
        </div>

        <div className="faq-section">
          <h3><FaTimesCircle className="icon danger" /> After Donation</h3>
          <ul>
              <li>Rest for 10-15 minutes</li>
              <li>Keep the bandage on</li>
              <li>Drink plenty of water</li>
              <li>Avoid heavy exercise</li>
              <li>Avoid smoking for 2 hours</li>
              <li>Eat iron-rich food</li>
              <li>Report any side effects</li>
              <li>Don’t donate again too soon</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
//--------------------------------------------------------
export default FAQ;
