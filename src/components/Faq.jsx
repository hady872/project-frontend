// src/components/Faq.jsx
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import "../styles/Faq.scss";
import { FaTint, FaTimesCircle, FaCheck } from "react-icons/fa";

//--------------------------------------------------------
const FAQ = () => {
  // ✅ نجيب نوع الحساب
  const accountType = useMemo(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      return (u?.accountType || "").toLowerCase().trim();
    } catch {
      return "";
    }
  }, []);

  const isHospital = accountType === "hospital";

  // ===================== Hospital: My Requests =====================
  const [myRequests, setMyRequests] = useState([]);

  // Edit state
  const [editingIndex, setEditingIndex] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editUrgency, setEditUrgency] = useState("");
  const [editError, setEditError] = useState("");

  const loadRequests = () => {
    const raw = localStorage.getItem("hospitalRequests");
    if (!raw) {
      setMyRequests([]);
      return;
    }
    try {
      const arr = JSON.parse(raw);
      setMyRequests(Array.isArray(arr) ? arr : []);
    } catch {
      setMyRequests([]);
    }
  };

  useEffect(() => {
    if (!isHospital) return;
    loadRequests();
  }, [isHospital]);

  const startEdit = (idx, currentAmount, currentUrgency) => {
    setEditError("");
    setEditingIndex(idx);
    setEditAmount(String(currentAmount ?? ""));
    setEditUrgency(String(currentUrgency ?? "").toLowerCase());
  };

  const cancelEdit = () => {
    setEditError("");
    setEditingIndex(null);
    setEditAmount("");
    setEditUrgency("");
  };

  const saveEdit = (idxInReversedList) => {
    setEditError("");

    // ✅ validate amount
    const n = Number(editAmount);
    if (!editAmount || Number.isNaN(n) || n <= 0) {
      setEditError("Please enter a valid amount (number > 0).");
      return;
    }

    // ✅ validate urgency
    const u = (editUrgency || "").toLowerCase().trim();
    const allowed = ["high", "medium", "low"];
    if (!allowed.includes(u)) {
      setEditError("Please choose a valid urgency (high / medium / low).");
      return;
    }

    // لأننا بنعرض Reverse، فلازم نعدّل على النسخة الأصلية صح
    const original = myRequests.slice();
    const reversed = original.slice().reverse();

    const target = reversed[idxInReversedList];
    if (!target) return;

    target.amount = n;
    target.urgency = u;

    // رجّعها تاني للأصل
    const updatedOriginal = reversed.slice().reverse();

    localStorage.setItem("hospitalRequests", JSON.stringify(updatedOriginal));
    setMyRequests(updatedOriginal);

    cancelEdit();
  };

  const formatBookedAt = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(iso);
    return d.toLocaleString();
  };

  // لو مستشفى: اعرض My Requests (كروت + Edit + Donations)
  if (isHospital) {
    const displayList = myRequests.slice().reverse();

    return (
      <div className="faq-page hospital-requests">
        <Navbar />

        <div className="faq-content">
          {/* ✅ شيلنا عنوان My Requests اللي فوق الطلبات */}

          {displayList.length === 0 ? (
            <p className="empty-state">You have no requests yet.</p>
          ) : (
            <div className="requests-grid">
              {displayList.map((r, idx) => {
                const isEditing = editingIndex === idx;

                const donations = Array.isArray(r?.donations) ? r.donations : [];
                const donationsCount = donations.length;

                return (
                  <div className="request-card" key={idx}>
                    <div className="request-card__top">
                      <h3 className="request-card__title">
                        {r?.hospital || "Hospital"}
                      </h3>

                      {!isEditing ? (
                        <button
                          type="button"
                          className="btn btn-edit"
                          onClick={() => startEdit(idx, r?.amount, r?.urgency)}
                        >
                          Edit
                        </button>
                      ) : (
                        <div className="edit-actions">
                          <button
                            type="button"
                            className="btn btn-save"
                            onClick={() => saveEdit(idx)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-cancel"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="request-card__body">
                      <div className="row">
                        <span className="label">Blood Type</span>
                        <span className="value">{r?.bloodType || "—"}</span>
                      </div>

                      <div className="row">
                        <span className="label">Amount</span>

                        {!isEditing ? (
                          <span className="value">{r?.amount || "—"}</span>
                        ) : (
                          <div className="amount-edit">
                            <input
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="amount-input"
                              placeholder="Enter amount"
                              inputMode="numeric"
                            />
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <span className="label">Urgency</span>

                        {!isEditing ? (
                          <span className="value">
                            {r?.urgency ? String(r.urgency) : "—"}
                          </span>
                        ) : (
                          <div className="urgency-edit">
                            <select
                              className="amount-input"
                              value={editUrgency}
                              onChange={(e) => setEditUrgency(e.target.value)}
                            >
                              <option value="">Select urgency</option>
                              <option value="high">high</option>
                              <option value="medium">medium</option>
                              <option value="low">low</option>
                            </select>
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <span className="label">Contact</span>
                        <span className="value">{r?.contact || "—"}</span>
                      </div>

                      <div className="row">
                        <span className="label">Location</span>
                        <span className="value">{r?.location || "—"}</span>
                      </div>

                      {r?.createdAt ? (
                        <div className="row">
                          <span className="label">Created</span>
                          <span className="value">{r.createdAt}</span>
                        </div>
                      ) : null}

                      {isEditing && editError ? (
                        <p className="edit-error">{editError}</p>
                      ) : null}

                      {/* ===================== Donations ===================== */}
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 10,
                          borderTop: "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 10,
                            flexWrap: "wrap",
                          }}
                        >
                          <strong>Donations</strong>
                          <span style={{ opacity: 0.85 }}>
                            Count: <b>{donationsCount}</b>
                          </span>
                        </div>

                        {donationsCount === 0 ? (
                          <p style={{ marginTop: 8, opacity: 0.8 }}>
                            No donations yet.
                          </p>
                        ) : (
                          <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                            {donations
                              .slice()
                              .sort((a, b) => {
                                const ta = new Date(a?.bookedAt || 0).getTime();
                                const tb = new Date(b?.bookedAt || 0).getTime();
                                return tb - ta;
                              })
                              .map((d, di) => (
                                <div
                                  key={di}
                                  style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    background: "rgba(0,0,0,0.03)",
                                    border: "1px solid rgba(0,0,0,0.06)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      flexWrap: "wrap",
                                      gap: 10,
                                    }}
                                  >
                                    <div>
                                      <strong>Donor:</strong>{" "}
                                      {d?.donorName || "—"}
                                    </div>
                                    <div>
                                      <strong>Phone:</strong> {d?.phone || "—"}
                                    </div>
                                  </div>

                                  <div style={{ marginTop: 6, opacity: 0.95 }}>
                                    <strong>Day:</strong> {d?.day || "—"}{" "}
                                    {"  "}
                                    <strong>Clock:</strong> {d?.clock || "—"}
                                  </div>

                                  {d?.bookedAt ? (
                                    <div style={{ marginTop: 6, opacity: 0.8 }}>
                                      <strong>Booked:</strong>{" "}
                                      {formatBookedAt(d.bookedAt)}
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      {/* ===================================================== */}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===================== User: FAQ (كما هي) =====================
  return (
    <div className="faq-page">
      <Navbar />
      <div className="faq-content">
        <h1>Frequently Asked Questions</h1>

        <div className="faq-section">
          <h3>
            <FaTint className="icon red" /> Who Can Donate?
          </h3>
          <ul>
            <li>Age: Between 18 and 60 years old</li>
            <li>Weight: At least 50 kg (110 lbs)</li>
            <li>
              Health: Must be in good health — no fever, infections, or chronic
              diseases
            </li>
            <li>Interval: Wait at least 3 months between donations.</li>
          </ul>
        </div>

        <div className="faq-section">
          <h3>
            <FaTimesCircle className="icon danger" /> Who Should Not Donate?
          </h3>
          <ul>
            <li>Anyone who recently had surgery or an infection.</li>
            <li>Pregnant or breastfeeding women.</li>
            <li>People who recently got tattoos or piercings (within 6 months).</li>
            <li>
              Anyone who tested positive for hepatitis, HIV, or other blood-related
              diseases.
            </li>
          </ul>
        </div>

        <div className="faq-section">
          <h3>
            <FaCheck className="icon green" /> Required Tests Before Donation
          </h3>
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