import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MessageBanner from "../ui/MessageBanner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(u => u.email === email && u.password === password);

    if ((email === "admin@gmail.com" && password === "1234") || userExists) {
      setErrorMsg("");
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      setErrorMsg("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "40px 30px", textAlign: "center" }}>
        
        <div style={{ marginBottom: "30px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🛡️</div>
          <h2 style={{ fontSize: "1.8rem", margin: "0 0 10px 0", color: "white" }}>Insurance AI</h2>
          <p style={{ color: "var(--text-secondary)", margin: 0 }}>Login to your dashboard</p>
        </div>

        <MessageBanner type="error" message={errorMsg} />

        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginLeft: "5px" }}>Email Address</label>
          <input
            placeholder="admin@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginLeft: "5px", marginTop: "10px", display: "block" }}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={{ width: "100%", marginTop: "20px", height: "45px" }}>
            Sign In
          </button>
        </form>

        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "25px" }}>
          Don't have an account? <Link to="/register" style={{ color: "var(--accent-hover)", fontWeight: "500" }}>Register here</Link>
        </p>

        <div style={{ marginTop: "25px", paddingTop: "15px", borderTop: "1px solid var(--border-glass)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Demo Credentials: <span style={{ color: "var(--text-secondary)" }}>admin@gmail.com / 1234</span>
        </div>

      </div>
    </div>
  );
}

export default Login;