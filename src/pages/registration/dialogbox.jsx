import { useEffect, useRef, useState } from "react";
import "./registration.css";


function OtpDialog({ step, mobile, onClose }) {
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const dialogRef = useRef(null);
  const Base_api = import.meta.env.VITE_BASE_URL;

  // Open/close the dialog based on the current step
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (step === "otp" && !dlg.open) {
      dlg.showModal();
    } else if (step !== "otp" && dlg.open) {
      dlg.close();
    }
  }, [step]);

  async function handleVerify() {
    if (!otp || otp.length !== 6 || verifying) return;
    setError("");
    setMessage("");
    setVerifying(true);
    try {
      const res = await fetch(`${Base_api}/api/LoginWithMobile/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ContactNumber: String(mobile || "").trim(),
          Code: String(otp || "").trim(),
        }),
      });

      const data =
        (await res.json().catch(() => ({ message: "Invalid server response" }))) ||
        {};

      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      if (data.token) localStorage.setItem("token", data.token);
      setMessage("Otp Verified!");
      dialogRef.current?.close();
      onClose?.();
      setOtp("");
    } catch (err) {
      const msg =
        (err && typeof err.message === "string" && err.message) ||
        "Verification error";
      setError(msg.includes("fetch") ? "Server unreachable." : msg);
    } finally {
      setVerifying(false);
    }
  }
 const closeModal = () => {
    navigate("/");
  };

  return (
  <dialog ref={dialogRef} aria-label="OTP verification" className="verify-otp-dialog">
  <button className="close-icon" onClick={closeModal}>
    ✖
  </button>
  <h2>Verify Otp</h2>
  <div className="otp-row">
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) =>
        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
      }
      maxLength={6}
      inputMode="numeric"
      pattern="[0-9]{6}"
      autoComplete="one-time-code"
      enterKeyHint="done"
      aria-label="One-time code"
      className="otp-input"
      autoFocus
    />
    <button
      type="button"
      onClick={handleVerify}
      disabled={!otp || otp.length !== 6 || verifying}
      aria-busy={verifying ? "true" : "false"}
      className="verify-btn"
    >
      {verifying ? "Verifying..." : "Verify OTP"}
    </button>
  </div>
  {error && <p className="error-msg">{error}</p>}
  {message && <p className="success-msg">{message}</p>}
</dialog>

  );
}

export default OtpDialog;
