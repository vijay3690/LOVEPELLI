import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const CLIENT_ID =
  "447299056493-b2ormt215f6hqvbjmrla1jv4ft0d0ue4.apps.googleusercontent.com"; // Replace with your actual client ID

const Glogin = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);

    // Save user data if needed
    localStorage.setItem("googleUser", JSON.stringify(credentialResponse));

    // Redirect to homefour
    navigate("/homefour");
  };

  const handleFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex justify-center items-center">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "223px",
              borderRadius: "32px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
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
