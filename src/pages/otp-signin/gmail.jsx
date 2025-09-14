import React,{useState} from 'react'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Navigate } from 'react-router-dom';



const CLIENT_ID = "447299056493-b2ormt215f6hqvbjmrla1jv4ft0d0ue4.apps.googleusercontent.com"; // Replace with your actual client ID

const Glogin = () => {
  
  const [auth, setAuth] = useState(false);
  
  if (auth) {
    return <Navigate to="/homefour" replace />;
  }
  
    const handleSuccess = (response) => {
        console.log("Login Success:", response);
        setAuth(true); // Set auth to true on successful login
      };
    
      const handleFailure = (error) => {
        console.error("Login Failed:", error);
      };

 return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex justify-center items-center ">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
      
          <div style={{ width: '223px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleFailure}
              theme="filled_white"
              size="large"
              shape="pill"
              logo_alignment="left"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};


export default Glogin;
