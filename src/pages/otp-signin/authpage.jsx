import React from "react";
import { Mail, Smartphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./signuppage.css"; 



const AuthPage = () => {
  const navigate = useNavigate();

    const closeModal = () => {
    navigate("/");
  };

  return (
    <>
      {/* Logo */}
      <div className="logo signup-logo">
        <Link to="/">
          <img
            src="assets/images/logo/pic.png"
            alt="logo"
            className="signup-logo-img"
          />
        </Link>
      </div>

      <div className="signup-container">
        {/* Login Section */}
         <button  className="close-btn1" onClick={closeModal}>✖</button>
        <div className="signup-box">
          <h2 className="signup-title">Welcome to LovePelli</h2>
              <Link to="/loginEmail" className="signup-button">
                    <Mail size={25}   className="aicon" />
                            Login with Email
              </Link> 
             <Link to="/mobilelogin" className="signup-button" >
                  <Smartphone size={25} className="aicon"/>
                  Login with Mobile
            </Link>
        </div>
        {/* Register Link */}
        <div className="login-link">
          Don’t have an account?
        <button
              type="button"
              className="login-button"
              onClick={() => navigate("/register")}
              >
                 Register Now
       </button>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
