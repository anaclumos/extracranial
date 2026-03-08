export const containerStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
  backgroundColor: "#0a0a0a",
  color: "white",
  position: "relative" as const,
}

export const ambientGradients = {
  top: {
    position: "absolute" as const,
    top: "-300px",
    right: "-100px",
    width: "1200px",
    height: "1200px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
    filter: "blur(80px)",
  },
  bottom: {
    position: "absolute" as const,
    bottom: "-300px",
    left: "-100px",
    width: "1200px",
    height: "1200px",
    background:
      "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
    filter: "blur(80px)",
  },
}

export const borderStyles = {
  position: "absolute" as const,
  top: "40px",
  left: "40px",
  right: "40px",
  bottom: "40px",
  border: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  padding: "80px",
}

export const headerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}

export const logoStyles = {
  container: { display: "flex", alignItems: "center", gap: "16px" },
  monolith: { display: "flex", gap: "6px" },
  bar1: { width: "8px", height: "32px", background: "#fff" },
  bar2: { width: "8px", height: "32px", background: "rgba(255,255,255,0.5)" },
  bar3: { width: "8px", height: "32px", background: "rgba(255,255,255,0.2)" },
  text: {
    fontSize: "32px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.8)",
  },
}

export const domainStyles = {
  fontSize: "32px",
  color: "rgba(255,255,255,0.4)",
}

export const contentStyles = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "40px",
  maxWidth: "90%",
}

export const titleStyles = {
  fontSize: "160px",
  lineHeight: "1.5",
  margin: 0,
  fontWeight: 400,
  background: "linear-gradient(to bottom right, #ffffff 50%, #9ca3af 100%)",
  backgroundClip: "text",
  color: "transparent",
  letterSpacing: "-0.02em",
}

export const descriptionStyles = {
  fontSize: "64px",
  lineHeight: "1.5",
  color: "#a1a1aa",
  margin: 0,
  maxWidth: "1800px",
}
