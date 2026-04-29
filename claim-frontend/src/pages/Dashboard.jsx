import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EmptyState from "../ui/EmptyState";

function Dashboard() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/claims")
      .then((res) => res.json())
      .then((data) => setClaims(data))
      .catch((err) => console.error("Error fetching claims:", err));
  }, []);

  const getColor = (status) => {
    const s = status?.toUpperCase() || "";
    if (s === "APPROVED" || s === "APPROVE") return "#22c55e"; // Green
    if (s === "REJECTED" || s === "REJECT") return "#ef4444"; // Red
    if (s === "FLAG" || s === "FLAGGED") return "#f97316"; // Orange
    if (s === "PROCESSING") return "#3b82f6"; // Blue
    return "#f59e0b"; // Default yellow
  };

  return (
    <div>
      <Navbar />

      <div className="page-container animate-fade-in">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <h1 style={{ fontSize: "2rem", margin: 0 }}>📊 Dashboard</h1>
            <p style={{ color: "var(--text-secondary)", margin: "5px 0 0 0" }}>Track and manage all insurance claims</p>
          </div>
          <button onClick={() => navigate("/form")}>
            <span style={{ fontSize: "1.2rem" }}>+</span> New Claim
          </button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}>

          {claims.length === 0 ? (
            <EmptyState />
          ) : (
            claims.map((claim, index) => (
              <div
                key={claim.id}
                className="card animate-fade-in"
                onClick={() => navigate(`/claim/${claim.id}`)}
                style={{ cursor: "pointer", animationDelay: `${index * 0.05}s` }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.2rem", color: "white" }}>{claim.title}</h3>
                  <span className="badge" style={{ color: getColor(claim.status), backgroundColor: `${getColor(claim.status)}20` }}>
                    {claim.status}
                  </span>
                </div>

                <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "15px" }}>
                  <p style={{ margin: "0 0 8px 0" }}><b>Type:</b> {claim.type}</p>
                  <p style={{ margin: "0" }}><b>Amount:</b> ${claim.claimAmount || "N/A"}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text-muted)", fontSize: "0.85rem", borderTop: "1px solid var(--border-glass)", paddingTop: "12px" }}>
                  <span>📍</span> {claim.location || "Location not provided"}
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;