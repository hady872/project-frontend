// src/components/Book.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../styles/Book.scss";
import Navbar from "./Navbar";
import img1 from "../pics/13.png";
import img2 from "../pics/14.jpg";
import { Link, useLocation } from "react-router-dom";
//--------------------------------------------------------
function BookDonation() {
  const location = useLocation();

  // الدم اللي جاي من صفحة Request (لو موجود)
  const preselectedBloodType = useMemo(() => {
    const bt = location?.state?.bloodType;
    return (bt || "").toUpperCase().trim();
  }, [location]);

  const [selectedBlood, setSelectedBlood] = useState("");

  useEffect(() => {
    if (preselectedBloodType) {
      setSelectedBlood(preselectedBloodType);
    }
  }, [preselectedBloodType]);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const lockBloodType = Boolean(preselectedBloodType); // لو جاي من requests -> نقفّل الاختيار

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

            {/* لو جاي من Request: نوضح للمستخدم إن النوع متحدد تلقائياً */}
            {lockBloodType ? (
              <p style={{ marginTop: 6, marginBottom: 10, opacity: 0.85 }}>
                Blood type is pre-selected from the request: <b>{preselectedBloodType}</b>
              </p>
            ) : null}

            <div className="blood-type">
              {bloodTypes.map((type) => {
                const checked = selectedBlood === type;

                return (
                  <label key={type}>
                    <input
                      type="radio"
                      name="blood"
                      checked={checked}
                      onChange={() => setSelectedBlood(type)}
                      // ✅ لو جاي من requests: نقفل كل الأنواع ماعدا النوع المختار
                      disabled={lockBloodType && !checked}
                    />{" "}
                    {type}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="section">
            <label>Are you currently taking any medications?</label>
            <div className="options">
              <label>
                <input type="radio" name="medications" /> Yes
              </label>
              <label>
                <input type="radio" name="medications" /> No
              </label>
            </div>
          </div>

          <div className="section">
            <label>Have you had any surgeries in the past 6 months?</label>
            <div className="options">
              <label>
                <input type="radio" name="surgery" /> Yes
              </label>
              <label>
                <input type="radio" name="surgery" /> No
              </label>
            </div>
          </div>

          <div className="section">
            <label>Have you donated blood before?</label>
            <div className="options">
              <label>
                <input type="radio" name="donated" /> Yes
              </label>
              <label>
                <input type="radio" name="donated" /> No
              </label>
            </div>
          </div>

          <div className="section">
            <label>Have you recently had any infections (Hepatitis, COVID-19, etc)?</label>
            <div className="options">
              <label>
                <input type="radio" name="infection" /> Yes
              </label>
              <label>
                <input type="radio" name="infection" /> No
              </label>
            </div>
          </div>

          <Link to="/donation" type="submit" className="confirm-btn">
            Confirm
          </Link>
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