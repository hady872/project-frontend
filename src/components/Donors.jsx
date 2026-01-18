// src/components/Donors.jsx
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";

//--------------------------------------------------------

function normalizeBloodType(bt) {
  if (!bt || typeof bt !== "string") return "";
  return bt.toUpperCase().trim();
}

const BLOOD_TYPES_ORDER = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Donors = () => {
  const [donorsByType, setDonorsByType] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ للتأكد إن اللي فاتح الصفحة مستشفى (مجرد UI حماية، والراوت هيتحمي كمان)
  const accountType = useMemo(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      return (u?.accountType || "").toLowerCase().trim();
    } catch {
      return "";
    }
  }, []);

  const isHospital = accountType === "hospital";

  const loadBookings = () => {
    setErrorMsg("");
    try {
      const raw = localStorage.getItem("userBookings");
      if (!raw) return [];

      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (!isHospital) {
      setErrorMsg("This page is for hospital accounts only.");
      setDonorsByType({});
      return;
    }

    const allBookings = loadBookings();

    // ✅ حوّل bookings لقائمة donors مختصرة (Name + Phone + BloodType)
    const donors = allBookings
      .map((b) => ({
        bloodType: normalizeBloodType(b?.bloodType),
        name: String(b?.donorName || "").trim(),
        phone: String(b?.phone || "").trim(),
        createdAt: b?.createdAt || "",
      }))
      .filter((d) => d.bloodType && d.name && d.phone);

    // ✅ تجميع حسب bloodType
    const grouped = donors.reduce((acc, d) => {
      const key = d.bloodType;
      if (!acc[key]) acc[key] = [];
      acc[key].push(d);
      return acc;
    }, {});

    // ✅ ترتيب داخل كل فصيلة: الأحدث فوق (اختياري ومفيد)
    Object.keys(grouped).forEach((k) => {
      grouped[k].sort((a, b) => {
        const ta = new Date(a?.createdAt || 0).getTime();
        const tb = new Date(b?.createdAt || 0).getTime();
        return tb - ta;
      });
    });

    setDonorsByType(grouped);
  }, [isHospital]);

  const availableTypes = useMemo(() => {
    // اعرض الأنواع بالترتيب المعروف، وبعدها أي نوع غير متوقع
    const keys = Object.keys(donorsByType || {});
    const ordered = BLOOD_TYPES_ORDER.filter((t) => keys.includes(t));
    const rest = keys.filter((t) => !BLOOD_TYPES_ORDER.includes(t));
    return [...ordered, ...rest];
  }, [donorsByType]);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f10", color: "#fff" }}>
      <Navbar />

      <div style={{ maxWidth: 1050, margin: "70px auto", padding: "0 16px" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Donors</h2>
        

        {errorMsg ? (
          <p style={{ marginTop: 16, color: "salmon" }}>{errorMsg}</p>
        ) : null}

        {!errorMsg && availableTypes.length === 0 ? (
          <p style={{ marginTop: 18, opacity: 0.85 }}>
            No donors yet.
          </p>
        ) : null}

        {!errorMsg &&
          availableTypes.map((bt) => {
            const list = Array.isArray(donorsByType?.[bt]) ? donorsByType[bt] : [];
            if (list.length === 0) return null;

            return (
              <div
                key={bt}
                style={{
                  marginTop: 18,
                  padding: 16,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>
                    {bt}
                  </h3>
                  <span style={{ opacity: 0.8 }}>
                    Count: <b>{list.length}</b>
                  </span>
                </div>

                <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                  {list.map((d, idx) => (
                    <div
                      key={`${bt}_${idx}`}
                      style={{
                        padding: 12,
                        borderRadius: 14,
                        background: "rgba(0,0,0,0.35)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <div style={{ fontWeight: 800 }}>Name: {d.name}</div>
                      <div style={{ marginTop: 6, opacity: 0.95 }}>
                        Phone: {d.phone}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

//--------------------------------------------------------
export default Donors;