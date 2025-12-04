// import React,{useState} from 'react';
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { Navigate } from 'react-router-dom';
// import "./signuppage.css"; 

// const CLIENT_ID = "116674436581-u7228uk99lgttf51r2km6iu2vsn0ump2.apps.googleusercontent.com"; // Replace with your actual client ID

// const Glogin = () => {
  
//   const [auth, setAuth] = useState(false);
  
//   if (auth) {
//     return <Navigate to="/homefour" replace />;
//   }
  
//     const handleSuccess = (response) => {
//         console.log("Login Success:", response);
//         setAuth(true); // Set auth to true on successful login
//       };
    
//       const handleFailure = (error) => {
//         console.error("Login Failed:", error);
//       };

//  return (
//     <GoogleOAuthProvider clientId={CLIENT_ID}>
//       <div className="flex justify-center items-center ">
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}>
      
//           <div style={className="signup-button"}>
//             <GoogleLogin
//               onSuccess={handleSuccess}
//               onError={handleFailure}
//               theme="filled_white"
//               size="large"
//               shape="pill"
//               logo_alignment="left"
//             />
//           </div>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };


// export default Glogin;



import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

function Glogin() {
  const navigate = useNavigate(); // Move this BEFORE login
  
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      alert("Google login successful!");
      navigate("/homefour");
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
