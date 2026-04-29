import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function ClaimDetails() {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("claims")) || [];
    const found = data.find((c) => c.id == id);
    setClaim(found);
  }, [id]);

  if (!claim) return <h3>Loading...</h3>;

  return (
    <div>
      <Navbar />

      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px"
      }}>

        <div className="card" style={{ width: "420px" }}>

          <h2>📄 Claim Details</h2>

          <h3>{claim.title}</h3>
          <p>{claim.description}</p>

          <p><b>Status:</b> {claim.status}</p>

          {claim.fileName && (
            <p><b>Document:</b> {claim.fileName}</p>
          )}

        </div>

      </div>
    </div>
  );
}

export default ClaimDetails;