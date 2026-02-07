import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const CLIENT_ID = "198026776192-ug5083pnn7t0m5g4cdb9cj3q1k9ksnrb.apps.googleusercontent.com"// OAUTH GOOGLE CLOUD AUTHENTICATION.

function oauth() {
  const handleSuccess = async (credentialResponse) => {
    // Get ID Token
    const token = credentialResponse.credential;

    // Decode (optional, just to see user info on frontend)
    const userInfo = jwt_decode(token);
    console.log("Google User:", userInfo);

    // Send token to backend for verification
    const res = await fetch("https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    console.log("Backend Response:", data);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="App">
        <h1>Login with Google</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default oauth;
