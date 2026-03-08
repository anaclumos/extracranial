import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#0a0a0a",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "40px 30px",
        }}
      >
        <div style={{ width: "30px", height: "100px", background: "#fff" }} />
        <div
          style={{
            width: "30px",
            height: "100px",
            background: "rgba(255,255,255,0.5)",
          }}
        />
        <div
          style={{
            width: "30px",
            height: "100px",
            background: "rgba(255,255,255,0.2)",
          }}
        />
      </div>
    </div>,
    size
  )
}
