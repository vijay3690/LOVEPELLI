import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";

function OtpDialog({ step, mobile }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
   const [time, setTime] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const Base_api = import.meta.env.VITE_BASE_URL;

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); // stop form submit   
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus(); // move to next field
      } else {
        verifyOtp(); // submit action
      }
    }
  };

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
     if (time > 0) return; // Prevent click during timer
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
      await new Promise((resolve) => setTimeout(resolve, 3000));
      localStorage.setItem("token", data.token);
      setMessage("OTP Verified Successfully!");
         setTime(5); // Start 30 sec timer
    setTimer(3); // Start timer for resend OTP
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

  // Countdown for resend timer
  useEffect(() => {
    let interval;
    if (time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [time]);

  const closeDialog = () => {
    dialogRef.current.close();
    navigate("/register");
  };

  return (
    <dialog ref={dialogRef} className="verify-otp-dialog">
      <button className="close-btn" onClick={closeDialog}>✖</button>

      <h2>Verify OTP</h2>
    {/* Full Screen Overlay Loader */}
              {loading && (
                <div className="overlay-loader">
                  <div className="spinner"><img src="assets/images/gifs/Spinner1.gif" alt="Spinner" /></div>
                  <p>Sending OTP...</p>
                </div>
              )}
      <input
        type="text"
        value={otp}
        inputMode="numeric"
        maxLength={6}
        disabled={loading}
        ref={el => inputRefs.current[0] = el}
        onKeyDown={(e) => handleKeyDown(e, 0)}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        placeholder="Enter 6-digit OTP"
        autoFocus
      />

      {error && <p className="error-text">{error}</p>}
      {message && <p className="success-text">{message}</p>}

      <button id="submitBtn" onClick={verifyOtp} disabled={loading || otp.length !== 6}>
          {time > 0 ? `Resend in ${time}s` : "Verify OTP"}
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
