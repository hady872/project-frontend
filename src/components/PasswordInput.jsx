import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../styles/PasswordInput.scss';
//--------------------------------------------------------------

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        className="input-pass gray-input"
        placeholder="Enter your password"
      />

      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="eye-icon"
        onClick={() => setShowPassword(!showPassword)}
      />
    </div>
  );
}
//--------------------------------------------------------------

export default PasswordInput;
