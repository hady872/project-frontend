import React, { useState } from "react";
import "../styles/Map.scss";

export default function SearchOnly() {
  const [query, setQuery] = useState("");

  // 5 أماكن وكل واحد ليه إحداثيات
  const places = [
    { name: "Suez Canal University Hospital", coords: [30.62253917307433, 32.28116264219001] },
    { name: " Ismalia medical complex ", coords: [30.620759016317166, 32.287911360407996] },
    { name: "Ismailia Military Hospital.", coords: [30.585284868263603, 32.25197016879853] },
    { name: "Suez Canal Authority Hospital", coords: [30.59665270898075, 32.30987406879853] },
    { name: "Abo-khalifa Hospital", coords: [30.743139886434577, 32.25951691482776] },
    { name: "El Qassasin Central Hospital", coords: [30.56071753261998, 31.939369310763617] },
  ];

  const filtered = places.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const openLocation = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  return (
    <div className="search-only">
      <div className="search-card">
        <input
          type="text"
          placeholder="Find the Nearest Center"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        <ul className="result-list">
          {filtered.map((p, i) => (
            <li
              key={i}
              onClick={() => openLocation(p.coords[0], p.coords[1])}
            >
              {p.name}
            </li>
          ))}
        </ul> 
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13820.640433340604!2d31.415955073901337!3d30.003558729720922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583cc75436d909%3A0x7f921d4528ec3e03!2sThe%205th%20Settlement%2C%20Industrial%20Area%2C%20New%20Cairo%201%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1762121945349!5m2!1sen!2seg"
            style={{ width: "100%", height: "400px", border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nearest Center Map"
          />
        </div>

      </div>
    </div>
  );
}
