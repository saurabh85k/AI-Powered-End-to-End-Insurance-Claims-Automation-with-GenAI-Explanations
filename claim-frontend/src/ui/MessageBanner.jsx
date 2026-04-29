export default function MessageBanner({ type = "error", message }) {
  if (!message) return null;

  const isError = type === "error";
  
  return (
    <div className="animate-fade-in" style={{
      padding: "12px 16px",
      marginBottom: "20px",
      borderRadius: "8px",
      backgroundColor: isError ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
      borderLeft: `4px solid ${isError ? "#ef4444" : "#22c55e"}`,
      color: isError ? "#fca5a5" : "#bbf7d0",
      fontSize: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}>
      <span>{isError ? "⚠️" : "✅"}</span>
      <span>{message}</span>
    </div>
  );
}
