import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Basic local storage simulation for registration
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful! Please login.");
    navigate("/");
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
        <p style={{ color: "#94a3b8" }}>Create a new account</p>

        <form onSubmit={handleRegister}>
          
          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={{ width: "100%", marginBottom: "15px" }}>
            Register
          </button>

        </form>

        <p style={{ fontSize: "14px", color: "#94a3b8" }}>
          Already have an account? <Link to="/" style={{ color: "#3b82f6", textDecoration: "none" }}>Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
