// src/components/Three.jsx

import { useState } from "react";
import "../styles/random.scss";
import "../styles/Three.scss";
import { Link, useNavigate } from "react-router-dom";
import PicOne from "../pics/01.JPG";
import logo from "../pics/logo.png";
import PasswordInput from "./PasswordInput";
import api from "../api";

function Three() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(""); // ✅ user | hospital

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");

    // ✅ لازم يختار نوع الحساب
    if (!accountType) return setError("Please choose account type (User or Hospital)");

    // basic validation
    if (!fullName.trim()) return setError("Please enter your full name");
    if (!email.trim()) return setError("Please enter your email");
    if (!password) return setError("Please enter your password");
    if (password !== repeatPassword) return setError("Passwords do not match");

    setIsLoading(true);

    try {
      await api.post("/api/Users/register", {
        accountType, // ✅ الجديد

        fullName: fullName.trim(),
        email: email.trim(),
        passwordHash: password,

        // ✅ لحد ما نعمل صفحة Profile/Edit لاحقًا
        // (بنحط قيم افتراضية عشان validations في الباك)
        city: "Cairo",
        phone: "01000000000",
        bloodType: "A+",
        donations: [],
        otps: [],
      });

      // ✅ هيروح /welcome -> redirect حسب accountType
      navigate("/welcome");
    } catch (err) {
      const backendMsg =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string" ? err.response.data : null);

      setError(backendMsg || "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Three">
      <img className="x" src={logo} alt="x" />
      <div className="container">
        <div className="side">
          <div className="right-side">
            <h1 className="head-right">sign up</h1>

            {/* ✅ Account Type (إجباري) */}
            <label className="label-x">Account Type</label>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <button
                type="button"
                onClick={() => setAccountType("user")}
                className="red-btn btn"
                style={{
                  flex: 1,
                  opacity: accountType === "user" ? 1 : 0.6,
                }}
              >
                User
              </button>

              <button
                type="button"
                onClick={() => setAccountType("hospital")}
                className="red-btn btn"
                style={{
                  flex: 1,
                  opacity: accountType === "hospital" ? 1 : 0.6,
                }}
              >
                Hospital
              </button>
            </div>

            <label className="label-x">Full Name</label>
            <input
              className="input-x gray-input"
              placeholder="Enter your Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label className="label-x">Email</label>
            <input
              className="input-x gray-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label-pass">Password</label>
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              autoComplete="new-password"
            />

            <label className="label-pass">Repeat password</label>
            <PasswordInput
              value={repeatPassword}
              onChange={setRepeatPassword}
              placeholder="Repeat your password"
              autoComplete="new-password"
            />

            {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

            <button
              className="red-btn btn"
              onClick={handleSignUp}
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="haveAcc">
              already have an account?
              <Link to="/login" className="log">
                {" "}
                Log in
              </Link>
            </div>
          </div>

          <div className="left-side">
            <img className="img-one" src={PicOne} alt="x" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Three;