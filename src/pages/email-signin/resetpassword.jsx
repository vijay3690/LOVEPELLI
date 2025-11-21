import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";



function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState("");
  const Base_api = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // Get token and email from URL search params
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      setError("Invalid or expired password reset link.");
    }
  }, [token, email]);

  // ✅ Password strength checker
  const checkPasswordStrength = (value) => {
    if (value.length < 6) return "Weak";
    if (/[A-Z]/.test(value) && /\d/.test(value) && /[@$!%*?&]/.test(value))
      return "Strong";
    if (/[A-Z]/.test(value) || /\d/.test(value) || /[@$!%*?&]/.test(value))
      return "Medium";
    return "Weak";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(checkPasswordStrength(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!token || !email) {
      setError("Invalid or expired password reset link.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        email,
        token,
        newPassword: password,
      };

      const res = await fetch(
       `${Base_api}/api/RequestRestPassword/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({
        message: "Unexpected server response",
      }));

      console.log("Response:", res.status, data);

      if (!res.ok) {
        setError(data.message || "Reset failed. Please try again.");
      } else {
        setMsg(data.message || "Password updated successfully!");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      console.error("Network/Fetch error:", err);
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Password strength color
  const getStrengthColor = () => {
    switch (strength) {
      case "Weak":
        return "#d93025";
      case "Medium":
        return "#f9a825";
      case "Strong":
        return "#2e7d32";
      default:
        return "#999";
    }
  };

  return (
    <div className="reset-password-form">
      <h2>Reset Your Password</h2>

      {error && <p className="error">{error}</p>}
      {msg && <p className="success">{msg}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={handlePasswordChange}
            required
            minLength={6}
          />
          {password && (
            <p
              className="strength"
              style={{ color: getStrengthColor(), marginTop: "4px" }}
            >
              Strength: {strength}
            </p>
          )}
        </div>

        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
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
