import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MessageBanner from "../ui/MessageBanner";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Basic local storage simulation for registration
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccessMsg("Registration Successful! Redirecting...");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "40px 30px", textAlign: "center" }}>
        
        <div style={{ marginBottom: "30px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🛡️</div>
          <h2 style={{ fontSize: "1.8rem", margin: "0 0 10px 0", color: "white" }}>Create Account</h2>
          <p style={{ color: "var(--text-secondary)", margin: 0 }}>Join Insurance AI today</p>
        </div>

        <MessageBanner type="success" message={successMsg} />

        <form onSubmit={handleRegister} style={{ textAlign: "left" }}>
          
          <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginLeft: "5px" }}>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginLeft: "5px", marginTop: "10px", display: "block" }}>Email Address</label>
          <input
            type="email"
            placeholder="john@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginLeft: "5px", marginTop: "10px", display: "block" }}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={{ width: "100%", marginTop: "20px", height: "45px" }}>
            Register
          </button>

        </form>

        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "25px" }}>
          Already have an account? <Link to="/" style={{ color: "var(--accent-hover)", fontWeight: "500" }}>Log In</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
