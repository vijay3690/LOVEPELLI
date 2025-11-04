import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { BASE_API } from "./emailsign";




function LoginEmail({ onClose }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_API}/api/Login`, {
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
    } finally {
      setLoading(false);
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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter Your Email *"
               autoComplete="email"
                  required
              />
            </div>

            <div className="form-group" style={{ position: "relative", maxWidth: 500 }}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
                placeholder="Enter Your Password *"
                style={{ paddingRight: "40px" }} // add more right padding for icon space
                autoComplete="current-password"
                   required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#666",
                  userSelect: "none",
                  fontSize: "18px",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            <p id="login-desc" className="f-pass">
              Forgot your password? <Link to="/forgotpassword">Recover password</Link>
            </p>

            <div className="text-center">
              <button type="submit" className="default-btn" >
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
