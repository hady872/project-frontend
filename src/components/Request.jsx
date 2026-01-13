import React from "react";
import { Link } from "react-router-dom";
import "../styles/Request.scss";
import Navbar from "./Navbar";
//--------------------------------------------------------

const data = [
  {
    hospital: "Ismailia Medical Complex",
    type: "+O",
    level: "High",
    distance: "2.5 KM Away",
    time: "20 Minutes",
    color: "red",
  },
  {
    hospital: "Ismailia Medical Complex",
    type: "+A",
    level: "High",
    distance: "2.5 KM Away",
    time: "6 hours",
    color: "red",
  },
  {
    hospital: "Ismailia Medical Complex",
    type: "+O",
    level: "Medium",
    distance: "2.5 KM Away",
    time: "12 hours",
    color: "orange",
  },
  {
    hospital: "Ismailia Medical Complex",
    type: "+AB",
    level: "Medium",
    distance: "2.5 KM Away",
    time: "2 Day",
    color: "orange",
  },
  {
    hospital: "Ismailia Medical Complex",
    type: "+B",
    level: "Low",
    distance: "2.5 KM Away",
    time: "3 Day",
    color: "green",
  },
  {
    hospital: "Ismailia Medical Complex",
    type: "-A",
    level: "Low",
    distance: "2.5 KM Away",
    time: "3 Day",
    color: "green",
  },
];

const BloodCards = () => {
  // ✅ نعرف نوع الحساب من localStorage
  let accountType = "";
  try {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    accountType = (u?.accountType || "").toLowerCase().trim();
  } catch {
    accountType = "";
  }

  const isHospital = accountType === "hospital";
  const isUser = accountType === "user";

  return (
    <div>
      <Navbar />

      {/* ✅ تنبيه بسيط للمستشفى (بدون ما نغير أي routing) */}
      {isHospital ? (
        <p style={{ padding: "12px 16px", margin: 0, opacity: 0.85 }}>
          Hospital view: requests list (Donate/Call buttons are hidden)
        </p>
      ) : null}

      <div className="cards-container">
        {data.map((item, idx) => (
          <div className={`card ${item.color}`} key={idx}>
            <h3>{item.hospital}</h3>
            <p className="type">{item.type}</p>
            <p>{item.level}</p>
            <p>{item.distance}</p>
            <p>{item.time}</p>

            {/* ✅ الأزرار تظهر للمستخدم فقط */}
            {isUser ? (
              <>
                <a
                  href="https://wa.me/qr/MX4YRCWCOB5YJ1"
                  className="call-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Call now
                </a>

                <Link to="/book" className="donate-btn">
                  Donate now
                </Link>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
//--------------------------------------------------------

export default BloodCards;