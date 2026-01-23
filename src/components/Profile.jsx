// src/components/Profile.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../styles/Profile.scss";
import logo from "../pics/848.jpg";
import Navbar from "./Navbar";
import api from "../api"; 
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [bookings, setBookings] = useState([]);

  const loggedUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, []);

  const ownerUserID = loggedUser?.userID ? Number(loggedUser.userID) : null;
  const isHospital = loggedUser?.accountType?.toLowerCase().trim() === "hospital";

  const handleLogout = () => {
    if (!window.confirm("Are you sure?")) return;
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

  const loadBookingsFromAPI = async () => {
    if (!ownerUserID || isHospital) return;
    try {
      const res = await api.get("/api/Donations/GetAll");
      // فلترة لجلب التبرعات الخاصة بهذا المستخدم فقط
      const mine = res.data.filter(d => 
        (Number(d.UserID) === ownerUserID) || 
        (Number(d.userID) === ownerUserID) || 
        (Number(d.userId) === ownerUserID)
      );
      setBookings(mine);
    } catch (err) {
      console.error("Error loading donations:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!ownerUserID) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/api/Users/profile/${ownerUserID}`);
        setUserData(res.data);
        await loadBookingsFromAPI();
      } catch (err) {
        setErrorMsg("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [ownerUserID]);

  const deleteBooking = async (donationID) => {
    if (!window.confirm("Delete this donation?")) return;
    try {
      await api.delete(`/api/Donations/${donationID}`);
      setBookings(prev => prev.filter(b => 
        (b.DonationID !== donationID) && (b.donationID !== donationID) && (b.donationId !== donationID)
      ));
    } catch (err) {
      alert("Failed to delete donation.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        {loading ? (
          <p className="status-text">Loading profile...</p>
        ) : errorMsg ? (
          <p className="status-text error">{errorMsg}</p>
        ) : (
          <>
            <div className="user-card">
              <div className="user-image"><img src={logo} alt="profile" /></div>
              <div className="user-details">
                <h2 className="name">{userData?.fullName || "User"}</h2>
                {!isHospital && (
                  <div className="info-grid">
                    <p><strong>Blood Type:</strong> {userData?.bloodType || "—"}</p>
                    <p><strong>Phone:</strong> {userData?.phone || "—"}</p>
                    <p><strong>Address:</strong> {userData?.city || "—"}</p>
                  </div>
                )}
                <button onClick={handleLogout} className="logout-btn">Log out</button>
              </div>
            </div>

            {!isHospital && (
              <div className="section">
                <h3 className="section-title">Your Donation Records</h3>
                {bookings.length === 0 ? (
                  <p className="no-data">No donations found in your history.</p>
                ) : (
                  <div className="bookings-list">
                    {bookings.map((b) => {
                      const dID = b.DonationID || b.donationID || b.donationId;
                      // استخدام البيانات الحقيقية من الداتابيز أو userData كخيار احتياطي
                      const displayName = b.FullName || b.fullName || userData?.fullName;
                      const displayPhone = b.Phone || b.phone || userData?.phone;
                      const displayCenter = b.CenterName || b.centerName || "Not Specified";
                      const displayWeight = b.Weight || b.weight || "—";

                      return (
                        <div key={dID} className="booking-item-card">
                          <div className="card-header">
                            <span className="id-badge">ID: #{dID}</span>
                            <span className={`status-badge ${b.Status?.toLowerCase() || b.status?.toLowerCase() || 'pending'}`}>
                              {b.Status || b.status}
                            </span>
                          </div>
                          
                          <div className="card-body">
                            <div className="info-section">
                              <h4><i className="fa fa-user"></i> Personal Info</h4>
                              <p><strong>Donor Name:</strong> {displayName}</p>
                              <p><strong>Phone:</strong> {displayPhone}</p>
                              <p><strong>Weight:</strong> {displayWeight} kg</p>
                            </div>
                            
                            <div className="vertical-divider"></div>
                            
                            <div className="info-section">
                              <h4><i className="fa fa-hospital"></i> Donation Info</h4>
                              <p><strong>Center:</strong> {displayCenter}</p>
                              <p><strong>Blood Type:</strong> <span className="highlight-blood">{b.BloodType || b.bloodType}</span></p>
                              <p><strong>Date:</strong> {new Date(b.DonationDate || b.donationDate).toLocaleDateString()}</p>
                            </div>
                          </div>

                          <div className="card-footer">
                            <button onClick={() => deleteBooking(dID)} className="delete-action-btn">
                              Delete Record
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;