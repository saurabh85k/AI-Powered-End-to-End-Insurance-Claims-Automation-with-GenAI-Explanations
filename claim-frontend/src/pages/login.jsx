import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(u => u.email === email && u.password === password);

    if ((email === "admin@gmail.com" && password === "1234") || userExists) {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div className="card" style={{
        width: "360px",
        textAlign: "center"
      }}>

        <h2>🛡 Insurance AI</h2>
        <p style={{ color: "#94a3b8" }}>Login to continue</p>

        <form onSubmit={handleLogin}>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={{ width: "100%" }}>
            Login
          </button>

        </form>

        <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "15px" }}>
          Don't have an account? <Link to="/register" style={{ color: "#3b82f6", textDecoration: "none" }}>Register here</Link>
        </p>

        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "10px" }}>
          demo: admin@gmail.com / 1234
        </p>

      </div>
    </div>
  );
}

export default Login;