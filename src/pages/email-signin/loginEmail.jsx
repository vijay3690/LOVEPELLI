import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const BASE_API =
  "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net";

function LoginEmail({ onClose }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
        alert("Invalid email or password!");
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
    navigate("/");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>
          ✖
        </button>

        <div className="log-reg-inner">
          <h2 className="title">Welcome to LovePelli</h2>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter Your Email *"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
                placeholder="Enter Your Password *"
                required
              />
            </div>

            <p className="f-pass">
              Forgot your password? <Link to="/forgotpassword">Recover password</Link>
            </p>

            <div className="text-center">
              <button type="submit" className="default-btn">
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
