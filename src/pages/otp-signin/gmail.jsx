import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const CLIENT_ID = "116674436581-u7228uk99lgttf51r2km6iu2vsn0ump2.apps.googleusercontent.com";

const Glogin = () => {
  const [auth, setAuth] = useState(false);

  if (auth) {
    return <Navigate to="/homefour" replace />;
  }

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 'px',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}
          >
            {/* Custom Google login button with Google icon */}
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleFailure}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    color: '#555',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px 30px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  <FcGoogle style={{ marginLeft: '20px', fontSize: '20px' }} />
                  Sign in with Google
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Glogin;
