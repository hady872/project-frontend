// src/components/Book.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../styles/Book.scss";
import Navbar from "./Navbar";
import img1 from "../pics/13.png";
import img2 from "../pics/14.jpg";
import { useLocation, useNavigate } from "react-router-dom";

function BookDonation() {
  const location = useLocation();
  const navigate = useNavigate();

  const requestID = location?.state?.requestID; 
  const preselectedBloodType = useMemo(() => (location?.state?.bloodType || "").toUpperCase().trim(), [location]);
  const preselectedHospital = useMemo(() => (location?.state?.hospital || "").trim(), [location]);
  const preselectedUrgency = useMemo(() => (location?.state?.urgency || "").trim(), [location]);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const lockBloodType = Boolean(preselectedBloodType);
  const lockCenter = Boolean(preselectedHospital);

  const [selectedBlood, setSelectedBlood] = useState("");
  const [centerName, setCenterName] = useState("");
  const [day, setDay] = useState("");
  const [clock, setClock] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [phone, setPhone] = useState("");
  const [medications, setMedications] = useState(""); 
  const [surgery, setSurgery] = useState(""); 
  const [donatedBefore, setDonatedBefore] = useState(""); 
  const [infection, setInfection] = useState(""); 
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (preselectedBloodType) setSelectedBlood(preselectedBloodType);
    if (preselectedHospital) setCenterName(preselectedHospital);
  }, [preselectedBloodType, preselectedHospital]);

  const validate = () => {
    if (!centerName.trim() || !selectedBlood || !fullName.trim() || !phone.trim() || !day || !clock) 
      return "Please fill all required fields.";
    if (!weight || Number(weight) <= 0) return "Please enter a valid weight.";
    if (!medications || !surgery || !donatedBefore || !infection) return "Please answer all health questions.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }

    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    const userID = userObj?.userID;

    if (!userID) {
      setErrorMsg("User session expired. Please login again.");
      return;
    }

    // ✅ تم تحديث الكائن ليرسل كافة البيانات الحقيقية إلى قاعدة البيانات
    const donationData = {
      UserID: parseInt(userID),
      HospitalRequestID: requestID ? parseInt(requestID) : null,
      DonationDate: `${day}T${clock}:00`,
      BloodType: selectedBlood,
      Status: "Pending",
      // الحقول الإضافية التي تم تفعيلها في الـ Migration
      FullName: fullName,
      Phone: phone,
      Weight: parseFloat(weight),
      Medications: medications,
      RecentSurgery: surgery,
      DonatedBefore: donatedBefore,
      RecentInfection: infection,
      CenterName: centerName
    };

    try {
      const response = await fetch("http://localhost:5240/api/Donations/CreateDonation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Donation booked successfully!");
        navigate("/profile", { replace: true });
      } else {
        if (result.errors) {
            const errorFields = Object.keys(result.errors).join(", ");
            setErrorMsg(`Field Error: ${errorFields}. Check the console for details.`);
        } else {
            setErrorMsg(result.message || "Failed to save donation.");
        }
      }
    } catch (error) {
      setErrorMsg("Server connection error. Is the backend running?");
    }
  };

  return (
    <div className="book-donation">
      <Navbar />
      <div className="content">
        <form className="donation-form" onSubmit={onSubmit} noValidate>
          <h2>Booking Donation</h2>
          
          {preselectedUrgency && (
            <div style={{ marginTop: 6, marginBottom: 12, opacity: 0.85 }}>
              Urgency Level: <b>{preselectedUrgency}</b>
            </div>
          )}

          {errorMsg && (
            <div style={{ color: "white", background: "#e74c3c", padding: "10px", borderRadius: "8px", marginBottom: "15px" }}>
              {errorMsg}
            </div>
          )}

          <label>Center</label>
          <input type="text" value={centerName} onChange={(e) => setCenterName(e.target.value)} readOnly={lockCenter} />

          <label>Day</label>
          <input type="date" value={day} onChange={(e) => setDay(e.target.value)} />

          <label>Clock</label>
          <input type="time" value={clock} onChange={(e) => setClock(e.target.value)} />

          <label>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <label>Birth Date</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />

          <label>Phone Number</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <div className="section">
            <label>Blood Type</label>
            <div className="blood-type">
              {bloodTypes.map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    checked={selectedBlood === type}
                    onChange={() => setSelectedBlood(type)}
                    disabled={lockBloodType && selectedBlood !== type}
                  /> {type}
                </label>
              ))}
            </div>
          </div>

          {[
            { label: "Taking medications?", state: medications, set: setMedications, name: "med" },
            { label: "Surgeries (past 6 months)?", state: surgery, set: setSurgery, name: "surg" },
            { label: "Donated blood before?", state: donatedBefore, set: setDonatedBefore, name: "don" },
            { label: "Recent infections?", state: infection, set: setInfection, name: "inf" },
          ].map((q) => (
            <div className="section" key={q.name}>
              <label>{q.label}</label>
              <div className="options">
                <label><input type="radio" checked={q.state === "Yes"} onChange={() => q.set("Yes")} /> Yes</label>
                <label><input type="radio" checked={q.state === "No"} onChange={() => q.set("No")} /> No</label>
              </div>
            </div>
          ))}

          <button type="submit" className="confirm-btn">Confirm</button>
        </form>
        <div className="images">
          <img src={img1} alt="lab" />
          <img src={img2} alt="lab" />
        </div>
      </div>
    </div>
  );
}

export default BookDonation;
// sync with back git commit -m "Successfully migrated to SQLite and verified build"
