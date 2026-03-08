import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
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
          gap: "2px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "6px 5px",
        }}
      >
        <div style={{ width: "6px", height: "20px", background: "#fff" }} />
        <div
          style={{
            width: "6px",
            height: "20px",
            background: "rgba(255,255,255,0.5)",
          }}
        />
        <div
          style={{
            width: "6px",
            height: "20px",
            background: "rgba(255,255,255,0.2)",
          }}
        />
      </div>
    </div>,
    size
  )
}
