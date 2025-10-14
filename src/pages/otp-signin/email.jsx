import React, { useState } from "react";
import "./SignUpPage.css";

function LoginEmail() {
  const [UserData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "/homefour";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Email Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            className={`form-input ${error ? "input-error" : ""}`}
            type="email"
            name="email"
            value={UserData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            className={`form-input ${error ? "input-error" : ""}`}
            type="password"
            name="password"
            value={UserData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="login-btn" type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginEmail;
