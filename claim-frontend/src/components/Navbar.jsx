import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      background: "var(--bg-glass)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border-glass)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      color: "white"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        <span style={{ fontSize: "1.5rem" }}>🛡️</span>
        <h2 style={{ margin: 0, fontSize: "1.4rem", letterSpacing: "1px" }}>Insurance AI</h2>
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <button 
          onClick={() => navigate("/dashboard")}
          style={{ background: "transparent", boxShadow: "none", border: "1px solid var(--border-glass)", color: "var(--text-secondary)" }}
        >
          Dashboard
        </button>
        <button onClick={() => navigate("/form")}>
          New Claim
        </button>
        <button 
          onClick={logout} 
          style={{ background: "transparent", boxShadow: "none", color: "#ef4444" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;