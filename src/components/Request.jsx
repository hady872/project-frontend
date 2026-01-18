// src/components/Request.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Request.scss";
import Navbar from "./Navbar";
//--------------------------------------------------------

// "+O" => "O+" , "-A" => "A-" , "+AB" => "AB+"
function normalizeBloodType(t) {
  if (!t || typeof t !== "string") return "";
  const s = t.trim().toUpperCase();
  if (s.startsWith("+")) return `${s.slice(1)}+`;
  if (s.startsWith("-")) return `${s.slice(1)}-`;
  return s; // لو أصلاً مكتوب "O+" مثلاً
}

const BloodCards = () => {
  // ✅ نعرف نوع الحساب من localStorage
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

  // ✅ الطلبات جاية من localStorage (مؤقتًا)
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // نقرأ hospitalRequests من localStorage
    const raw = localStorage.getItem("hospitalRequests");
    if (!raw) {
      setRequests([]);
      return;
    }

    try {
      const arr = JSON.parse(raw);
      setRequests(Array.isArray(arr) ? arr : []);
    } catch {
      setRequests([]);
    }
  }, []);

  // نحول urgency / level إلى لون للـ card
  const getColorByUrgency = (u) => {
    const s = String(u || "").toLowerCase().trim();
    if (s === "high") return "red";
    if (s === "medium") return "orange";
    if (s === "low") return "green";
    return "red";
  };

  // نحول شكل البيانات عشان يشتغل مع UI الحالي
  const displayList = requests
    .slice()
    .reverse()
    .map((r) => {
      const blood = normalizeBloodType(r?.bloodType || r?.type || "");
      const urgency = r?.urgency || r?.level || "";

      return {
        // ✅ اسم المستشفى للعرض عند اليوزر
        hospitalName: (r?.hospitalName || r?.hospital || "Hospital").toString(),

        // ✅ اسم المريض
        patientName: (r?.patientName || "").toString(),

        type: blood,
        level: urgency ? String(urgency) : "—",
        location: r?.location ? String(r.location) : "",
        contact: r?.contact ? String(r.contact) : "",
        color: getColorByUrgency(urgency),

        raw: r,
      };
    });

  return (
    <div>
      <Navbar />

      {/* ✅ تنبيه بسيط للمستشفى */}
      {isHospital ? (
        <p style={{ padding: "12px 16px", margin: 0, opacity: 0.85 }}>
          Hospital view: requests list (Donate/Call buttons are hidden)
        </p>
      ) : null}

      {/* ✅ لو مفيش طلبات */}
      {displayList.length === 0 ? (
        <p style={{ padding: "16px", opacity: 0.85 }}>No requests yet.</p>
      ) : (
        <div className="cards-container">
          {displayList.map((item, idx) => {
            const normalizedType = normalizeBloodType(item.type);

            return (
              <div className={`card ${item.color}`} key={idx}>
                {/* ✅ اسم المستشفى يظهر للـ user */}
                <h3>{item.hospitalName}</h3>

                {/* ✅ اسم المريض */}
                {item.patientName ? (
                  <p style={{ marginTop: 6, fontWeight: 700 }}>
                    Patient: {item.patientName}
                  </p>
                ) : null}

                <p className="type">{item.type}</p>
                <p>{item.level}</p>

                {/* Location / Contact */}
                {item.location ? <p>{item.location}</p> : null}
                {item.contact ? <p>{item.contact}</p> : null}

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

                    {/* ✅ نبعت بيانات الطلب للـ /book */}
                    <Link
                      to="/book"
                      state={{
                        bloodType: normalizedType,
                        hospital: item.hospitalName, // center
                        urgency: item.level,
                        patientName: item.patientName, // ✅ NEW
                      }}
                      className="donate-btn"
                    >
                      Donate now
                    </Link>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
//--------------------------------------------------------

export default BloodCards;