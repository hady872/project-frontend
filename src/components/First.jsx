import '../styles/First.scss';
import '../styles/random.scss'
import xImage from '../pics/16.png';
import logo from '../pics/16.png';
import { Link } from 'react-router-dom';
//--------------------------------------------------------
function First() {
  return (
    <div className="First">
      <div className="container">
          <img className="x" src={logo} alt="x" />
          <p className='p-start'>together , we save lives, just click get started to join our website</p>
          <Link to='/login' className='btn-start red-btn'>get started</Link>
      </div>

    </div>
  );
}
//--------------------------------------------------------

export default First;