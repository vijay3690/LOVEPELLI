import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
   const [tokenValid, setTokenValid] = useState(null); // 👈 track token status

  // Get token and email from URL search params
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();

  // 🔹 Validate token when component loads
  useEffect(() => {
    const validateToken = async () => {
      if (!token || !email) {
        setError("Invalid or missing reset link.");
        setTokenValid(false);
        return;
      }

      try {
        const res = await fetch(
          "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/RequestResetPassword/validate-token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, token }),
          }
        );

        const data = await res.json();
        if (!res.ok || !data.valid) {
          setError(data.message || "Invalid or expired token.");
          setTokenValid(false);
        } else {
          setTokenValid(true);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to validate reset link. Please try again.");
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token, email]);

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

    if (!token || !email) {
      setError("Invalid password reset link");
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
        "https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/RequestResetPassword/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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

      {/* 🔹 Only show form if token is valid */}
      {tokenValid ? (
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
