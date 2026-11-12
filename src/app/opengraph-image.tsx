import { ImageResponse } from "next/og";
import { SITE } from "@/data/profile";

export const alt = `${SITE.name}, ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Preview image shown when the link is shared on LinkedIn, WhatsApp and so on. */
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
          background: "linear-gradient(135deg, #efe8da 0%, #efe8da 55%, #c3d1bc 100%)",
          color: "#2a1a1c",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#4f6a4c" }}>{SITE.location}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>{SITE.name}</div>
          <div style={{ marginTop: 22, fontSize: 40, color: "#7a1f33" }}>{SITE.role}</div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 28, color: "#6e5e5c" }}>
          <span>Kohler AI Lab</span>
          <span>SIH 2026 Top 100</span>
          <span>MIT-WPU, Pune</span>
        </div>
      </div>
    ),
    size,
  );
}
