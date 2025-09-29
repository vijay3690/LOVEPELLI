import { useState } from "react";
import { useParams } from "react-router-dom";
import "./email-sign.css"; // import CSS file

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd) => {
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(pwd)) return "Password must be at least 8 characters";
    if (!upperCase.test(pwd)) return "Password must contain at least 1 uppercase letter";
    if (!number.test(pwd)) return "Password must contain at least 1 number";
    if (!specialChar.test(pwd)) return "Password must contain at least 1 special character";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Both fields are required");
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

try {
  setLoading(true);

  const res = await fetch(
    `https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/auth/reset-password/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword: password }),
    }
  );

  // Try parsing JSON, but fallback to text if empty
  let data;
  try {
    const raw = await res.text(); // get raw response
    data = raw ? JSON.parse(raw) : {}; // parse only if not empty
  } catch {
    data = {};
  }

  if (!res.ok) {
    setError(data.message || "Something went wrong");
  } else {
    setMsg(data.message || "Password updated successfully!");
    setPassword("");
    setConfirmPassword("");
  }
} catch (err) {
  setError("Server error, please try again later.");
  console.error("Reset password error:", err);
} finally {
  setLoading(false);
}

  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="reset-input"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="reset-input"
        />
        <button type="submit" disabled={loading} className="reset-button">
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}
      {msg && <p className="success-msg">{msg}</p>}
    </div>
  );
}

export default ResetPassword;
