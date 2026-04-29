import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Spinner from "../ui/Spinner";
import MessageBanner from "../ui/MessageBanner";

function Form() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const submitClaim = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    if (file) {
      // Use OCR endpoint if file is uploaded
      const formData = new FormData();
      formData.append("file", file);

      fetch("http://localhost:8080/api/claims/upload", {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(() => {
          setIsLoading(false);
          navigate("/dashboard");
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
          setErrorMsg("Failed to upload document and process claim. Please try again.");
        });
    } else {
      // Manual submission
      const claimData = {
        policyNumber,
        title,
        type,
        date,
        description: desc,
        location,
        status: "Processing"
      };

      fetch("http://localhost:8080/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(claimData)
      })
        .then(res => res.json())
        .then(() => {
          setIsLoading(false);
          navigate("/dashboard");
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
          setErrorMsg("Failed to save claim manually. Please try again.");
        });
    }
  };

  return (
    <div>
      <Navbar />

      <div className="page-container animate-fade-in" style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={submitClaim} className="card" style={{ width: "100%", maxWidth: "500px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Submit Claim</h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
              Upload a document for <b>Auto AI Extraction</b>, or fill manually.
            </p>
          </div>

          <MessageBanner type="error" message={errorMsg} />

          <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "12px", marginBottom: "20px", border: "1px dashed var(--accent-primary)" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "var(--accent-hover)", marginBottom: "8px", fontWeight: "600" }}>SMART UPLOAD (RECOMMENDED)</label>
            <input type="file" style={{ margin: 0, border: "none", background: "transparent", padding: "5px" }} onChange={(e) => setFile(e.target.files[0])} />
          </div>

          <div style={{ display: "flex", alignItems: "center", margin: "20px 0", color: "var(--text-muted)" }}>
            <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--border-glass)" }} />
            <span style={{ padding: "0 10px", fontSize: "0.85rem" }}>OR MANUAL ENTRY</span>
            <hr style={{ flex: 1, border: "none", borderTop: "1px solid var(--border-glass)" }} />
          </div>

          <input placeholder="Policy Number" onChange={(e) => setPolicyNumber(e.target.value)} />
          <input placeholder="Claim Title" onChange={(e) => setTitle(e.target.value)} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <select onChange={(e) => setType(e.target.value)}>
              <option>Select Type</option>
              <option>Car</option>
              <option>Health</option>
              <option>Property</option>
            </select>
            <input type="date" onChange={(e) => setDate(e.target.value)} style={{ margin: "10px 0 20px 0" }} />
          </div>

          <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
          
          <textarea placeholder="Description of the incident..." onChange={(e) => setDesc(e.target.value)} />

          <button style={{ width: "100%", marginTop: "10px", height: "50px" }} disabled={isLoading}>
            {isLoading ? <><Spinner /> Analyzing Document...</> : "Submit Claim"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Form;