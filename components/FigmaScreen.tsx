import type { ReactNode } from "react";
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
  "mental-ability": { width: 4680, height: 3328 }
} as const;

export type FigmaScreenName = keyof typeof screens;

export default function FigmaScreen({ name, hotspots = [], children }: { name: FigmaScreenName; hotspots?: FigmaHotspot[]; children?: ReactNode }) {
  const screen = screens[name];
  return <main className="figma-page">
    <div className="figma-frame" style={{ aspectRatio: `${screen.width} / ${screen.height}` }}>
      <img src={`/figma/${name}.svg`} width={screen.width} height={screen.height} alt="" className="figma-artboard" />
      {name !== "welcome-screen" && name !== "landing-page" && name !== "landing-page-v2" && <FigmaCTA label="Back" action="back" x={2.2} y={4.2} width={4.3} height={5.5}>{name === "game-chosen" && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}</FigmaCTA>}
      {hotspots.map((spot) => <FigmaCTA key={spot.label} label={spot.label} href={spot.href} onClick={spot.onClick} pressed={spot.pressed} x={spot.x} y={spot.y} width={spot.width} height={spot.height} />)}
      {children}
    </div>
  </main>;
}
