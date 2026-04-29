function ClaimCard({ claim }) {
  const color =
    claim.status === "Approved"
      ? "green"
      : claim.status === "Review"
      ? "red"
      : "orange";

  return (
    <div style={{
      border: "1px solid #ccc",
      margin: "10px",
      padding: "10px",
      borderRadius: "8px"
    }}>
      <h3>{claim.name}</h3>
      <p>Amount: ₹{claim.amount}</p>
      <p style={{ color }}>Status: {claim.status}</p>
    </div>
  );
}

export default ClaimCard;