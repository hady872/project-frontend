import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AfterMap.scss";
import Navbar from "./Navbar";

function IsmailiaCenter() {
  // بيانات المستشفيات + عنوان فرعي + أنواع الدم
  const centersData = {
    "Suez Canal University Hospital": {
      centerName: "Suez Canal University Plasma Center",
      address: "The Ring Rd, Ismailia 3, Ismailia Governorate",
      bloodStock: [
        { type: "A+", count: 120 },
        { type: "A-", count: 55 },
        { type: "B+", count: 90 },
        { type: "B-", count: 40 },
        { type: "AB+", count: 30 },
        { type: "AB-", count: 25 },
        { type: "O+", count: 160 },
        { type: "O-", count: 20 },
      ],
    },
    "Ismalia medical complex": {
      centerName: "Ismalia medical complex Plasma Center",
      address: "Medical Complex Road.near elnasr club, Ismailia ,  ",
      bloodStock: [
        { type: "A+", count: 120 },
        { type: "A-", count: 55 },
        { type: "B+", count: 90 },
        { type: "B-", count: 40 },
        { type: "AB+", count: 30 },
        { type: "AB-", count: 25 },
        { type: "O+", count: 160 },
        { type: "O-", count: 20 },
      ],
    },
    "Ismailia Military Hospital.": {
      centerName: "Ismailia Military  Plasma Center",
      address: " Military Road, Ismailia",
      bloodStock: [
        { type: "A+", count: 1 },
        { type: "A-", count: 9 },
        { type: "B+", count: 1 },
        { type: "B-", count: 2 },
        { type: "AB+", count: 9 },
        { type: "AB-", count: 10 },
        { type: "O+", count: 160 },
        { type: "O-", count: 20 },
      ],
    },
    "Abo-khalifa Emergency Hospital": {
      centerName: "Abo-khalifa Plasma Center",
      address: "Abo-khalifa Street, Ismailia",
      bloodStock: [
        { type: "A+", count: 40 },
        { type: "A-", count: 9 },
        { type: "B+", count: 1 },
        { type: "B-", count: 21 },
        { type: "AB+", count: 9 },
        { type: "AB-", count: 10 },
        { type: "O+", count: 160 },
        { type: "O-", count: 20 },
      ],
    },
    "Suez Canal Authority Hospital": {
      centerName: "Suez Canal Authority Plasma Center",
      address: "Street 6, Al Temsah, Ismailia ",
      bloodStock: [
        { type: "A+", count: 0 },
        { type: "A-", count: 74 },
        { type: "B+", count: 0 },
        { type: "B-", count: 0 },
        { type: "AB+", count: 5 },
        { type: "AB-", count: 0 },
        { type: "O+", count: 5 },
        { type: "O-", count: 0 },
      ],
    },
    "El Qassasin Central Hospital": {
      centerName: "El Qassasin Central Plasma Center",
      address: "ElQassasin  Street, Ismailia",
      bloodStock: [
        { type: "A+", count: 33 },
        { type: "A-", count: 33 },
        { type: "B+", count: 33 },
        { type: "B-", count: 40 },
        { type: "AB+", count: 32 },
        { type: "AB-", count: 45 },
        { type: "O+", count: 8 },
        { type: "O-", count: 7 },
      ],
    },
  };

  const [currentCenter, setCurrentCenter] = useState({
    name: "Ismailia Plasma Donor Center",
    address: "El-Mostashfa El-Ta’awoni Street, Al Sheikh Zayed District, Ismailia, Egypt",
    bloodStock: [
      { type: "A+", count: 7 },
      { type: "A-", count: 4 },
      { type: "B+", count: 6 },
      { type: "B-", count: 5 },
      { type: "AB+", count: 99 },
      { type: "AB-", count: 52 },
      { type: "O+", count: 5 },
      { type: "O-", count: 2  },
    ],
  });

  const handleHospitalClick = (hospital) => {
    const data = centersData[hospital];
    if (data) {
      setCurrentCenter({
        name: data.centerName,
        address: data.address,
        bloodStock: data.bloodStock,
      });
    }
  };

  const hospitals = Object.keys(centersData);

  return (
    <div className="center-page">
      <Navbar />

      <section className="center-header">
        <h1>{currentCenter.name}</h1>
        <p>{currentCenter.address}</p>
      </section>

      <section className="blood-stock">
        <h2>Blood stock</h2>
        <div className="stock-grid">
          {currentCenter.bloodStock.map((b) => (
            <div
              key={b.type}
              className={`stock-box ${b.count < 20 ? "low" : ""}`}
            >
              <span className="type">{b.type}</span>
              <span className="count">{b.count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="hospitals">
        <h2>🏥 Hospitals Benefiting from the Center</h2>
        <div className="hospitals-grid">
          {hospitals.map((h) => (
            <div
              key={h}
              className="hospital-box"
              onClick={() => handleHospitalClick(h)}
              style={{ cursor: "pointer" }}
            >
              {h}
            </div>
          ))}
        </div>
      </section>

      <Link to="/book" className="donate-btn">
        Donate now
      </Link>
    </div>
  );
}

export default IsmailiaCenter;
