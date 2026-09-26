import { useNavigate } from "react-router-dom";
import "./ClaimCard.css";

function ClaimCard({ claim }) {
  const navigate = useNavigate();

  // Status → color mapping
  const statusClass =
    claim.status === "APPROVE"
      ? "card-approve"
      : claim.status === "REJECT"
      ? "card-reject"
      : claim.status === "FLAG"
      ? "card-flag"
      : "card-processing";

  const statusIcon =
    claim.status === "APPROVE"
      ? "✅"
      : claim.status === "REJECT"
      ? "❌"
      : claim.status === "FLAG"
      ? "⚠️"
      : "⏳";

  return (
    <div
      className={`claim-card ${statusClass}`}
      onClick={() => navigate(`/claim/${claim.id}`)}
    >
      <div className="claim-card-header">
        <span className="claim-status-badge">
          {statusIcon} {claim.status || "PROCESSING"}
        </span>
        <span className="claim-id">#{claim.id}</span>
      </div>

      <h3 className="claim-card-title">
        {claim.title || "Auto-generated Claim"}
      </h3>

      <div className="claim-card-details">
        <div className="claim-detail-row">
          <span className="claim-detail-label">Policy:</span>
          <span className="claim-detail-value">
            {claim.policyNumber || "N/A"}
          </span>
        </div>
        <div className="claim-detail-row">
          <span className="claim-detail-label">Amount:</span>
          <span className="claim-detail-value">
            {claim.claimAmount ? `$${claim.claimAmount}` : "N/A"}
          </span>
        </div>
        <div className="claim-detail-row">
          <span className="claim-detail-label">Type:</span>
          <span className="claim-detail-value">
            {claim.type || "Unknown"}
          </span>
        </div>
      </div>

      <div className="claim-card-footer">
        <span className="claim-view-link">View Details →</span>
      </div>
    </div>
  );
}

export default ClaimCard;