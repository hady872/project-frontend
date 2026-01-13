// src/components/Profile.jsx

import React, { useEffect, useState } from "react";
import "../styles/Profile.scss";
import logo from "../pics/848.jpg";
import Navbar from "./Navbar";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogout = () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (!ok) return;

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const loadProfile = async () => {
      setErrorMsg("");

      // 1) اقرأ اليوزر من localStorage
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setErrorMsg("No user found. Please login again.");
        setLoading(false);
        return;
      }

      let userObj = null;
      try {
        userObj = JSON.parse(userStr);
      } catch (e) {
        setErrorMsg("Corrupted user data. Please login again.");
        setLoading(false);
        return;
      }

      // 2) خد الـ ID (عندك في الباك اسمه UserID)
      const userId = userObj?.userID;
      if (!userId) {
        setErrorMsg("UserID is missing. Please login again.");
        setLoading(false);
        return;
      }

      // 3) نجيب بيانات البروفايل من الباك
      try {
        const res = await api.get(`/api/Users/profile/${userId}`);
        setUserData(res.data);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.title ||
          "Failed to load profile";
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="profile-page">
        {/* Loading / Error */}
        {loading ? (
          <p style={{ padding: "20px", color: "#fff" }}>Loading profile...</p>
        ) : errorMsg ? (
          <p style={{ padding: "20px", color: "salmon" }}>{errorMsg}</p>
        ) : (
          <>
            <div className="user-card">
              <div className="user-image">
                <img src={logo} alt="profile" />
              </div>

              <div className="user-details">
                <h2 className="name">{userData?.fullName || "—"}</h2>

                <div className="info-grid">
                  <p>
                    <strong>Blood Type:</strong> {userData?.bloodType || "—"}
                  </p>

                  <p>
                    <strong>Phone Number:</strong> {userData?.phone || "—"}
                  </p>

                  <p>
                    <strong>Address:</strong> {userData?.city || "—"}
                  </p>
                </div>

                {/* LOG OUT BUTTON */}
                <div style={{ marginTop: "14px" }}>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Log out
                  </button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;