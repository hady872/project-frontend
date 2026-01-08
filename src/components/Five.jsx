import '../styles/random.scss';
import '../styles/Five.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PicFour from '../pics/04.JPG';
import logo from '../pics/logo.png';

//--------------------------------------------------------
function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Entered OTP: ${otp.join("")}`);
  };

  return (
    <div className="Four">
      <img className="x" src={logo} alt="x" />
      <div className="container">
        <div className="side">
          {/* Right side (form) */}
          <div className="right-side">
            <h1 className="head-right">OTP Verification</h1>
            <p className="label-x">Enter OTP code sent to +0122****57</p>

            <form onSubmit={handleSubmit}>
              <div className="otp-box">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="input-x otp-input"
                  />
                ))}
              </div>

              <div className="resend">
                Didn’t receive OTP?{" "}
                <span
                  className="s"
                  onClick={() => alert("Resend OTP clicked")}
                  style={{ cursor: "pointer" }}
                >
                  Resend Code
                </span>
              </div>

              <Link to='/reset' type="submit" className="red-btn btn">
                Verify & Proceed
              </Link>

            </form>
          </div>

          {/* Left side (image) */}
          <div className="left-side">
            <img className="img-one" src={PicFour} alt="illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}
//--------------------------------------------------------
export default OtpVerification;
