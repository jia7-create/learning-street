"use client";

import React from "react";

/**
 * Renders clean cropped illustrations extracted from the Figma files
 * without importing the giant 4680x5880 wireframe canvases or baked-in wireframe text.
 */

export type HouseVariant = "biology" | "maths" | "english" | "history";

const HOUSE_CROP_CONFIG: Record<
  HouseVariant,
  {
    /** viewBox into the 1200x1697 all-subjects-img-0.png illustration */
    viewBox: string;
    tint?: string;
  }
> = {
  // Top blue/red roof house ("CHIM COIN")
  biology: {
    viewBox: "215 110 640 535",
  },
  // Middle orange roof house ("IKSHA STORE")
  maths: {
    viewBox: "75 435 615 545",
  },
  // Bottom blue/yellow house ("ALAMAN")
  english: {
    viewBox: "560 675 520 475",
  },
  // Top house with a warm heritage filter for History
  history: {
    viewBox: "215 110 640 535",
    tint: "sepia(0.28) saturate(1.25) hue-rotate(-12deg)",
  },
};

export function FigmaHouseArt({
  subjectId,
  className = "",
  style,
}: {
  subjectId: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const variant: HouseVariant =
    subjectId === "maths" || subjectId === "mathematics"
      ? "maths"
      : subjectId === "english"
        ? "english"
        : subjectId === "history" || subjectId === "social-science"
          ? "history"
          : "biology";

  // Clean single-house viewBox (the standalone house in the Figma illustration)
  // so only ONE house appears per card, with ONE minimal subject icon on its roof.
  const singleHouseViewBox = "560 675 510 470";
  const houseTint =
    variant === "biology"
      ? "hue-rotate(25deg) saturate(1.08)"
      : variant === "maths"
        ? "hue-rotate(-14deg) saturate(1.12)"
        : variant === "history"
          ? "sepia(0.28) saturate(1.2) hue-rotate(-10deg)"
          : undefined;

  return (
    <svg
      viewBox={singleHouseViewBox}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        overflow: "hidden",
        ...style,
      }}
      aria-label={`${subjectId} house illustration`}
    >
      <defs>
        <clipPath id={`house-clip-${variant}`}>
          <rect x="560" y="675" width="510" height="470" rx="24" />
        </clipPath>
        <filter id={`drop-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0d0e11" floodOpacity="0.14" />
        </filter>
      </defs>

      <g clipPath={`url(#house-clip-${variant})`}>
        {/* Single Figma Isometric House */}
        <image
          href="/figma/assets/all-subjects-img-0.png"
          width="1200"
          height="1697"
          style={{ filter: houseTint }}
        />

        {/* ONE Clean Minimal Subject SVG Icon Integrated on the House Roof */}
        {variant === "biology" && (
          <g transform="translate(725, 690)" filter={`url(#drop-${variant})`}>
            <circle cx="38" cy="38" r="34" fill="#ecfdf5" stroke="#15803d" strokeWidth="3.5" />
            <path
              d="M38 58 V30 M38 34 C38 20 50 14 60 14 C60 26 50 34 38 34 Z M38 42 C38 28 26 22 16 22 C16 34 26 42 38 42 Z"
              fill="#4ade80"
              stroke="#14532d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {variant === "maths" && (
          <g transform="translate(710, 692)" filter={`url(#drop-${variant})`}>
            <rect
              x="0"
              y="0"
              width="116"
              height="52"
              rx="16"
              fill="#fff7ed"
              stroke="#c2410c"
              strokeWidth="3.5"
            />
            {/* Plus (+) */}
            <path
              d="M28 16 V36 M18 26 H38"
              stroke="#ea580c"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Minus (−) */}
            <path
              d="M52 26 H68"
              stroke="#2563eb"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Multiply (×) */}
            <path
              d="M84 18 L100 34 M100 18 L84 34"
              stroke="#16a34a"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        )}

        {variant === "english" && (
          <g transform="translate(712, 692)" filter={`url(#drop-${variant})`}>
            <rect
              x="0"
              y="0"
              width="112"
              height="52"
              rx="16"
              fill="#fdf2f8"
              stroke="#9d174d"
              strokeWidth="3.5"
            />
            <text
              x="16"
              y="40"
              fontFamily="Georgia, serif"
              fontSize="40"
              fontWeight="900"
              fill="#be185d"
            >
              “ ”
            </text>
            <text
              x="68"
              y="38"
              fontFamily="'DM Sans', sans-serif"
              fontSize="30"
              fontWeight="800"
              fill="#1d4ed8"
            >
              ?!
            </text>
          </g>
        )}

        {variant === "history" && (
          <g transform="translate(725, 690)" filter={`url(#drop-${variant})`}>
            <circle cx="38" cy="38" r="34" fill="#fffbeb" stroke="#92400e" strokeWidth="3.5" />
            <polygon
              points="38,12 44,32 64,38 44,44 38,64 32,44 12,38 32,32"
              fill="#f59e0b"
              stroke="#78350f"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="38" cy="38" r="5" fill="#fffbeb" stroke="#78350f" strokeWidth="2.5" />
          </g>
        )}
      </g>
    </svg>
  );
}

