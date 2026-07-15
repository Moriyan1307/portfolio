import { ImageResponse } from "next/og";

export const alt = "Aaryan Mori, Founding Software + Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#17181a",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#85847e",
            fontSize: 24,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          Founding Software+Product Engineer
        </div>
        <div
          style={{
            display: "flex",
            color: "#e9e8e4",
            fontSize: 84,
            fontWeight: 600,
            marginTop: 30,
            letterSpacing: "-0.02em",
          }}
        >
          Software that feels inevitable
          <span style={{ color: "#86b58a" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            color: "#b9b8b2",
            fontSize: 30,
            marginTop: 40,
          }}
        >
          Aaryan Mori · New York City
        </div>
      </div>
    ),
    size
  );
}
