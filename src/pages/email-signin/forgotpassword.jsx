import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./email-sign.css";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const Base_api=import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    //  Basic validation
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
       `${Base_api}/api/RequestRestPassword/request-password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: await response.text() };
      }

      console.log("Response:", response.status, data);

      if (!response.ok) {
        setError(data.message || "Failed to send reset link. Please try again.");
      } else {
        setMsg(data.message || "Reset link sent successfully!");
        setEmail("");

        //  Redirect to login or same page after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-input"
        />

        <button
          type="submit"
          disabled={loading}
          className="forgot-button"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}
      {msg && <p className="success-msg">{msg}</p>}
    </div>
  );
}

export default ForgotPassword;
