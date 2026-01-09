import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/PasswordInput.scss";

function PasswordInput({
  value = "",
  onChange = () => {},
  placeholder = "Enter your password",
  name,
  autoComplete,
  required = false,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        className="input-pass gray-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name={name}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
      />

      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="eye-icon"
        onClick={() => setShowPassword((s) => !s)}
      />
    </div>
  );
}

export default PasswordInput;