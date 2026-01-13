import React, { useMemo } from "react";
import "../styles/Navbar.scss";
import logo from "../pics/logo.png";
import { Link, NavLink } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";

//--------------------------------------------------------

const Navbar = () => {
  // اقرأ نوع الحساب من localStorage
  const accountType = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return "";
      const u = JSON.parse(raw);
      return (u?.accountType || "").toLowerCase().trim(); // "user" | "hospital"
    } catch {
      return "";
    }
  }, []);

  const isHospital = accountType === "hospital";
  const isUser = accountType === "user";

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Blood Link" className="x" />
      </div>

      <ul className="nav-links">
        {/* لو User */}
        {isUser && (
          <>
            <li>
              <NavLink to="/home" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/book">Book</NavLink>
            </li>
          </>
        )}

        {/* لو Hospital */}
        {isHospital && (
          <>
            <li>
              <NavLink to="/emergency" end>
                Request Form
              </NavLink>
            </li>
          </>
        )}

        {/* روابط عامة للجميع */}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/faq">FAQ</NavLink>
        </li>
      </ul>

      <div className="icons">
        {/* الجرس يفتح صفحة الطلبات */}
        <Link to="/request" title="Requests">
          <FaBell className="icon" />
        </Link>

        {/* البروفايل */}
        <Link to="/profile" title="Profile">
          <FaUserCircle className="icon" />
        </Link>
      </div>
    </nav>
  );
};
//--------------------------------------------------------

export default Navbar;