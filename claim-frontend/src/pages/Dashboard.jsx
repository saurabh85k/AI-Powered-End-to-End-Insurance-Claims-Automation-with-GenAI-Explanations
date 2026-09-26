import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ClaimCard from "../components/ClaimCard";
import Spinner from "../ui/Spinner";
import "../pages/Dashboard.css";

function Dashboard() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/claims")
      .then((res) => res.json())
      .then((data) => {
        setClaims(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching claims:", err);
        setLoading(false);
      });
  }, []);

  // Stats calculate karo
  const stats = {
    total: claims.length,
    approved: claims.filter((c) => c.status === "APPROVE").length,
    rejected: claims.filter((c) => c.status === "REJECT").length,
    flagged: claims.filter((c) => c.status === "FLAG").length,
    processing: claims.filter((c) => c.status === "Processing").length,
  };

  return (
    <div>
      <Navbar />

      <div className="page-container animate-fade-in">
        {/* HEADER */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-subtitle">Track and manage all insurance claims</p>
          </div>
          <button
            className="dash-new-btn"
            onClick={() => navigate("/form")}
          >
            + New Claim
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="stats-grid">
          <div className="stat-box stat-total">
            <div className="stat-box-icon">📊</div>
            <div className="stat-box-content">
              <div className="stat-box-value">{stats.total}</div>
              <div className="stat-box-label">Total Claims</div>
            </div>
          </div>

          <div className="stat-box stat-approved">
            <div className="stat-box-icon">✅</div>
            <div className="stat-box-content">
              <div className="stat-box-value">{stats.approved}</div>
              <div className="stat-box-label">Approved</div>
            </div>
          </div>

          <div className="stat-box stat-rejected">
            <div className="stat-box-icon">❌</div>
            <div className="stat-box-content">
              <div className="stat-box-value">{stats.rejected}</div>
              <div className="stat-box-label">Rejected</div>
            </div>
          </div>

          <div className="stat-box stat-flagged">
            <div className="stat-box-icon">⚠️</div>
            <div className="stat-box-content">
              <div className="stat-box-value">{stats.flagged}</div>
              <div className="stat-box-label">Flagged</div>
            </div>
          </div>
        </div>

        {/* CLAIMS LIST */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
            <Spinner />
          </div>
        ) : claims.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No claims yet</h3>
            <p>Click "New Claim" to submit your first claim.</p>
          </div>
        ) : (
          <div className="claims-grid">
            {claims.map((claim) => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;