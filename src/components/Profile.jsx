// src/components/Profile.jsx

import React, { useEffect, useMemo, useState } from "react";
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

  // ===== Bookings state (from localStorage) =====
  const [bookings, setBookings] = useState([]);

  // ===== Edit state =====
  const [editingKey, setEditingKey] = useState(null);
  const [editDonorName, setEditDonorName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDay, setEditDay] = useState("");
  const [editClock, setEditClock] = useState("");
  const [editError, setEditError] = useState("");

  const loggedUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, []);

  const ownerUserID = loggedUser?.userID;

  const handleLogout = () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (!ok) return;

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    navigate("/login", { replace: true });
  };

  // ===== localStorage helpers =====
  const readAllBookings = () => {
    try {
      const raw = localStorage.getItem("userBookings");
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  const writeAllBookings = (arr) => {
    localStorage.setItem("userBookings", JSON.stringify(arr));
  };

  // مفتاح ثابت للحجز (لو عندك bookingId مستقبلاً هنستعمله)
  const bookingKey = (b) => String(b?.bookingId || b?.createdAt || "");

  const loadBookingsForThisUser = () => {
    const arr = readAllBookings();

    const mine = ownerUserID
      ? arr.filter((b) => String(b?.ownerUserID) === String(ownerUserID))
      : [];

    // الأحدث فوق
    mine.sort((a, b) => {
      const ta = new Date(a?.createdAt || 0).getTime();
      const tb = new Date(b?.createdAt || 0).getTime();
      return tb - ta;
    });

    setBookings(mine);
  };

  useEffect(() => {
    const loadProfile = async () => {
      setErrorMsg("");

      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setErrorMsg("No user found. Please login again.");
        setLoading(false);
        return;
      }

      let userObj = null;
      try {
        userObj = JSON.parse(userStr);
      } catch {
        setErrorMsg("Corrupted user data. Please login again.");
        setLoading(false);
        return;
      }

      const userId = userObj?.userID;
      if (!userId) {
        setErrorMsg("UserID is missing. Please login again.");
        setLoading(false);
        return;
      }

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

  // load bookings
  useEffect(() => {
    loadBookingsForThisUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerUserID]);

  const formatCreatedAt = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleString();
  };

  // ===== Delete booking =====
  const deleteBooking = (key) => {
    const ok = window.confirm("Are you sure you want to delete this booking?");
    if (!ok) return;

    const all = readAllBookings();
    const updated = all.filter((b) => {
      // نحذف حجز واحد يخص نفس صاحب الحساب ونفس المفتاح
      const sameOwner = String(b?.ownerUserID) === String(ownerUserID);
      const sameKey = bookingKey(b) === String(key);
      return !(sameOwner && sameKey);
    });

    writeAllBookings(updated);
    loadBookingsForThisUser();
  };

  // ===== Edit booking =====
  const startEdit = (b) => {
    setEditError("");
    const key = bookingKey(b);
    setEditingKey(key);

    setEditDonorName(String(b?.donorName || ""));
    setEditPhone(String(b?.phone || ""));
    setEditDay(String(b?.day || ""));
    setEditClock(String(b?.clock || ""));
  };

  const cancelEdit = () => {
    setEditError("");
    setEditingKey(null);
    setEditDonorName("");
    setEditPhone("");
    setEditDay("");
    setEditClock("");
  };

  const saveEdit = (key) => {
    setEditError("");

    if (!editDonorName.trim()) return setEditError("Please enter donor name.");
    if (!editPhone.trim()) return setEditError("Please enter phone number.");
    if (!editDay) return setEditError("Please select day.");
    if (!editClock) return setEditError("Please select time.");

    const all = readAllBookings();

    const updated = all.map((b) => {
      const sameOwner = String(b?.ownerUserID) === String(ownerUserID);
      const sameKey = bookingKey(b) === String(key);

      if (!sameOwner || !sameKey) return b;

      return {
        ...b,
        donorName: editDonorName.trim(),
        phone: editPhone.trim(),
        day: editDay,
        clock: editClock,
        // optional timestamp for tracking edits
        updatedAt: new Date().toISOString(),
      };
    });

    writeAllBookings(updated);
    loadBookingsForThisUser();
    cancelEdit();
  };

  return (
    <div>
      <Navbar />

      <div className="profile-page">
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

            {/* ===== BOOKINGS FROM THIS ACCOUNT ===== */}
            <div className="section">
              <h3>Bookings From This Account</h3>

              {bookings.length === 0 ? (
                <p style={{ opacity: 0.85, marginTop: 10 }}>No bookings yet.</p>
              ) : (
                <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                  {bookings.map((b, idx) => {
                    const key = bookingKey(b) || String(idx);
                    const isEditing = editingKey === key;

                    return (
                      <div
                        key={key}
                        style={{
                          padding: 14,
                          borderRadius: 12,
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {/* Top row: actions */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 10,
                          }}
                        >
                          <div style={{ opacity: 0.9 }}>
                            <strong>Booking #{idx + 1}</strong>
                          </div>

                          {!isEditing ? (
                            <div style={{ display: "flex", gap: 8 }}>
                              <button
                                type="button"
                                onClick={() => startEdit(b)}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: 10,
                                  border: "none",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                }}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => deleteBooking(key)}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: 10,
                                  border: "none",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <div style={{ display: "flex", gap: 8 }}>
                              <button
                                type="button"
                                onClick={() => saveEdit(key)}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: 10,
                                  border: "none",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                }}
                              >
                                Save
                              </button>

                              <button
                                type="button"
                                onClick={cancelEdit}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: 10,
                                  border: "none",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>

                        {isEditing && editError ? (
                          <p style={{ marginTop: 10, color: "salmon" }}>
                            {editError}
                          </p>
                        ) : null}

                        {/* Main info */}
                        <div style={{ marginTop: 10, opacity: 0.95 }}>
                          {/* Donor / Blood / Phone */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              gap: 10,
                            }}
                          >
                            <div>
                              <strong>Donor Name:</strong>{" "}
                              {!isEditing ? (
                                b?.donorName || "—"
                              ) : (
                                <input
                                  value={editDonorName}
                                  onChange={(e) => setEditDonorName(e.target.value)}
                                  style={{
                                    marginLeft: 8,
                                    padding: "6px 8px",
                                    borderRadius: 8,
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    background: "transparent",
                                    color: "inherit",
                                  }}
                                />
                              )}
                            </div>

                            <div>
                              <strong>Blood Type:</strong> {b?.bloodType || "—"}
                            </div>

                            <div>
                              <strong>Phone:</strong>{" "}
                              {!isEditing ? (
                                b?.phone || "—"
                              ) : (
                                <input
                                  value={editPhone}
                                  onChange={(e) => setEditPhone(e.target.value)}
                                  style={{
                                    marginLeft: 8,
                                    padding: "6px 8px",
                                    borderRadius: 8,
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    background: "transparent",
                                    color: "inherit",
                                  }}
                                />
                              )}
                            </div>
                          </div>

                          <div style={{ marginTop: 8 }}>
                            <strong>Center:</strong> {b?.center || "—"}{" "}
                            {b?.urgency ? (
                              <>
                                {" "}
                                | <strong>Urgency:</strong> {b.urgency}
                              </>
                            ) : null}
                          </div>

                          <div style={{ marginTop: 6 }}>
                            <strong>Day:</strong>{" "}
                            {!isEditing ? (
                              b?.day || "—"
                            ) : (
                              <input
                                type="date"
                                value={editDay}
                                onChange={(e) => setEditDay(e.target.value)}
                                style={{
                                  marginLeft: 8,
                                  padding: "6px 8px",
                                  borderRadius: 8,
                                  border: "1px solid rgba(255,255,255,0.2)",
                                  background: "transparent",
                                  color: "inherit",
                                }}
                              />
                            )}{" "}
                            {"  "}
                            <strong>Clock:</strong>{" "}
                            {!isEditing ? (
                              b?.clock || "—"
                            ) : (
                              <input
                                type="time"
                                value={editClock}
                                onChange={(e) => setEditClock(e.target.value)}
                                style={{
                                  marginLeft: 8,
                                  padding: "6px 8px",
                                  borderRadius: 8,
                                  border: "1px solid rgba(255,255,255,0.2)",
                                  background: "transparent",
                                  color: "inherit",
                                }}
                              />
                            )}{" "}
                            {"  "}
                            <strong>Weight:</strong> {String(b?.weight ?? "—")}{" "}
                            {"  "}
                            <strong>Birth Date:</strong> {b?.birthDate || "—"}
                          </div>

                          <div style={{ marginTop: 6 }}>
                            <strong>Medications:</strong> {b?.medications || "—"}{" "}
                            {"  "}
                            <strong>Surgery:</strong> {b?.surgery || "—"}{" "}
                            {"  "}
                            <strong>Donated Before:</strong>{" "}
                            {b?.donatedBefore || "—"}{" "}
                            {"  "}
                            <strong>Infection:</strong> {b?.infection || "—"}
                          </div>

                          {b?.createdAt ? (
                            <div style={{ marginTop: 6, opacity: 0.8 }}>
                              <strong>Created:</strong>{" "}
                              {formatCreatedAt(b.createdAt)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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