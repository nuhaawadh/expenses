import { ImageResponse } from "next/og";

export const alt = "HIGHLink — We Build the System. You Scale the Business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(60% 70% at 50% 110%, rgba(95,212,180,0.22), #07090a 70%)",
          color: "#eceeed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 600 }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#5fd4b4" }} />
          HIGH<span style={{ color: "#8d9593", fontWeight: 400 }}>Link</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 0.98, letterSpacing: -4 }}>
          <span>We Build the System.</span>
          <span style={{ color: "#8d9593" }}>You Scale the Business.</span>
        </div>
        <div style={{ fontSize: 20, letterSpacing: 6, color: "#8d9593" }}>AI SYSTEMS · AUTOMATION · AI AGENTS</div>
      </div>
    ),
    size,
  );
}
