import React from "react";
import "../styles/Profile.scss";
import logo from '../pics/848.jpg';
import Navbar from "./Navbar";

//--------------------------------------------------------------

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="profile-page">
        <div className="user-card">
          <div className="user-image">
            <img
              src={logo}
              alt="profile"
            />
          </div>

          <div className="user-details">
            <h2 className="name">Mostafa Medhat</h2>

            <div className="info-grid">
              <p><strong>Gender:</strong> Male</p>
              <p><strong>Blood Type:</strong> A+</p>

              <p><strong>Age:</strong> 23</p>
              <p><strong>Phone Number:</strong> 01003200200</p>

              <p><strong>Address:</strong> Ismailia, ELSadat School </p>
            </div>
          </div>
        </div>

        {/* ===== UPCOMING APPOINTMENT ===== */}
        <div className="section">
          <h3>Upcoming Appointment</h3>

          <div className="appointment-box">
            <div className="date-box">
              <h4>Day</h4>
              <span>15 OCT</span>
            </div>

            <div className="clock-box">
              <h4>Clock</h4>
              <span>10:30</span>
            </div>
          </div>

          <div className="center-box">
            <h4>Center</h4>
            <p>Ismailia Plasma Donor</p>
          </div>
        </div>

        {/* ===== DONATION HISTORY ===== */}
        <div className="section">
          <h3>Donation History</h3>

          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Center</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>30/1/2025</td>
                <td>2 Unit</td>
                <td>Ismailia Plasma Donor</td>
              </tr>
              <tr>
                <td>30/4/2025</td>
                <td>2 Unit</td>
                <td>Ismailia Plasma Donor</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
//--------------------------------------------------------------

export default Profile;
