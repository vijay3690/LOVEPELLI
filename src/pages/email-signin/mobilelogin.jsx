import { useState } from "react";
import { BASE_API } from "./emailsign";
import "./email-sign.css";

function MobileLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  
  // 🔹 Send OTP
  const sendOtp = async () => {
    setError("");
    setMessage("");

    if (!mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    try {
      // Using Vite proxy: no need for full URL
      const res = await fetch(`${BASE_API}/api/LoginWithMobile/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactNumber: mobile.trim() }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Invalid server response" };
      }

      console.log("Send OTP Response:", data, "Status:", res.status);

      if (!res.ok) {
        throw new Error(data?.message || `Failed to send OTP (status ${res.status})`);
      }

      setMessage("OTP sent successfully!");
      setStep("otp");
    } catch (err) {
      console.error("Send OTP Error:", err);

      if (err.message === "Failed to fetch") {
        setError(
          "Cannot reach server. Check your internet connection or backend CORS configuration."
        );
      } else if (err.message.includes("network")) {
        setError("Network error: Please check your internet connection.");
      } else if (err.message.includes("Invalid server response")) {
        setError("Server error: Unable to process OTP request.");
      } else {
        setError(err.message);
      }
    }
  };

  // 🔹 Verify OTP
  const verifyOtp = async () => {
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const res = await fetch(`${BASE_API}/api/LoginWithMobile/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ContactNumber: mobile.trim(),
          Code: otp.trim(),
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Invalid server response" };
      }

      console.log("Verify OTP Response:", data);

      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      localStorage.setItem("token", data.token);
      setMessage("Login Successful!");
      window.location.href = "/";
    } catch (err) {
      console.error("Verify OTP Error:", err);

      if (err.message === "Failed to fetch") {
        setError(
          "Cannot reach server. Check your internet connection or backend CORS configuration."
        );
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="otp-container">
      {step === "mobile" && (
        <div>
          <h4>Login With Mobile</h4>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}

      {step === "otp" && (
        <div>
          <h4>Verify OTP</h4>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>

          <p
            style={{ marginTop: "10px", cursor: "pointer", color: "#007bff" }}
            onClick={() => setStep("mobile")}
          >
            ← Change Number
          </p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default MobileLogin;
