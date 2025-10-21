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
      
//           <div>
//             <GoogleLogin
//               onSuccess={handleSuccess}
//               onError={handleFailure}
//               theme="filled_white"
//               shape="rectangular"
//               size="large"
//               logo_alignment="left"
//             />
//           </div>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };


// export default Glogin;



// Login.js
// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';

// function Glogin() {
//   const handleSuccess = (credentialResponse) => {
//     console.log('Login Success:', credentialResponse);
//     // Typically, send credentialResponse.credential (JWT token) to your backend for verification
//   };

//   const handleError = () => {
//     console.log('Login Failed');
//   };

//   return (
//     <div>
//       {/* <h2>Log in using Google</h2> */}
//       <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
//     </div>
//   );
// }

// export default Glogin;



import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
// import google from "../pages/otp-signin/google.png"; //  Correct image import path

export default function Glogin() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(" Google Login Success:", tokenResponse);
      alert("Google login successful!");
    },
    onError: () => {
      console.error(" Google Login Failed");
      alert("Google login failed!");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-full hover:shadow-md transition-all duration-200"
      style={{ minWidth: "260px" }}
    >
      <img src="assets/images/logo/google.png" alt="Google" className="w-5 h-5" />
      Sign Up with Google
    </button>
  );
}
