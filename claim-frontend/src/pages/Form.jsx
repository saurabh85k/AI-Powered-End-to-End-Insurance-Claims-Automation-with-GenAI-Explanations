import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Form() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const submitClaim = (e) => {
    e.preventDefault();

    const newClaim = {
      id: Date.now(),
      title,
      type,
      date,
      description: desc,
      location,
      fileName: file ? file.name : null,
      status: "Processing"
    };

    const old = JSON.parse(localStorage.getItem("claims")) || [];
    localStorage.setItem("claims", JSON.stringify([...old, newClaim]));

    navigate("/dashboard");
  };

  return (
    <div>
      <Navbar />

      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px"
      }}>

        <form onSubmit={submitClaim} className="card"
          style={{ width: "420px" }}>

          <h2>🧾 Submit Claim</h2>

          <input placeholder="Title"
            onChange={(e) => setTitle(e.target.value)} />

          <select onChange={(e) => setType(e.target.value)}>
            <option>Select Type</option>
            <option>Car</option>
            <option>Health</option>
            <option>Property</option>
          </select>

          <input type="date"
            onChange={(e) => setDate(e.target.value)} />

          <textarea placeholder="Description"
            onChange={(e) => setDesc(e.target.value)} />

          <input placeholder="Location"
            onChange={(e) => setLocation(e.target.value)} />

          <input type="file"
            onChange={(e) => setFile(e.target.files[0])} />

          <button style={{ width: "100%" }}>
            🚀 Submit
          </button>

        </form>

      </div>
    </div>
  );
}

export default Form;