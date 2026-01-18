// src/components/Emergency.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Emergency.scss";
import Navbar from "./Navbar";
//--------------------------------------------------------

const RequestForm = () => {
  const navigate = useNavigate();

  const loggedHospital = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, []);

  const hospitalUserID = loggedHospital?.userID; // ✅ صاحب حساب المستشفى

  const [form, setForm] = useState({
    hospital: "",
    amount: "",
    contact: "",
    location: "",
    bloodType: "",
    urgency: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.hospital.trim()) err.hospital = "Required";
    if (!String(form.amount).trim()) err.amount = "Required";
    if (!form.contact.trim()) err.contact = "Required";
    if (!form.location.trim()) err.location = "Required";
    if (!form.bloodType) err.bloodType = "Choose blood type";
    if (!form.urgency) err.urgency = "Choose urgency";

    // ✅ مهم: لازم يكون فعلاً داخل بحساب مستشفى
    if (!hospitalUserID) err.hospitalUserID = "Please login as hospital again.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const makeRequestId = () => {
    return `REQ_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newRequest = {
      requestId: makeRequestId(), // ✅ مهم لربط Donate بالطلب
      hospitalUserID: String(hospitalUserID), // ✅ صاحب الطلب

      hospital: form.hospital.trim(),
      amount: Number(form.amount),
      contact: form.contact.trim(),
      location: form.location.trim(),
      bloodType: form.bloodType,
      urgency: form.urgency,

      createdAt: new Date().toLocaleString(),
    };

    try {
      const raw = localStorage.getItem("hospitalRequests");
      const arr = raw ? JSON.parse(raw) : [];
      const safeArr = Array.isArray(arr) ? arr : [];

      safeArr.push(newRequest);
      localStorage.setItem("hospitalRequests", JSON.stringify(safeArr));
    } catch {
      localStorage.setItem("hospitalRequests", JSON.stringify([newRequest]));
    }

    // ✅ روح لصفحة My Requests (FAQ للمستشفى)
    navigate("/faq");
  };

  return (
    <div className="request-page">
      <Navbar />

      <main className="form-area">
        <h1 className="title">Request form</h1>

        <form className="request-form" onSubmit={onSubmit} noValidate>
          {/* LEFT COLUMN */}
          <div className="left-col">
            <label className="field-label">Hospital</label>
            <input
              name="hospital"
              value={form.hospital}
              onChange={handleChange}
              className="input-pill"
              placeholder="Enter Hospital Name"
            />
            {errors.hospital && <small className="err">{errors.hospital}</small>}

            <label className="field-label">Amount</label>
            <input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="input-pill"
              placeholder="Enter number of unit"
              inputMode="numeric"
            />
            {errors.amount && <small className="err">{errors.amount}</small>}

            <label className="field-label">Email Or Phone Number</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="input-pill"
              placeholder="Enter your email or number"
            />
            {errors.contact && <small className="err">{errors.contact}</small>}

            <label className="field-label">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="input-pill"
              placeholder="Enter hospital location"
            />
            {errors.location && <small className="err">{errors.location}</small>}

            {/* ✅ لو مش داخل كمستشفى */}
            {errors.hospitalUserID ? (
              <small className="err">{errors.hospitalUserID}</small>
            ) : null}
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col">
            <div className="box blood-box">
              <p className="box-title">Blood Type</p>
              <div className="grid-blood">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
                  <label
                    key={bt}
                    className={`radio-pill ${form.bloodType === bt ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="bloodType"
                      value={bt}
                      checked={form.bloodType === bt}
                      onChange={handleChange}
                    />
                    <span className="bt-text">{bt}</span>
                  </label>
                ))}
              </div>
              {errors.bloodType && <small className="err">{errors.bloodType}</small>}
            </div>

            <div className="box urgency-box">
              <p className="box-title">Urgency Level</p>
              <div className="urgency-list">
                {["high", "medium", "low"].map((u) => (
                  <label
                    key={u}
                    className={`urgency-pill ${form.urgency === u ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={u}
                      checked={form.urgency === u}
                      onChange={handleChange}
                    />
                    <span className="u-text">{u}</span>
                  </label>
                ))}
              </div>
              {errors.urgency && <small className="err">{errors.urgency}</small>}
            </div>
          </div>

          {/* ✅ Submit button */}
          <div className="submit-wrap">
            <button type="submit" className="submit-btn">
              Submit Request
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
//--------------------------------------------------------

export default RequestForm;