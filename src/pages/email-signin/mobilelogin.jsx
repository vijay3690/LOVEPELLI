import { useState } from "react";
import { BASE_API } from "./emailsign";
import "./email-sign.css";

function MobileLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Validate and set mobile input
  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setMobile(value);

      if (/^[6-9]\d{9}$/.test(value)) {
        setError("");
      } else if (value.length > 0) {
        setError("Invalid mobile number. Must be 10 digits starting with 6–9.");
      } else {
        setError("");
      }
    } else {
      setError("Only digits are allowed.");
    }
  };

  // 🔹 Send OTP
  const sendOtp = async () => {
    setError("");
    setMessage("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number before requesting OTP.");
      return;
    }

    try {
      const res = await fetch(`${BASE_API}/api/LoginWithMobile/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactNumber: mobile.trim() }),
      });

      const data = await res.json().catch(() => ({ message: "Invalid server response" }));
      console.log("Send OTP Response:", data, "Status:", res.status);

      if (!res.ok) throw new Error(data?.message || "Failed to send OTP");

      setMessage("OTP sent successfully!");
      setStep("otp");
    } catch (err) {
      console.error("Send OTP Error:", err);
      if (err.message === "Failed to fetch") {
        setError("Cannot reach server. Check internet or backend CORS configuration.");
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

      const data = await res.json().catch(() => ({ message: "Invalid server response" }));
      console.log("Verify OTP Response:", data);

      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      localStorage.setItem("token", data.token);
      setMessage("Login Successful!");
      window.location.href = "/";
    } catch (err) {
      console.error("Verify OTP Error:", err);
      if (err.message === "Failed to fetch") {
        setError("Cannot reach server. Check your internet connection or backend CORS setup.");
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
            onChange={handleChange}
            maxLength="10"
          />
          <button
            onClick={sendOtp}
            disabled={!/^[6-9]\d{9}$/.test(mobile)}
          >
            Send OTP
          </button>
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
            maxLength="6"
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
