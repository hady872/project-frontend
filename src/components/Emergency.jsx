// src/components/Emergency.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Emergency.scss";
import Navbar from "./Navbar";
import api from "../api";
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
  const hospitalName =
    (loggedHospital?.fullName || loggedHospital?.name || "Hospital").trim();

  const [form, setForm] = useState({
    patientName: "",
    amount: "",
    contact: "",
    location: "",
    bloodType: "",
    urgency: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const err = {};

    if (!form.patientName.trim()) err.patientName = "Required";
    if (!String(form.amount).trim()) err.amount = "Required";
    if (!form.contact.trim()) err.contact = "Required";
    if (!form.location.trim()) err.location = "Required";
    if (!form.bloodType) err.bloodType = "Choose blood type";
    if (!form.urgency) err.urgency = "Choose urgency";

    if (!hospitalUserID) err.hospitalUserID = "Please login as hospital again.";
    if (!hospitalName) err.hospitalName = "Hospital name is missing in account.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    const payload = {
      hospitalUserID: Number(hospitalUserID), // ✅ int زي الموديل في الباك
      hospitalName,
      patientName: form.patientName.trim(),
      amount: Number(form.amount),
      bloodType: form.bloodType,
      urgency: form.urgency,
      contact: form.contact.trim(),
      location: form.location.trim(),
      // createdAt: الباك هيحطه تلقائي (Default DateTime.Now)
    };

    setIsSubmitting(true);
    try {
      await api.post("/api/HospitalRequests/Create", payload);

      // ✅ بعد نجاح الحفظ في الداتابيز
      navigate("/faq");
    } catch (err) {
      // رسائل واضحة حسب رد الباك
      const backendMsg =
        err?.response?.data?.message ||
        err?.response?.data?.title ||
        (typeof err?.response?.data === "string" ? err.response.data : null);

      const validationErrors = err?.response?.data?.errors;
      if (validationErrors) {
        const firstKey = Object.keys(validationErrors)[0];
        const firstMsg = validationErrors[firstKey]?.[0];
        setSubmitError(firstMsg || "Please check your inputs.");
      } else {
        setSubmitError(backendMsg || "Failed to submit request.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="request-page">
      <Navbar />

      <main className="form-area">
        <h1 className="title">Request form</h1>

        <form className="request-form" onSubmit={onSubmit} noValidate>
          {/* LEFT COLUMN */}
          <div className="left-col">
            <label className="field-label">Patient Name</label>
            <input
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              className="input-pill"
              placeholder="Enter patient name"
            />
            {errors.patientName && (
              <small className="err">{errors.patientName}</small>
            )}

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
            {errors.location && (
              <small className="err">{errors.location}</small>
            )}

            {errors.hospitalUserID ? (
              <small className="err">{errors.hospitalUserID}</small>
            ) : null}

            {errors.hospitalName ? (
              <small className="err">{errors.hospitalName}</small>
            ) : null}

            {submitError ? <small className="err">{submitError}</small> : null}
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col">
            <div className="box blood-box">
              <p className="box-title">Blood Type</p>
              <div className="grid-blood">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
                  <label
                    key={bt}
                    className={`radio-pill ${
                      form.bloodType === bt ? "active" : ""
                    }`}
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
              {errors.bloodType && (
                <small className="err">{errors.bloodType}</small>
              )}
            </div>

            <div className="box urgency-box">
              <p className="box-title">Urgency Level</p>
              <div className="urgency-list">
                {["high", "medium", "low"].map((u) => (
                  <label
                    key={u}
                    className={`urgency-pill ${
                      form.urgency === u ? "active" : ""
                    }`}
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
              {errors.urgency && (
                <small className="err">{errors.urgency}</small>
              )}
            </div>
          </div>

          {/* ✅ Submit button */}
          <div className="submit-wrap">
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
//--------------------------------------------------------

export default RequestForm;