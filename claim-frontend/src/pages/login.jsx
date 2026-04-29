import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "1234") {
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

        <p style={{ fontSize: "12px", color: "#94a3b8" }}>
          demo: admin@gmail.com / 1234
        </p>

      </div>
    </div>
  );
}

export default Login;