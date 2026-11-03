"use client";

import React from "react";
import { FigmaHeader } from "@/components/FigmaHeader";

interface StreetShellProps {
  children: React.ReactNode;
  bg?: string;
  backHref?: string;
  backLabel?: string;
  hideNav?: boolean;
}

export function StreetShell({
  children,
  bg = "#ffffff",
  backHref,
  backLabel,
  hideNav = false,
}: StreetShellProps) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        color: "#111111",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {!hideNav && <FigmaHeader backHref={backHref} backLabel={backLabel} />}

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "100%",
          margin: 0,
          padding: "20px clamp(20px, 3vw, 44px) 28px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
    </div>
  );
}
