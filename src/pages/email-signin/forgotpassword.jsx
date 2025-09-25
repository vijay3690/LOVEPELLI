import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./email-sign.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMsg(data.message || "Reset link sent successfully!");
        setEmail("");

        setTimeout(() => {
          navigate("/reset-password/dummy-token");
        }, 1500);
      }
    } catch (err) {
      setError("Server error, please try again later.");
      console.error(err);
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
