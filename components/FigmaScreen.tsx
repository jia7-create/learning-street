import type { ReactNode } from "react";
import Link from "next/link";
import FigmaCTA from "./FigmaCTA";

export type FigmaHotspot = {
  label: string;
  href?: string;
  onClick?: () => void;
  pressed?: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

const screens = {
  "landing-page": { width: 4680, height: 9927 },
  "landing-page-v2": { width: 4680, height: 9927 },
  "welcome-screen": { width: 4680, height: 3328 },
  "learners-hub": { width: 4680, height: 5880 },
  "all-subjects": { width: 4680, height: 5865 },
  "individual-subject-house": { width: 4680, height: 5865 },
  progress: { width: 4680, height: 5865 },
  "game-chosen": { width: 4680, height: 3328 },
  "simon-says-1": { width: 4680, height: 3328 },
  "simon-says-2": { width: 4680, height: 4797 },
  "desktop-10": { width: 4680, height: 4787 },
  "desktop-18": { width: 4680, height: 3328 },
  "desktop-19": { width: 4680, height: 4797 },
  "saa-boo-three": { width: 4680, height: 3328 },
  "mental-ability": { width: 4680, height: 3328 },
  "ai-screen": { width: 4680, height: 3328 }
} as const;

export type FigmaScreenName = keyof typeof screens;

// Standard header hotspots present across all screens:
// Home, Search, Progress, Subjects, Profile
const defaultHeaderHotspots: Record<FigmaScreenName, FigmaHotspot[]> = {
  "learners-hub": [
    { label: "Search subjects or topics", href: "/subjects", x: 4.6, y: 3.5, width: 35.8, height: 3.2 },
    { label: "Open Progress", href: "/progress", x: 48.1, y: 3.5, width: 15.7, height: 3.2 },
    { label: "Browse Subjects", href: "/subjects", x: 64.9, y: 3.4, width: 13.4, height: 3.2 },
    { label: "Profile", href: "/profile", x: 81.7, y: 3.1, width: 15.8, height: 3.3 }
  ],
  "mental-ability": [
    { label: "Search subjects or topics", href: "/subjects", x: 4.8, y: 3.8, width: 35.7, height: 3.0 },
    { label: "Open Progress", href: "/progress", x: 48.3, y: 3.8, width: 15.7, height: 3.0 },
    { label: "Browse Subjects", href: "/subjects", x: 65.1, y: 3.7, width: 13.4, height: 3.1 },
    { label: "Profile", href: "/profile", x: 81.9, y: 3.3, width: 15.8, height: 3.2 }
  ],
  "ai-screen": [
    { label: "Search subjects or topics", href: "/subjects", x: 3.4, y: 6.8, width: 35.7, height: 4.8 },
    { label: "Open Progress", href: "/progress", x: 46.9, y: 6.7, width: 15.7, height: 4.8 },
    { label: "Browse Subjects", href: "/subjects", x: 63.7, y: 6.5, width: 13.4, height: 4.8 },
    { label: "Profile", href: "/profile", x: 86.1, y: 7.1, width: 10.3, height: 3.9 }
  ],
  "all-subjects": [
    { label: "Search subjects or topics", href: "/subjects", x: 4.8, y: 3.8, width: 35.7, height: 3.0 },
    { label: "Open Progress", href: "/progress", x: 48.3, y: 3.8, width: 15.7, height: 3.0 },
    { label: "Browse Subjects", href: "/subjects", x: 65.1, y: 3.7, width: 13.4, height: 3.1 },
    { label: "Profile", href: "/profile", x: 81.9, y: 3.3, width: 15.8, height: 3.2 }
  ],
  "individual-subject-house": [
    { label: "Search subjects or topics", href: "/subjects", x: 4.8, y: 3.8, width: 35.7, height: 3.0 },
    { label: "Open Progress", href: "/progress", x: 48.3, y: 3.8, width: 15.7, height: 3.0 },
    { label: "Browse Subjects", href: "/subjects", x: 65.1, y: 3.7, width: 13.4, height: 3.1 },
    { label: "Profile", href: "/profile", x: 81.9, y: 3.3, width: 15.8, height: 3.2 }
  ],
  progress: [
    { label: "Search subjects or topics", href: "/subjects", x: 4.8, y: 3.8, width: 35.7, height: 3.0 },
    { label: "Open Progress", href: "/progress", x: 48.3, y: 3.8, width: 15.7, height: 3.0 },
    { label: "Browse Subjects", href: "/subjects", x: 65.1, y: 3.7, width: 13.4, height: 3.1 },
    { label: "Profile", href: "/profile", x: 81.9, y: 3.3, width: 15.8, height: 3.2 }
  ],
  "saa-boo-three": [
    { label: "Open Progress", href: "/progress", x: 48.3, y: 3.8, width: 15.7, height: 3.0 },
    { label: "Browse Subjects", href: "/subjects", x: 65.1, y: 3.7, width: 13.4, height: 3.1 },
    { label: "Profile", href: "/profile", x: 81.9, y: 3.3, width: 15.8, height: 3.2 }
  ],
  "game-chosen": [
    { label: "Open Progress", href: "/progress", x: 48.3, y: 3.8, width: 15.7, height: 3.0 },
    { label: "Browse Subjects", href: "/subjects", x: 65.1, y: 3.7, width: 13.4, height: 3.1 },
    { label: "Profile", href: "/profile", x: 81.9, y: 3.3, width: 15.8, height: 3.2 }
  ],
  "landing-page-v2": [
    { label: "Search subjects or topics", href: "/subjects", x: 4.59, y: 2.0, width: 35.73, height: 2.2 },
    { label: "Open Progress", href: "/progress", x: 48.0, y: 1.9, width: 16.0, height: 2.2 },
    { label: "Browse Subjects", href: "/subjects", x: 64.7, y: 1.9, width: 13.7, height: 2.2 }
  ],
  "landing-page": [
    { label: "Search subjects or topics", href: "/subjects", x: 4.59, y: 2.0, width: 35.73, height: 2.2 },
    { label: "Open Progress", href: "/progress", x: 48.0, y: 1.9, width: 16.0, height: 2.2 },
    { label: "Browse Subjects", href: "/subjects", x: 64.7, y: 1.9, width: 13.7, height: 2.2 }
  ],
  "welcome-screen": [],
  "simon-says-1": [],
  "simon-says-2": [],
  "desktop-10": [],
  "desktop-18": [],
  "desktop-19": []
};

// Coordinates of the top search bar pill per screen for clean integration of the house icon
const homeIconPositions: Record<
  FigmaScreenName,
  { searchPill: { x: number; y: number; width: number; height: number } } | null
> = {
  "landing-page": null,
  "landing-page-v2": null,
  "welcome-screen": null,
  "learners-hub": { searchPill: { x: 4.58, y: 3.58, width: 35.84, height: 3.0 } },
  "all-subjects": { searchPill: { x: 4.58, y: 3.65, width: 35.84, height: 3.0 } },
  "individual-subject-house": { searchPill: { x: 4.58, y: 3.65, width: 35.84, height: 3.0 } },
  progress: { searchPill: { x: 4.58, y: 3.65, width: 35.84, height: 3.0 } },
  "game-chosen": null,
  "simon-says-1": null,
  "simon-says-2": null,
  "desktop-10": null,
  "desktop-18": null,
  "desktop-19": null,
  "saa-boo-three": null,
  "mental-ability": { searchPill: { x: 4.58, y: 3.65, width: 35.84, height: 3.0 } },
  "ai-screen": { searchPill: { x: 3.35, y: 6.75, width: 35.84, height: 4.8 } }
};

export default function FigmaScreen({
  name,
  hotspots = [],
  children
}: {
  name: FigmaScreenName;
  hotspots?: FigmaHotspot[];
  children?: ReactNode;
}) {
  const screen = screens[name];
  const homePos = homeIconPositions[name];
  const homeHref = name === "learners-hub" ? "/landing" : "/";
  const homeLabel = name === "learners-hub" ? "Go to landing page" : "Back to Learner’s Hub";

  // Fit screens completely in viewport without scrolling (e.g. mental-ability, ai-screen, etc.)
  const isSinglePageFit =
    screen.height <= 3400 ||
    name === "mental-ability" ||
    name === "ai-screen" ||
    name === "saa-boo-three" ||
    name === "game-chosen";

  const isHubScreen = name === "learners-hub";

  // Merge default header hotspots with custom hotspots, avoiding duplicates
  const headers = defaultHeaderHotspots[name] || [];
  const mergedHotspots = [...hotspots];
  for (const h of headers) {
    if (!mergedHotspots.some((spot) => spot.label === h.label)) {
      mergedHotspots.push(h);
    }
  }

  const pageClass = isSinglePageFit
    ? "figma-page screen-fit"
    : isHubScreen
    ? "figma-page screen-hub"
    : "figma-page";

  return (
    <main className={pageClass}>
      <div
        className="figma-frame"
        style={{
          aspectRatio: `${screen.width} / ${screen.height}`
        }}
      >
        <img
          src={`/figma/${name}.svg`}
          width={screen.width}
          height={screen.height}
          alt=""
          className="figma-artboard"
        />

        {/* Integrated Topbar Search Bar with House Icon */}
        {homePos && (
          <div
            style={{
              position: "absolute",
              left: `${homePos.searchPill.x}%`,
              top: `${homePos.searchPill.y}%`,
              width: `${homePos.searchPill.width}%`,
              height: `${homePos.searchPill.height}%`,
              zIndex: 10,
              backgroundColor: "#fff",
              border: "3px solid #000",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              padding: "0 1.2%",
              boxSizing: "border-box",
              gap: "0.8%",
              overflow: "hidden"
            }}
          >
            {/* Clickable House Icon placed neatly at the far left inside the text box */}
            <Link
              href={homeHref}
              className="figma-home-icon-link"
              style={{
                width: "6.5%",
                minWidth: "22px",
                maxWidth: "34px",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
              aria-label={homeLabel}
              title={homeLabel}
            >
              <img src="/figma/home-icon.svg" alt="Home" className="figma-home-icon-img" />
            </Link>

            {/* Magnifying glass search icon */}
            <svg
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "3.6%",
                minWidth: "14px",
                maxWidth: "20px",
                height: "auto",
                flexShrink: 0
              }}
              aria-hidden="true"
            >
              <path
                d="M55.8471 55.8438L43.1336 43.1084M50.179 26.0883C50.179 32.4768 47.6411 38.6036 43.1235 43.1209C38.6058 47.6383 32.4786 50.1761 26.0898 50.1761C19.7009 50.1761 13.5737 47.6383 9.05608 43.1209C4.53846 38.6036 2.00049 32.4768 2.00049 26.0883C2.00049 19.6998 4.53846 13.573 9.05608 9.05564C13.5737 4.53831 19.7009 2.00049 26.0898 2.00049C32.4786 2.00049 38.6058 4.53831 43.1235 9.05564C47.6411 13.573 50.179 19.6998 50.179 26.0883Z"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            {/* Real functional search text box */}
            <form
              action="/subjects"
              method="GET"
              style={{ flex: 1, display: "flex", alignItems: "center", margin: 0, padding: 0 }}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const query = formData.get("q")?.toString().trim();
                window.location.href = query ? `/subjects?q=${encodeURIComponent(query)}` : "/subjects";
              }}
            >
              <input
                type="text"
                name="q"
                placeholder="Search subject or topics..."
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontFamily: "Inter, 'DM Sans', sans-serif",
                  fontSize: "clamp(10px, 1.15vw, 16px)",
                  fontWeight: 600,
                  color: "#111",
                  padding: 0,
                  margin: 0
                }}
                aria-label="Search subject or topics"
              />
            </form>
          </div>
        )}

        {/* Back button for screens that explicitly have a back arrow in their header (game-chosen) */}
        {name === "game-chosen" && (
          <FigmaCTA label="Back" action="back" x={2.2} y={3.8} width={3.5} height={4.5}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </FigmaCTA>
        )}

        {mergedHotspots.map((spot) => (
          <FigmaCTA
            key={spot.label}
            label={spot.label}
            href={spot.href}
            onClick={spot.onClick}
            pressed={spot.pressed}
            x={spot.x}
            y={spot.y}
            width={spot.width}
            height={spot.height}
          />
        ))}

        {children}
      </div>
    </main>
  );
}
