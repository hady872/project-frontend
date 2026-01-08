import React from "react";
import "../styles/Navbar.scss";
import logo from '../pics/logo.png';
import { Link, NavLink } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa"; // استيراد أيقونات الإشعارات والبروفايل

//--------------------------------------------------------

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Blood Link" className='x' />
      </div>
      <ul className="nav-links">
        <li><NavLink to="/home" end>Home</NavLink></li>
        <li><NavLink to="/book">Book</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/faq">FAQ</NavLink></li>
      </ul>
      <div className="icons">
        <Link to='/request'>
          <FaBell className="icon" />
        </Link>
        <Link to="/profile" >
          <FaUserCircle className="icon" />
        </Link>
      </div>
    </nav>
  );
};
//--------------------------------------------------------

export default Navbar;
