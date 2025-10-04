import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [
    password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMsg("");

      const res = await fetch(
        "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/RequestResetPassword/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token, newPassword : password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reset failed. Please try again.");
      } else {
        setMsg(data.message || "Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-form">
      <h2>Reset Your Password</h2>

      {error && <p className="error">{error}</p>}
      {msg && <p className="success">{msg}</p>}

      {/* No token validation step — always show form */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        <button type="submit" disabled={loading} className="reset-button">
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