/**
 * Compact thematic motif badge to display above or alongside each Subject House card
 * (Addition/math symbols for Maths, Plant sprout for Biology, Punctuation for English, Compass/Scroll for History)
 */
export function FigmaSubjectMotifBadge({
  subjectId,
}: {
  subjectId: string;
}) {
  const variant: HouseVariant =
    subjectId === "maths" || subjectId === "mathematics"
      ? "maths"
      : subjectId === "english"
        ? "english"
        : subjectId === "history" || subjectId === "social-science"
          ? "history"
          : "biology";

  if (variant === "maths") {
    return (
      <span
        title="Maths House: Addition, Operations & Geometry"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 11px",
          borderRadius: 10,
          backgroundColor: "#fff7ed",
          border: "1.5px solid #fdba74",
          color: "#9a3412",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "0.06em",
          boxShadow: "0 2px 8px rgba(154, 52, 18, 0.08)",
        }}
      >
        <span style={{ color: "#ea580c", fontSize: 15 }}>+</span>
        <span style={{ color: "#2563eb", fontSize: 15 }}>−</span>
        <span style={{ color: "#16a34a", fontSize: 14 }}>×</span>
        <span style={{ color: "#9333ea", fontSize: 15 }}>÷</span>
      </span>
    );
  }

  if (variant === "english") {
    return (
      <span
        title="English House: Punctuation, Grammar & Stories"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: "5px 11px",
          borderRadius: 10,
          backgroundColor: "#fdf2f8",
          border: "1.5px solid #f9a8d4",
          color: "#9d174d",
          fontSize: 13,
          fontWeight: 800,
          boxShadow: "0 2px 8px rgba(157, 23, 77, 0.08)",
        }}
      >
        <span style={{ fontFamily: "Georgia, serif", fontSize: 15 }}>“ ”</span>
        <span style={{ color: "#0d0e11" }}>!</span>
        <span style={{ color: "#1d4ed8" }}>?</span>
        <span style={{ color: "#be185d" }}>;</span>
      </span>
    );
  }

  if (variant === "history") {
    return (
      <span
        title="History House: Heritage, Scrolls & Directions"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: "5px 11px",
          borderRadius: 10,
          backgroundColor: "#fffbeb",
          border: "1.5px solid #fcd34d",
          color: "#92400e",
          fontSize: 12,
          fontWeight: 800,
          boxShadow: "0 2px 8px rgba(146, 64, 14, 0.08)",
        }}
      >
        <span>📜</span>
        <span>🧭</span>
        <span>🏛️</span>
      </span>
    );
  }

  // Biology (Plant / Sprout / Leaf SVG motif)
  return (
    <span
      title="Biology House: Living Plants, Leaves & Cells"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 11px",
        borderRadius: 10,
        backgroundColor: "#ecfdf5",
        border: "1.5px solid #86efac",
        color: "#14532d",
        fontSize: 12,
        fontWeight: 800,
        boxShadow: "0 2px 8px rgba(20, 83, 45, 0.08)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21V11M12 11C12 7 15.5 4 20 4C20 8.5 17 11 12 11ZM12 14C12 10 8.5 7 4 7C4 11.5 7 14 12 14Z"
          stroke="#15803d"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#4ade80"
        />
      </svg>
      <span>🌱 🌿</span>
    </span>
  );
}

/**
 * Full isometric Learning Street scene (3 houses + kites + Snake & Ladder + Checkers + Hopscotch + School Bus)
 */
export function FigmaStreetScene({
  className = "",
  style,
  viewBox = "55 55 1090 1560",
}: {
  className?: string;
  style?: React.CSSProperties;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-label="Learning Street isometric village"
    >
      <image
        href="/figma/assets/ai-screen-img-0.png"
        width="1200"
        height="1697"
      />
    </svg>
  );
}

/**
 * Cropped Snake & Ladder + Kids jumping rope illustration from the Figma street
 */
export function FigmaSnakeLadderArt({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="585 435 505 320"
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-label="Snake and Ladder street board"
    >
      <image
        href="/figma/assets/ai-screen-img-0.png"
        width="1200"
        height="1697"
      />
    </svg>
  );
}

