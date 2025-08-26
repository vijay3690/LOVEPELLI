import React from "react";
import { Mail, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import "./signuppage.css" // Importing the CSS file
import Glogin from "./gmail"; // Importing the Glogin component

const SignUp = () => {
  return (
    <>
      {/* Logo */}
      <div className="logo signup-logo">
        <Link to="/">
          <img 
            src="assets/images/logo/lovepelli_logo_big.png"  
            alt="logo" 
            className="signup-logo-img"
          />
        </Link>
      </div>
      <div className="signup-container">
        {/* Sign Up Section */}
        <div className="signup-box">
          <h2 className="signup-title">New to LovePelli?</h2>

          <button className="signup-button">
            <Mail size={18} />
            Sign Up with Email
          </button>

          <button className="signup-button">
            <Smartphone size={18} />
            Sign Up with Mobile
          </button>
              
          <Glogin/>

        
        </div>

        {/* Login Link */}
        <div className="login-link">
          Already have an account?
          <button className="login-button">Login</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
