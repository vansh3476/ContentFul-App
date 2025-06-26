import Link from "next/link"

export default function NotFound() {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Page Not Found</h2>
      <p style={{ margin: "1rem 0", color: "#666" }}>Could not find the requested page.</p>
      <Link
        href="/"
        style={{
          background: "#2c5aa0",
          color: "white",
          textDecoration: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "6px",
          fontSize: "1rem",
        }}
      >
        Return Home
      </Link>
    </div>
  )
}
