import React from "react";
import '../styles/Welcome.scss';
import bgImage from "../pics/welcome.jpg";
import logo from "../pics/88.png";
import { Link } from "react-router-dom";
//--------------------------------------------------------
const FullBackground = () => {
  return (
    <section
      className="full-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay"></div>
      <div className="content">
        <h1>Welcome to blood link</h1>
        <p>please choose how you'd like to continue</p>
        <div className='optionsx'>
          <Link to='/home' className='optionx'>donor</Link>
          <Link to='/emergency' className='optionx'>hospital</Link>
        </div>
      </div>
    </section>
  );
};
//--------------------------------------------------------
export default FullBackground;
