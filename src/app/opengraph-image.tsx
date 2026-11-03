import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolio";

export const alt = "Jose Raphael Jaro / Twilight: Full-stack developer. Seeking internships; junior roles welcome.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 72, background: "#11111b", color: "#cdd6f4", fontFamily: "sans-serif", border: "2px solid #45475a" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#cba6f7", fontSize: 24 }}>
        <span>twilight@cachyos</span><span>twilightdust.me</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3 }}>{portfolioData.personal.name}</div>
        <div style={{ fontSize: 32 }}>Full-stack developer / Lucena City, Philippines</div>
      </div>
      <div style={{ color: "#cba6f7", fontSize: 28 }}>{portfolioData.personal.availability}</div>
    </div>,
    size,
  );
}
