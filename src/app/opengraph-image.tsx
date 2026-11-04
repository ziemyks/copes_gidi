import { ImageResponse } from "next/og";

export const alt = "Copes Gidi — makšķerēšanas gidi Latvijā";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1c1c1c", color: "#f4f4f4", padding: "64px 72px", border: "12px solid #ec5b2a" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
        <span>www.copesgidi.lv</span>
        <svg width="110" height="70" viewBox="0 0 32 32"><path d="M6 17c4-6 12-7 17-2l3-3v8l-3-3c-5 5-13 4-17-2z" fill="#ec5b2a" /><circle cx="11" cy="15.5" r="1.4" fill="#1c1c1c" /></svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <span style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5 }}>Copes Gidi</span>
        <span style={{ fontSize: 42 }}>Makšķerēšanas gidi Latvijā</span>
      </div>
      <span style={{ fontSize: 25, color: "#c2c2c2" }}>Publicētas cenas. Avoti. Tiešie kontakti.</span>
    </div>,
    size,
  );
}
