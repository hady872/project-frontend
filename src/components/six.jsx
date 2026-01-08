import '../styles/random.scss';
import '../styles/Six.scss';
import { Link } from 'react-router-dom';
import PicThree from '../pics/03.JPG';
import logo from '../pics/logo.png';
import PasswordInput from './PasswordInput';



//--------------------------------------------------------
function Six() {
  return (
    <div className="Six">
      <img className="x" src={logo} alt="x" />
      <div className="container">
        <div className="side">
          <div className='right-side'>
            <h1 className="head-right">Reset password</h1>
            <label className='label-pass'>password</label>
            <PasswordInput/>
            <label className='label-pass'>confirm password</label>
            <PasswordInput/>
            <Link to='/welcome' className="red-btn btn">Reset password</Link>
          </div>
          <div className="left-side">
            <img className="img-one" src={PicThree} alt="x" />
          </div>
        </div>
      </div>
    </div>
  );
}
//--------------------------------------------------------
export default Six;