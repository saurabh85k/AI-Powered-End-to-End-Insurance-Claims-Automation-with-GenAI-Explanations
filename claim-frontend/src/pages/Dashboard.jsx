import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("claims")) || [];
    setClaims(data);
  }, []);

  const getColor = (status) => {
    if (status === "Approved") return "#22c55e";
    if (status === "Rejected") return "#ef4444";
    return "#f59e0b";
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>

        <h1>📊 Dashboard</h1>
        <p style={{ color: "#94a3b8" }}>
          Track all insurance claims
        </p>

        <button onClick={() => navigate("/form")}>
          ➕ New Claim
        </button>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
          marginTop: "20px"
        }}>

          {claims.map((claim) => (
            <div
              key={claim.id}
              className="card"
              onClick={() => navigate(`/claim/${claim.id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3>{claim.title}</h3>

              <p>Type: {claim.type}</p>

              <p>
                Status:{" "}
                <b style={{ color: getColor(claim.status) }}>
                  {claim.status}
                </b>
              </p>

              <small style={{ color: "#94a3b8" }}>
                📍 {claim.location}
              </small>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;