import { useState,useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./email-sign.css";



function LoginEmail({ onClose }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const Base_api=import.meta.env.VITE_BASE_URL;
  const inputRefs = useRef([]); 
  const navigate = useNavigate();
 

    const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); // stop form submit
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus(); // move to next field
      } else {
        document.getElementById("submitBtn").click(); // submit button action
      }
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${Base_api}/api/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password: userPass }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setRedirect(true); // redirect after login
        if (onClose) onClose(); // close modal if onClose prop passed
      } else {
        // prefer inline message or toast; keeping alert for minimal change
        alert(data?.message || "Invalid email or password!");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    } 
  };

  if (redirect) {
    return <Navigate to="/members" replace />;
  }

  const closeModal = () => {
    if (onClose) onClose();
    else navigate("/");
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={closeModal}
          aria-label="Close dialog"
        >
          ✖
        </button>

        <div className="log-reg-inner">
          <h2 id="login-title" className="title">Welcome to LovePelli</h2>

          <form onSubmit={handleLogin} aria-describedby="login-desc" autoComplete="on">
            <div className="form-group">
              <label className="elg-email-label" htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                value={userEmail}
                 ref={el => inputRefs.current[0] = el}
                 onKeyDown={(e) => handleKeyDown(e, 0)}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter Your Email *"
               autoComplete="email"
                  required
              />
            </div>

            <div className="form-group password-group">
                    <label className="elg-email-label" htmlFor="password">Password:</label>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={userPass}
                      ref={el => inputRefs.current[0] = el}
                      onKeyDown={(e) => handleKeyDown(e, 0)}
                      onChange={(e) => setUserPass(e.target.value)}
                      placeholder="Enter Your Password *"
                      className="password-input"
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                       ref={el => inputRefs.current[1] = el}
                       onKeyDown={(e) => handleKeyDown(e, 1)}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      title={showPassword ? "Hide password" : "Show password"}
                      className="password-toggle-btn"
                    >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            <p id="login-desc" className="f-pass">
              Forgot your password? <Link to="/forgotpassword">Recover password</Link>
            </p>

            <div className="text-center">
              <button id="submitBtn" type="submit" className="Login-btn">
                                Log In
              </button>
            </div>

            <div className="or-content">
              <p className="or-signup">
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginEmail;
