// src/components/second.jsx

import "../styles/Second.scss";
import "../styles/random.scss";
import PicOne from "../pics/01.JPG";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

import logo from "../pics/logo.png";
import api from "../api";

function Second() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setErrorMsg("");

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // ✅ نقص بيانات
    if (!cleanEmail || !cleanPassword) {
      setErrorMsg("Please enter your email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/api/Users/login", {
        email: cleanEmail,
        passwordHash: cleanPassword,
      });

      const user = res?.data?.user;

      if (!user) {
        setErrorMsg("Login failed: user data not returned");
        return;
      }

      // ✅ حفظ بيانات المستخدم
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      const rawAccountType = user.accountType ?? user.AccountType ?? "";
      const accountType = String(rawAccountType).toLowerCase();

      // ✅ توجيه حسب نوع الحساب
      if (accountType === "hospital") {
        navigate("/emergency");
      } else {
        navigate("/home");
      }
    } catch (err) {
      /**
       * ===========================
       * 🔍 ERROR HANDLING الذكي
       * ===========================
       */

      // ❌ السيرفر مش شغال أو مش متوصل
      if (!err.response) {
        setErrorMsg(
          "Cannot connect to server. Please make sure the backend is running."
        );
        return;
      }

      const status = err.response.status;
      const data = err.response.data;

      // ❌ إيميل مش موجود
      if (status === 404) {
        setErrorMsg("No account found with this email.");
        return;
      }

      // ❌ باسورد غلط
      if (status === 401) {
        setErrorMsg("Incorrect password. Please try again.");
        return;
      }

      // ❌ Validation errors (مثلاً صيغة إيميل غلط)
      if (status === 400 && data?.errors) {
        const firstKey = Object.keys(data.errors)[0];
        const firstMsg = data.errors[firstKey]?.[0];
        setErrorMsg(firstMsg || "Invalid login data.");
        return;
      }

      // ❌ أي رسالة جاية من الباك
      if (data?.message) {
        setErrorMsg(data.message);
        return;
      }

      // ❌ fallback
      setErrorMsg("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Second">
      <div className="container">
        <img className="x" src={logo} alt="logo" />

        <div className="side">
          <div className="right-side">
            <h1 className="head-right">Log in to our website</h1>

            <label className="label-email">Email</label>
            <input
              className="input-email gray-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />

            <label className="label-pass">Password</label>
            <input
              type="password"
              className="input-pass gray-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />

            {errorMsg && <p className="error-msg">{errorMsg}</p>}

            <button
              type="button"
              className="red-btn btn fg"
              onClick={handleLogin}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <div className="options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>

              <Link to="/forget" className="forget">
                Forgot your password?
              </Link>
            </div>

            <div className="divider">
              <span>Or log in with</span>
            </div>

            <div className="social-login">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} className="face" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="insta" />
              </a>

              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGoogle} className="google" />
              </a>
            </div>

            <p className="signup-text">
              Don’t have an account?{" "}
              <Link to="/signup" className="sign">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="left-side">
            <img className="img-one" src={PicOne} alt="illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Second;