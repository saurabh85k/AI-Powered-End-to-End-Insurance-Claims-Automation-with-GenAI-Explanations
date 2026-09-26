import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (email === "admin@claimpilot.com" && password === "admin123") {
      setErrorMsg("");
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", "admin");
      navigate("/dashboard");
    } else {
      setErrorMsg("Invalid admin credentials.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🛡️</div>
          <h1 className="auth-brand">Admin Portal</h1>
          <p className="auth-subtitle">ClaimPilot Administrator Access</p>
        </div>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <form className="auth-form" onSubmit={handleAdminLogin}>
          <label className="auth-label">Admin Email</label>
          <input
            className="auth-input"
            type="email"
            placeholder="admin@claimpilot.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="auth-label">Admin Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn auth-btn-admin" type="submit">
            Sign In as Admin
          </button>
        </form>

        <p className="auth-link">
          Not an admin? <Link to="/login">User Login</Link>
        </p>

        <div className="auth-demo">
          Demo: <strong>admin@claimpilot.com / admin123</strong>
        </div>

        <Link to="/" className="auth-home-link">← Back to Home</Link>
      </div>
    </div>
  );
}

export default AdminLogin;