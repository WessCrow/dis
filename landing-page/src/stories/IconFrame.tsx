import type { ReactNode } from "react";

export const IconFrame = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      width: 480,
      height: 360,
      background: "#000",
      border: "1px solid rgba(255,255,255,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);
