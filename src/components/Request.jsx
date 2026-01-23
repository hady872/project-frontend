// src/components/Request.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Request.scss";
import Navbar from "./Navbar";

// دالة لتنظيم فصيلة الدم
function normalizeBloodType(t) {
  if (!t || typeof t !== "string") return "";
  const s = t.trim().toUpperCase();
  if (s.startsWith("+")) return `${s.slice(1)}+`;
  if (s.startsWith("-")) return `${s.slice(1)}-`;
  return s; 
}

const BloodCards = () => {
  const accountType = useMemo(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      return (u?.accountType || "").toLowerCase().trim();
    } catch {
      return "";
    }
  }, []);

  const isHospital = accountType === "hospital";
  const isUser = accountType === "user";

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5240/api/HospitalRequests/GetAll");
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        } else {
          console.error("Server error when fetching requests");
        }
      } catch (error) {
        console.error("Network error: Could not connect to API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getColorByUrgency = (u) => {
    const s = String(u || "").toLowerCase().trim();
    if (s === "high") return "red";
    if (s === "medium") return "orange";
    if (s === "low") return "green";
    return "red";
  };

  const displayList = requests.map((r) => {
    const blood = normalizeBloodType(r?.bloodType || "");
    const urgency = r?.urgency || "";

    return {
      id: r?.requestID, // ✅ حفظ الـ ID هنا
      hospitalName: r?.hospitalName || "Unknown Hospital",
      patientName: r?.patientName || "Not specified",
      type: blood,
      level: urgency || "—",
      location: r?.location || "",
      contact: r?.contact || "",
      color: getColorByUrgency(urgency),
      raw: r,
    };
  });

  return (
    <div>
      <Navbar />

      {isHospital && (
        <p style={{ padding: "12px 16px", margin: 0, opacity: 0.85 }}>
          Hospital view: requests list (Donate/Call buttons are hidden)
        </p>
      )}

      {loading ? (
        <p style={{ padding: "16px" }}>Loading requests from database...</p>
      ) : displayList.length === 0 ? (
        <p style={{ padding: "16px", opacity: 0.85 }}>No blood requests found at the moment.</p>
      ) : (
        <div className="cards-container">
          {displayList.map((item, idx) => (
            <div className={`card ${item.color}`} key={idx}>
              <h3>{item.hospitalName}</h3>
              {item.patientName && (
                <p style={{ marginTop: 6, fontWeight: 700 }}>
                  Patient: {item.patientName}
                </p>
              )}
              <p className="type">{item.type}</p>
              <p>{item.level}</p>
              {item.location && <p>{item.location}</p>}
              {item.contact && <p>{item.contact}</p>}

              {isUser && (
                <>
                  <a href={`tel:${item.contact}`} className="call-btn">
                    Call now
                  </a>

                  {/* ✅ التعديل هنا: تمرير الـ requestID لصفحة الـ book */}
                  <Link
                    to="/book"
                    state={{
                      requestID: item.id, // نرسل الـ ID الحقيقي من الداتابيز
                      bloodType: item.type,
                      hospital: item.hospitalName,
                      urgency: item.level,
                      patientName: item.patientName,
                    }}
                    className="donate-btn"
                  >
                    Donate now
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodCards;