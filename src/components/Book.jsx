import React from "react";
import "../styles/Book.scss";
import Navbar from "./Navbar";
import img1 from '../pics/13.png';
import img2 from '../pics/14.jpg';
import { Link } from "react-router-dom";
//--------------------------------------------------------
function BookDonation() {
  return (
    <div className="book-donation">
      <Navbar />
      <div className="content">
        <form className="donation-form">
          <h2>booking donation</h2>

          <label>Center</label>
          <input type="text" placeholder="Enter Center Name" />

          <label>Day</label>
          <input type="date" placeholder="Enter Your Donation Date" />

          <label>Clock</label>
          <input type="time" placeholder="Enter Your Donation Clock" />

          <label>Full Name</label>
          <input type="text" placeholder="Enter Your Name" />

          <label>Birth Date</label>
          <input type="date" placeholder="Enter your birth date" />

          <label>Weight</label>
          <input type="number" placeholder="Enter your weight" />

          <label>Phone Number</label>
          <input type="tel" placeholder="Enter your number" />

          <div className="section">
            <label>Blood Type</label>
            <div className="blood-type">
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                <label key={type}>
                  <input type="radio" name="blood" /> {type}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <label>Are you currently taking any medications?</label>
            <div className="options">
              <label><input type="radio" name="medications" /> Yes</label>
              <label><input type="radio" name="medications" /> No</label>
            </div>
          </div>

          <div className="section">
            <label>Have you had any surgeries in the past 6 months?</label>
            <div className="options">
              <label><input type="radio" name="surgery" /> Yes</label>
              <label><input type="radio" name="surgery" /> No</label>
            </div>
          </div>

          <div className="section">
            <label>Have you donated blood before?</label>
            <div className="options">
              <label><input type="radio" name="donated" /> Yes</label>
              <label><input type="radio" name="donated" /> No</label>
            </div>
          </div>

          <div className="section">
            <label>Have you recently had any infections (Hepatitis, COVID-19, etc)?</label>
            <div className="options">
              <label><input type="radio" name="infection" /> Yes</label>
              <label><input type="radio" name="infection" /> No</label>
            </div>
          </div>

          <Link to='/donation' type="submit" className="confirm-btn">Confirm</Link>
        </form>

        <div className="images">
          <img src={img1} alt="lab" />
          <img src={img2} alt="lab" />
        </div>
      </div>
    </div>
  );
}
//--------------------------------------------------------
export default BookDonation;
