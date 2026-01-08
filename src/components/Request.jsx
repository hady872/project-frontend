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
  return (
    <div>
      <Navbar />
      <div className="cards-container">
        {data.map((item, idx) => (
          <div className={`card ${item.color}`} key={idx}>
            <h3>{item.hospital}</h3>
            <p className="type">{item.type}</p>
            <p>{item.level}</p>
            <p>{item.distance}</p>
            <p>{item.time}</p>

            <a href='https://wa.me/qr/MX4YRCWCOB5YJ1' className="call-btn">Call now</a>
            <Link to='/book' className="donate-btn">Donate now</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
//--------------------------------------------------------

export default BloodCards;