/**
 * Cropped AI Aunty / Street Cafe tables illustration from the Figma street
 */
export function FigmaAiAuntyArt({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="700 940 420 290"
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-label="AI Aunty neighborhood table"
    >
      <image
        href="/figma/assets/ai-screen-img-0.png"
        width="1200"
        height="1697"
      />
    </svg>
  );
}

/**
 * Cropped Hopscotch & Checkers street play area
 */
export function FigmaHopscotchArt({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="75 980 660 365"
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-label="Hopscotch and street games"
    >
      <image
        href="/figma/assets/ai-screen-img-0.png"
        width="1200"
        height="1697"
      />
    </svg>
  );
}

/**
 * Cropped School Bus & Ice Cream Cart from the Figma street
 */
export function FigmaSchoolBusArt({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="165 1235 910 395"
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-label="School bus and street vendor"
    >
      <image
        href="/figma/assets/ai-screen-img-0.png"
        width="1200"
        height="1697"
      />
    </svg>
  );
}

/**
 * Dedicated Figma visual illustration for each of the 5 Learning Street games
 */
export function FigmaGameArt({
  gameSlug,
  className = "",
  style,
}: {
  gameSlug: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (gameSlug === "catch-catch") {
    return (
      <svg
        viewBox="15 15 360 275"
        className={className}
        style={{ width: "100%", height: "100%", display: "block", ...style }}
        aria-label="Catch Catch isometric runners illustration"
      >
        <image
          href="/figma/assets/desktop-19-img-0.png"
          width="626"
          height="469"
        />
      </svg>
    );
  }

  if (gameSlug === "cops-robbers") {
    return (
      <svg
        viewBox="30 25 920 455"
        className={className}
        style={{ width: "100%", height: "100%", display: "block", ...style }}
        aria-label="Cops and Robbers street chase illustration"
      >
        <image
          href="/figma/assets/simon-says-2-img-2.png"
          width="980"
          height="980"
        />
      </svg>
    );
  }

  if (gameSlug === "simon-says") {
    return (
      <svg
        viewBox="45 330 675 315"
        className={className}
        style={{ width: "100%", height: "100%", display: "block", ...style }}
        aria-label="Simon Says street action illustration"
      >
        <image
          href="/figma/assets/simon-says-2-img-1.png"
          width="762"
          height="980"
        />
      </svg>
    );
  }

  if (gameSlug === "king") {
    return (
      <svg
        viewBox="260 285 355 175"
        className={className}
        style={{ width: "100%", height: "100%", display: "block", ...style }}
        aria-label="King street pedestal and champion illustration"
      >
        <image
          href="/figma/assets/desktop-19-img-0.png"
          width="626"
          height="469"
        />
      </svg>
    );
  }

  // hide-seek (default)
  return (
    <svg
      viewBox="140 990 880 510"
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-label="Hide and Seek street hiding spots illustration"
    >
      <image
        href="/figma/assets/ai-screen-img-0.png"
        width="1200"
        height="1697"
      />
    </svg>
  );
}

/**
 * Individual isometric runner sprite cropped from /figma/assets/desktop-19-img-0.png
 */
const RUNNER_VIEWBOXES = [
  "205 15 95 130", // Runner A: sprinting right (orange vest)
  "265 150 95 135", // Runner B: sprinting right (blue hair)
  "85 150 95 135", // Runner C: sprinting left/right stride
  "365 315 85 140", // Runner D: marathon runner
];

export function FigmaRunnerSprite({
  index = 0,
  style,
}: {
  index?: number;
  style?: React.CSSProperties;
}) {
  const vb = RUNNER_VIEWBOXES[index % RUNNER_VIEWBOXES.length];
  return (
    <svg
      viewBox={vb}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-hidden="true"
    >
      <image
        href="/figma/assets/desktop-19-img-0.png"
        width="626"
        height="469"
      />
    </svg>
  );
}

/**
 * Individual isometric scooter/bike/skateboard suspect sprite cropped from /figma/assets/simon-says-2-img-2.png
 */
const SUSPECT_VIEWBOXES = [
  "525 35 200 220", // Red scooter rider
  "555 265 165 215", // Skateboarder
  "535 500 195 220", // Yellow bicycle rider
  "790 35 160 220", // Kick scooter rider
];

export function FigmaSuspectSprite({
  index = 0,
  style,
}: {
  index?: number;
  style?: React.CSSProperties;
}) {
  const vb = SUSPECT_VIEWBOXES[index % SUSPECT_VIEWBOXES.length];
  return (
    <svg
      viewBox={vb}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-hidden="true"
    >
      <image
        href="/figma/assets/simon-says-2-img-2.png"
        width="980"
        height="980"
      />
    </svg>
  );
}
