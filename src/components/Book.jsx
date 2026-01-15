// src/components/Book.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../styles/Book.scss";
import Navbar from "./Navbar";
import img1 from "../pics/13.png";
import img2 from "../pics/14.jpg";
import { useLocation, useNavigate } from "react-router-dom";

//--------------------------------------------------------
function BookDonation() {
  const location = useLocation();
  const navigate = useNavigate();

  // الدم اللي جاي من صفحة Request (لو موجود)
  const preselectedBloodType = useMemo(() => {
    const bt = location?.state?.bloodType;
    return (bt || "").toUpperCase().trim();
  }, [location]);

  // المستشفى (Center) + urgency اللي جايين من Request (لو موجود)
  const preselectedHospital = useMemo(() => {
    const h = location?.state?.hospital;
    return (h || "").trim();
  }, [location]);

  const preselectedUrgency = useMemo(() => {
    const u = location?.state?.urgency;
    return (u || "").trim();
  }, [location]);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Locks
  const lockBloodType = Boolean(preselectedBloodType); // لو جاي من requests -> نقفّل الاختيار
  const lockCenter = Boolean(preselectedHospital); // لو جاي من requests -> نقفّل الـ Center

  // ===== Form States (controlled) =====
  const [selectedBlood, setSelectedBlood] = useState("");
  const [centerName, setCenterName] = useState("");

  const [day, setDay] = useState("");
  const [clock, setClock] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [phone, setPhone] = useState("");

  const [medications, setMedications] = useState(""); // "Yes" | "No"
  const [surgery, setSurgery] = useState(""); // "Yes" | "No"
  const [donatedBefore, setDonatedBefore] = useState(""); // "Yes" | "No"
  const [infection, setInfection] = useState(""); // "Yes" | "No"

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (preselectedBloodType) setSelectedBlood(preselectedBloodType);
  }, [preselectedBloodType]);

  useEffect(() => {
    if (preselectedHospital) setCenterName(preselectedHospital);
  }, [preselectedHospital]);

  // ===== Helpers =====
  const readLoggedUser = () => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const loadBookings = () => {
    try {
      const raw = localStorage.getItem("userBookings");
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  const saveBookings = (arr) => {
    localStorage.setItem("userBookings", JSON.stringify(arr));
  };

  const validate = () => {
    // 최소 مطلوبات عشان ما نعقّدهاش
    if (!centerName.trim()) return "Please enter a center.";
    if (!selectedBlood) return "Please select a blood type.";
    if (!fullName.trim()) return "Please enter full name.";
    if (!phone.trim()) return "Please enter phone number.";
    if (!day) return "Please select day.";
    if (!clock) return "Please select time.";
    if (!birthDate) return "Please select birth date.";
    if (!weight || Number(weight) <= 0) return "Please enter a valid weight.";
    if (!medications) return "Please answer medications question.";
    if (!surgery) return "Please answer surgery question.";
    if (!donatedBefore) return "Please answer donated before question.";
    if (!infection) return "Please answer infection question.";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }

    const userObj = readLoggedUser();
    const ownerUserID = userObj?.userID;

    if (!ownerUserID) {
      setErrorMsg("You are not logged in. Please login again.");
      return;
    }

    const newBooking = {
      ownerUserID, // صاحب الحساب (اللي عامل login)

      // بيانات الحجز/المتبرع (قد يكون شخص آخر)
      donorName: fullName.trim(),
      phone: phone.trim(),
      birthDate,
      weight: Number(weight),
      day,
      clock,

      // من Request (لو جاي)
      center: centerName.trim(),
      bloodType: selectedBlood,
      urgency: preselectedUrgency || "",

      // أسئلة
      medications,
      surgery,
      donatedBefore,
      infection,

      createdAt: new Date().toISOString(),
    };

    const all = loadBookings();
    all.push(newBooking);
    saveBookings(all);

    // بعد الحفظ → روح للبروفايل عشان تشوفها ظهرت
    navigate("/profile", { replace: true });
  };

  return (
    <div className="book-donation">
      <Navbar />
      <div className="content">
        <form className="donation-form" onSubmit={onSubmit} noValidate>
          <h2>booking donation</h2>

          {/* ✅ لو جاي من Requests: اعرض Urgency فقط */}
          {preselectedUrgency ? (
            <div style={{ marginTop: 6, marginBottom: 12, opacity: 0.85 }}>
              Urgency: <b>{preselectedUrgency}</b>
            </div>
          ) : null}

          {errorMsg ? (
            <p style={{ marginTop: 8, marginBottom: 10, color: "salmon" }}>
              {errorMsg}
            </p>
          ) : null}

          <label>Center</label>
          <input
            type="text"
            placeholder="Enter Center Name"
            value={centerName}
            onChange={(e) => setCenterName(e.target.value)}
            readOnly={lockCenter}
          />

          <label>Day</label>
          <input
            type="date"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />

          <label>Clock</label>
          <input
            type="time"
            value={clock}
            onChange={(e) => setClock(e.target.value)}
          />

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Birth Date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <label>Weight</label>
          <input
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="section">
            <label>Blood Type</label>

            {/* لو جاي من Request: نوضح للمستخدم إن النوع متحدد تلقائياً */}
            {lockBloodType ? (
              <p style={{ marginTop: 6, marginBottom: 10, opacity: 0.85 }}>
                Blood type is pre-selected from the request:{" "}
                <b>{preselectedBloodType}</b>
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
                <input
                  type="radio"
                  name="medications"
                  checked={medications === "Yes"}
                  onChange={() => setMedications("Yes")}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="medications"
                  checked={medications === "No"}
                  onChange={() => setMedications("No")}
                />{" "}
                No
              </label>
            </div>
          </div>

          <div className="section">
            <label>Have you had any surgeries in the past 6 months?</label>
            <div className="options">
              <label>
                <input
                  type="radio"
                  name="surgery"
                  checked={surgery === "Yes"}
                  onChange={() => setSurgery("Yes")}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="surgery"
                  checked={surgery === "No"}
                  onChange={() => setSurgery("No")}
                />{" "}
                No
              </label>
            </div>
          </div>

          <div className="section">
            <label>Have you donated blood before?</label>
            <div className="options">
              <label>
                <input
                  type="radio"
                  name="donated"
                  checked={donatedBefore === "Yes"}
                  onChange={() => setDonatedBefore("Yes")}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="donated"
                  checked={donatedBefore === "No"}
                  onChange={() => setDonatedBefore("No")}
                />{" "}
                No
              </label>
            </div>
          </div>

          <div className="section">
            <label>
              Have you recently had any infections (Hepatitis, COVID-19, etc)?
            </label>
            <div className="options">
              <label>
                <input
                  type="radio"
                  name="infection"
                  checked={infection === "Yes"}
                  onChange={() => setInfection("Yes")}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="infection"
                  checked={infection === "No"}
                  onChange={() => setInfection("No")}
                />{" "}
                No
              </label>
            </div>
          </div>

          {/* بدل Link: submit حقيقي */}
          <button type="submit" className="confirm-btn">
            Confirm
          </button>
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