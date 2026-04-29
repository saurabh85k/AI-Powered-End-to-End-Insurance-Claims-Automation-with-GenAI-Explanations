import { useNavigate } from "react-router-dom";

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="card animate-fade-in" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      textAlign: "center",
      gridColumn: "1 / -1" // Spans all grid columns
    }}>
      <div style={{ fontSize: "4rem", marginBottom: "20px", opacity: 0.8 }}>📁</div>
      <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "10px" }}>No claims found</h3>
      <p style={{ color: "var(--text-secondary)", maxWidth: "400px", marginBottom: "30px" }}>
        You haven't submitted any insurance claims yet. Upload a document and let our AI handle the rest!
      </p>
      <button onClick={() => navigate("/form")}>
        + Create Your First Claim
      </button>
    </div>
  );
}
