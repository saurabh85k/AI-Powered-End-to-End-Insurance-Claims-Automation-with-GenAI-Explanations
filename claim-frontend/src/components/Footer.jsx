export default function Footer() {
  return (
    <footer style={{
      marginTop: "auto",
      padding: "30px 20px",
      textAlign: "center",
      background: "rgba(255, 255, 255, 0.02)",
      borderTop: "1px solid var(--border-glass)",
      color: "var(--text-muted)",
      fontSize: "0.9rem"
    }}>
      <div style={{ marginBottom: "10px" }}>
        © 2026 Insurance AI Automation. All rights reserved.
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <a href="#" style={{ color: "var(--text-muted)" }}>Privacy Policy</a>
        <a href="#" style={{ color: "var(--text-muted)" }}>Terms of Service</a>
        <a href="#" style={{ color: "var(--text-muted)" }}>Contact Support</a>
      </div>
    </footer>
  );
}
