import React from "react";
import "../styles/FindCenter.scss";
//--------------------------------------------------------
const FindCenter = () => {
  return (
    <section className="find-center">
      <div className="container">
        <h2 className="title">
          🔍 <input placeholder='Find the Nearest Center' className='search-b'></input>
        </h2>
        <p className="desc">
          Choose your nearest place
        </p>

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
    </section>
  );
};
//--------------------------------------------------------
export default FindCenter;
