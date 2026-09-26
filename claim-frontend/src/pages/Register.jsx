import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMsg("Please fill all fields");
      return;
    }

    if (password.length < 4) {
      setErrorMsg("Password must be at least 4 characters");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.find(u => u.email === email)) {
      setErrorMsg("Email already registered. Please login.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    setErrorMsg("");
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">✨</div>
          <h1 className="auth-brand">Create Account</h1>
          <p className="auth-subtitle">Join ClaimPilot today</p>
        </div>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <form className="auth-form" onSubmit={handleRegister}>
          <label className="auth-label">Full Name</label>
          <input
            className="auth-input"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="auth-label">Email Address</label>
          <input
            className="auth-input"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Register
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>

        <Link to="/" className="auth-home-link">← Back to Home</Link>
      </div>
    </div>
  );
}

export default Register;