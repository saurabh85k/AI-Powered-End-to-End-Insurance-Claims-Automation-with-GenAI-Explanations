import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FileIcon, ArrowLeftIcon, AlertIcon } from "../ui/Icons";

function ClaimDetails() {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/claims/${id}`)
      .then((res) => res.json())
      .then((data) => setClaim(data))
      .catch((err) => console.error("Error fetching claim:", err));
  }, [id]);

  if (!claim) return <h3>Loading...</h3>;

  return (
    <div>
      <Navbar />

      <div className="page-container animate-fade-in">
        <Link to="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px", color: "var(--text-secondary)", textDecoration: "none" }}>
          <ArrowLeftIcon /> Back to Dashboard
        </Link>
        
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="card" style={{ width: "100%", maxWidth: "700px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "25px", borderBottom: "1px solid var(--border-glass)", paddingBottom: "20px" }}>
              <div style={{ color: "var(--accent-primary)" }}>
                <FileIcon />
              </div>
              <h2 style={{ margin: 0, fontSize: "1.6rem" }}>Claim Review</h2>
            </div>

          <h3 style={{ fontSize: "1.3rem", color: "white", marginBottom: "10px" }}>{claim.title}</h3>
          <p style={{ marginBottom: "20px" }}>{claim.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px", background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "10px" }}>
            <div>
              <small style={{ color: "var(--text-muted)" }}>Status</small>
              <div style={{ fontWeight: "600", color: claim.status === "REJECT" || claim.status === "Rejected" ? "#ef4444" : claim.status === "APPROVE" || claim.status === "Approved" ? "#22c55e" : "#3b82f6" }}>
                {claim.status}
              </div>
            </div>
            {claim.policyNumber && (
              <div>
                <small style={{ color: "var(--text-muted)" }}>Policy Number</small>
                <div style={{ fontWeight: "600", color: "white" }}>{claim.policyNumber}</div>
              </div>
            )}
            {claim.claimAmount && (
              <div>
                <small style={{ color: "var(--text-muted)" }}>Amount</small>
                <div style={{ fontWeight: "600", color: "white" }}>${claim.claimAmount}</div>
              </div>
            )}
            {claim.fileName && (
              <div>
                <small style={{ color: "var(--text-muted)" }}>Document</small>
                <div style={{ fontWeight: "600", color: "white" }}>{claim.fileName}</div>
              </div>
            )}
          </div>
          
          {claim.decisionReason && (
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "rgba(239, 68, 68, 0.1)", borderLeft: "4px solid #ef4444", color: "#fca5a5", borderRadius: "0 8px 8px 0", display: "flex", gap: "12px" }}>
              <div style={{ color: "#ef4444", marginTop: "2px" }}>
                <AlertIcon />
              </div>
              <div>
                <b style={{ color: "#ef4444", display: "block", marginBottom: "5px" }}>Decision Logic Alert:</b>
                {claim.decisionReason}
              </div>
            </div>
          )}

          {claim.extractedText && (
            <div style={{ marginTop: "25px" }}>
              <h4 style={{ marginBottom: "10px", color: "var(--text-secondary)" }}>AI Extracted Text</h4>
              <pre>
                {claim.extractedText}
              </pre>
            </div>
          )}

        </div>
      </div>
      </div>
    </div>
  );
}

export default ClaimDetails;