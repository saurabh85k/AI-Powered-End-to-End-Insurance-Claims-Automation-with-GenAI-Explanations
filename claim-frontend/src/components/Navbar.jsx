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
      padding: "15px 20px",
      background: "#111827",
      color: "white"
    }}>
      <h2 style={{ margin: 0 }}>🛡 Insurance AI</h2>

      <div>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/form")}>New Claim</button>
        <button onClick={logout} style={{ background: "red" }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;