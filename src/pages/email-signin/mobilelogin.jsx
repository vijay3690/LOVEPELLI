import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./email-sign.css";

function MobileLogin({ onClose }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const Base_api=import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobile(value);
      if (/^[6-9]\d{9}$/.test(value)) setError("");
      else if (value.length > 0)
        setError("Invalid mobile number. Must be 10 digits starting with 6–9.");
      else setError("");
    } else {
      setError("Only digits are allowed.");
    }
  };

  const sendOtp = async () => {
    setError("");
    setMessage("");
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number before requesting OTP.");
      return;
    }

    try {
      const res = await fetch(`${Base_api}/api/LoginWithMobile/send-otp`, {
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
      setError(err.message.includes("fetch") ? "Server unreachable." : err.message);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const res = await fetch(`${Base_api}/api/LoginWithMobile/verify-otp`, {
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
      window.location.href = "/homefour";
    } catch (err) {
      console.error("Verify OTP Error:", err);
      setError(err.message.includes("fetch") ? "Server unreachable." : err.message);
    }
  };

  const closeModal = () => {
    if (onClose) onClose();
    else navigate("/");
  };

  return (
      <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <div className="modal-content">
          <button className="close-btn" onClick={closeModal} aria-label="Close dialog">
            ✖
          </button>
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
                autoComplete="tel"
              />
              <button type="button" onClick={sendOtp} disabled={!/^[6-9]\d{9}$/.test(mobile)}>
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
      </div>
    </div>
  );
}

export default MobileLogin;