"use client";

import { usePathname, useRouter } from "next/navigation";

function fallbackFor(pathname: string) {
  if (pathname === "/onboarding" || pathname === "/hub" || pathname === "/saa-boo-three") return "/";
  if (pathname === "/subjects") return "/hub";
  if (pathname.startsWith("/subjects/")) return "/subjects";
  if (pathname.startsWith("/games/")) {
    const params = new URLSearchParams(window.location.search);
    const game = pathname.split("/").pop() || "catch-catch";
    return `/games/intro?game=${game}&subject=${params.get("subject") || "science"}&concept=${params.get("concept") || "roots"}`;
  }
  if (pathname === "/games" || pathname === "/progress" || pathname === "/ai-aunty") return "/hub";
  if (pathname === "/landing") return "/";
  return "/";
}

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;
  if (["/hub", "/subjects", "/progress", "/games", "/saa-boo-three", "/games/intro"].includes(pathname) || pathname.startsWith("/subjects/")) return null;

  function goBack() {
    const cameFromThisSite = document.referrer && new URL(document.referrer).origin === window.location.origin;
    if (cameFromThisSite && window.history.length > 1) router.back();
    else router.push(fallbackFor(pathname));
  }

  const placement = pathname === "/onboarding" ? "back-onboarding" : pathname.startsWith("/games/") ? "back-game" : pathname === "/landing" || pathname === "/ai-aunty" ? "back-below-header" : "";
  return <button className={`site-back-button ${placement}`} type="button" onClick={goBack} aria-label="Go back">
    <span aria-hidden="true">←</span> Back
  </button>;
}
