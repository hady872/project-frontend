import '../styles/random.scss';
import '../styles/Four.scss';
import { Link } from 'react-router-dom';
import picTwo from '../pics/02.JPG';
import logo from '../pics/logo.png';



//--------------------------------------------------------
function Three() {
  return (
    <div className="Four">
      <img className="x" src={logo} alt="x" />
      <div className="container">
        <div className="side">
          <div className='right-side'>
            <h1 className="head-right">Forget password</h1>
            <label className='label-x'>email</label>
            <input className="input-x gray-input" placeholder="Enter your email" />
            <Link to='/otp' className="red-btn btn">send OTP</Link>
            <div className="sign-u">
              Now here? <Link to='/signup' className='s'>sign up</Link>
            </div>
            <div className="sign-u">
              i remembered it.<Link to='/login' className='s'>log in</Link>
            </div>
          </div>
          <div className="left-side">
            <img className="img-one" src={picTwo} alt="x" />
          </div>
        </div>
      </div>
    </div>
  );
}
//--------------------------------------------------------
export default Three;