import React, { useEffect, useState } from "react";
import { mockBloodBanks } from "../mock/bloodBanks.mock";
import "../styles/home.scss";
import { Link } from "react-router-dom";
import xseven from "../pics/07.JPG";
import Navbar from "./Navbar";
import FindCenter from "./FindCenter";
import { FaUserCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faGoogle } from "@fortawesome/free-brands-svg-icons";

function Home() {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [dataSource, setDataSource] = useState("loading"); // loading | live | mock

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "https://myprojectapi.runasp.net/api/BloodBanks/GetAllBloodBank"
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        setBloodBanks(Array.isArray(data) ? data : []);
        setDataSource("live");
      } catch (err) {
        setBloodBanks(Array.isArray(mockBloodBanks) ? mockBloodBanks : []);
        setDataSource("mock");
      }
    };

    load();
  }, []);

  return (
    <div className="home">
      {/* ✅ العلامة اللي قلتلك عليها: هتظهر فوق عالشمال */}
      <h1
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 9999,
          background: "#fff",
          padding: "6px 10px",
          borderRadius: 8,
          fontSize: 14,
        }}
      >
        HOME PAGE ✅
      </h1>

      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🩸 Hero Section */}
      <section className="hero">
        <div className="text">
          <h2>
            Because saving lives shouldn’t be complicated.
            <br />
            <span>
              Blood Link brings donors and hospitals together when every second
              matters.
            </span>
          </h2>
          <Link to="/book" className="donate-btn">
            Donate now
          </Link>
        </div>
        <div className="image">
          <img src={xseven} alt="donation" />
        </div>
      </section>

      {/* 🏥 Blood Banks Section (LIVE / MOCK) */}
      <section className="bloodbanks" style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          <h2 style={{ margin: 0 }}>Blood Banks</h2>

          <span
            style={{
              fontSize: 12,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid #ddd",
              opacity: 0.9,
            }}
          >
            {dataSource === "loading"
              ? "Loading..."
              : dataSource === "live"
              ? "Live Data"
              : "Mock Data"}
          </span>
        </div>

        {bloodBanks.length === 0 ? (
          <p style={{ margin: 0 }}>No blood banks to show.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {bloodBanks.map((b, idx) => (
              <div
                key={b.id ?? b._id ?? b.name ?? idx}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                <div style={{ fontWeight: 700 }}>
                  {b.name || b.bankName || `Bank #${idx + 1}`}
                </div>

                <div style={{ opacity: 0.85, marginTop: 4 }}>
                  {b.address || b.location || b.city || "No address"}
                </div>

                <div style={{ marginTop: 6 }}>
                  {b.phone || b.phoneNumber || b.mobile || "No phone"}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 📊 Stats Section */}
      <section className="stats">
        <div className="stat-box">
          <h3>8</h3>
          <p>Upcoming campaigns</p>
        </div>
        <div className="stat-box">
          <h3>113</h3>
          <p>Available Blood Units</p>
        </div>
        <div className="stat-box">
          <h3>795</h3>
          <p>Donors so far</p>
        </div>
      </section>

      {/* 🗺️ Map Section */}
      <Link to="/map">
        <section className="map-section">
          <FindCenter />
        </section>
      </Link>

      {/* 💬 Testimonials */}
      <section className="testimonials">
        <div className="how-to">
          <h2>How To Donate?</h2>
        </div>
        <div className="reviews-container">
          <div className="review-card">
            <h4>
              <FaUserCircle className="review-icon" />
              Radwa Mohamed
            </h4>
            <p className="time">2 weeks ago</p>
            <p>
              I was nervous at first, but knowing my blood helped save a child
              made me realize how powerful one act of kindness can be.
            </p>
          </div>

          <div className="review-card">
            <h4>
              <FaUserCircle className="review-icon" />
              Ahmed Ali
            </h4>
            <p className="time">1 month ago</p>
            <p>
              After my father needed blood, I decided to become a regular donor.
              Now, I give back what once saved my family.
            </p>
          </div>

          <div className="review-card">
            <h4>
              <FaUserCircle className="review-icon" />
              Lina Alaa
            </h4>
            <span className="time">2 months ago</span>
            <p>
              I’ve donated more than ten times. Every time I do, I feel I’m part
              of something bigger — saving lives.
            </p>
          </div>
        </div>
      </section>

      {/* ⚙️ Footer */}
      <footer className="footer">
        <div className="links">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Contact Us</Link>
          <Link to="/">Terms of Service</Link>
        </div>

        <div className="social-login">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="face" />
          </a>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="insta" />
          </a>

          <a href="https://google.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGoogle} className="google" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
