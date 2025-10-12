import { useState } from "react";
import"./email-sign.css";


function MobileLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Send OTP
  const sendOtp = async () => {
    setLoading(true);
    setError("");
try {
    const BASE_API = "lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net";
  const res = await fetch(
     `https://${BASE_API}/api/LoginWithMobile/send-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }), // 👈 must include body
    }
  );

  if (!res.ok) {
    throw new Error("Failed to send OTP");
  }

  const data = await res.json();
  console.log("OTP Sent:", data);
} catch (err) {
  console.error("Error:", err);
}

  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    try {

       const BASE_API = "lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net";
      const res = await fetch( `https://${BASE_API}/api/LoginWithMobile/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      if (!res.ok) throw new Error("OTP verification failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      alert("Login Successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
 <div className="otp-container">
  {step === "mobile" && (
    <div>
      <h4>Login With Mobile</h4>
      <input
        type="text"
        placeholder="Enter mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={sendOtp} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </div>
  )}

  {step === "otp" && (
    <div>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  )}

  {error && <p>{error}</p>}
</div>

  )

}
export default MobileLogin;
