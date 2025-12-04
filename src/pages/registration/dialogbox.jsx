import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";

function OtpDialog({ step, mobile }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const Base_api = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (step === "otp") dialogRef.current?.showModal();
  }, [step]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const resendOtp = async () => {
    setTimer(30);
    await fetch(`${Base_api}/api/LoginWithMobile/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactNumber: mobile }),
    });
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Enter 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${Base_api}/api/LoginWithMobile/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ContactNumber: mobile.trim(),
          Code: otp.trim(),
        }),
      });

      const data = await response.json();
      console.log("OTP verification response:", data);

      if (!response.ok) throw new Error(data.message || "OTP Verification failed");

      localStorage.setItem("token", data.token);
      setMessage("OTP Verified Successfully!");
      alert("OTP Verified Successfully!");
      dialogRef.current.close();
      navigate("/register");
      
    } catch (err) {
      console.log("OTP verification error:", err);
      setError(err.message.includes("fetch") ? "Server unreachable, try again." : err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    dialogRef.current.close();
    navigate("/register");
  };

  return (
    <dialog ref={dialogRef} className="verify-otp-dialog">
      <button className="close-btn" onClick={closeDialog}>✖</button>

      <h2>Verify OTP</h2>

      <input
        type="text"
        value={otp}
        inputMode="numeric"
        maxLength={6}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        placeholder="Enter 6-digit OTP"
        autoFocus
      />

      {error && <p className="error-text">{error}</p>}
      {message && <p className="success-text">{message}</p>}

      <button onClick={verifyOtp} disabled={loading || otp.length !== 6}>
        {loading ? "Loading..." : "Verify OTP"}
      </button>

      <p>
        Didn’t receive OTP?{" "}
        <button className="link-btn" disabled={timer !== 0} onClick={resendOtp}>
          {timer === 0 ? "Resend OTP" : `Resend in ${timer}s`}
        </button>
      </p>
    </dialog>
  );
}

export default OtpDialog;
