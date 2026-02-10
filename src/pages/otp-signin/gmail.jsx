
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

function Glogin() {
  const navigate = useNavigate(); // Move this BEFORE login
  
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      alert("Google login successful!");
      navigate("/homeone"); // Navigate to homeone on successful login
    },
    onError: () => {
      console.error("Google Login Failed");
      alert("Google login failed!");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-full hover:shadow-md transition-all duration-200"
      style={{ minWidth: "260px" }}
    >
      <img 
        src="assets/images/logo/google.png" 
        alt="Google" 
        className="w-5 h-5" 
      />
      Sign Up with Google
    </button>
  );
}

export default Glogin;
