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

  // Get token and email from URL search params
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token || !email) {
      setError("Invalid password reset link");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMsg("");

      // Prepare payloads for both attempts
      const payload1 = {
        email,
        token: encodeURIComponent(token),
        password,
      };
      const payload2 = {
        email,
        token: encodeURIComponent(token),
        newPassword: password,
      };

      // First attempt with "password"
      let res = await fetch(
        `https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/RequestRestPassword/reset-password/${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload1),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: await res.text() };
      }

      console.log("First attempt status:", res.status, "body:", data);

      // If first attempt not successful, try again with "newPassword"
      if (!res.ok) {
        res = await fetch(
          `https://lovepelliapi-gdcmb2ezcvcmedew.eastus2-01.azurewebsites.net/api/RequestRestPassword/reset-password/${encodeURIComponent(token)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload2),
          }
        );

        try {
          data = await res.json();
        } catch {
          data = { message: await res.text() };
        }

        console.log("Second attempt status:", res.status, "body:", data);
      }

      if (!res.ok) {
        setError(data.message || "Reset failed. Please try again.");
      } else {
        setMsg(data.message || "Password updated successfully!");
        // Navigate after 5 seconds
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
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6} // optionally add password rules
          />
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
