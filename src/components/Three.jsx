import '../styles/random.scss';
import '../styles/Three.scss';
import { Link } from 'react-router-dom';
import PicOne from '../pics/01.JPG';
import logo from '../pics/logo.png';
import PasswordInput from './PasswordInput';



//--------------------------------------------------------
function Three() {
  return (
    <div className="Three">
      <img className="x" src={logo} alt="x" />
      <div className="container">
        <div className="side">
          <div className='right-side'>
            <h1 className="head-right">sign up</h1>
            <label className='label-x'>Full Name</label>
            <input className="input-x gray-input" placeholder="Enter your Name" />
            <label className='label-x'>email</label>
            <input className="input-x gray-input" placeholder="Enter your email" />
            <label className='label-pass'>password</label>
            <PasswordInput/>
            <label className='label-pass'>Repeat password</label>
            <PasswordInput/>
            <Link to='/welcome' className="red-btn btn">sign up</Link>
            <div className="haveAcc">
              already have an account?<Link to='/login' className="log"> Log in</Link>
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
//--------------------------------------------------------

export default Three;