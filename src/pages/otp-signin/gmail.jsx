import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = "565556449054-3docc8pdalpcanpm1ua0gfndt5b7n78g.apps.googleusercontent.com";
                   

const Glogin = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  // Redirect when auth becomes true
  useEffect(() => {
    if (auth) {
      navigate("/homefour", { replace: true });
    }
  }, [auth, navigate]);

  const handleSuccess = (response) => {
    console.log("Login Success:", response);
    setAuth(true);
  };

  const handleFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex justify-center items-center">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            width: '223px',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}>
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
