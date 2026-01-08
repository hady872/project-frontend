import '../styles/Second.scss';
import '../styles/random.scss';
import PicOne from '../pics/01.JPG';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import PasswordInput from './PasswordInput';
import logo from '../pics/logo.png';

//--------------------------------------------------------
function Second() {
  return (
    <div className="Second">
      <div className="container">
        <img className="x" src={logo} alt="x" />
        <div className="side">
          <div className='right-side'>
            <h1 className="head-right">log in to our website</h1>
            <label className='label-email'>email</label>
            <input className="input-email gray-input" placeholder="Enter your email" />
            <label className='label-pass'>password</label>
            <PasswordInput />
            <Link to='/welcome' className="red-btn btn fg">log in</Link>
            <div className="options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <Link to='/forget' href="#" className='forget'>Forgot your password?</Link>
            </div>
            <div className="divider">
              <span>Or Log in with</span>
            </div>
            <div className="social-login">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} className='face' />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className='insta' />
              </a>
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGoogle} className='google' />

              </a>
            </div>
            <p className="signup-text">
              Don’t have an account? <Link to='/signup' href="#" className='sign'>Sign Up</Link>
            </p>
          </div>
          <div className="left-side">
            <img className="img-one" src={PicOne} alt="x" />
          </div>
        </div>
      </div>
    </div>
  );
}
//--------------------------------------------------------

export default Second;