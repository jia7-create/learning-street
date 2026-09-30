"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { readStudySession } from "@/lib/study-session";

export type FigmaCTAAction = "back" | "custom";

export default function FigmaCTA({ label, x, y, width, height, href, action = "custom", onClick, children, pressed }: {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  href?: string;
  action?: FigmaCTAAction;
  onClick?: () => void;
  children?: ReactNode;
  pressed?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const style = { left: `${x}%`, top: `${y}%`, width: `${width}%`, height: `${height}%` };
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (action === "back") {
      const referrer = document.referrer;
      if (referrer && new URL(referrer).origin === window.location.origin && window.history.length > 1) router.back();
      else if (pathname === "/saa-boo-three") router.push(readStudySession()?.previousPath || "/hub");
      else if (pathname === "/games/intro") router.push("/saa-boo-three");
      else if (pathname.startsWith("/games/")) {
        const params = new URLSearchParams(window.location.search);
        router.push(`/games/intro?game=${pathname.split("/").pop()}&subject=${params.get("subject") || "science"}&concept=${params.get("concept") || "roots"}`);
      }
      else if (pathname.startsWith("/subjects/")) router.push("/hub");
      else if (pathname === "/hub") router.push("/");
      else if (pathname === "/subjects" || pathname === "/progress") router.push("/hub");
      else router.push("/hub");
      return;
    }
    onClick?.();
  }
  const className = "figma-hotspot";
  if (href) return <Link href={href} aria-label={label} className={className} style={style}>{children}</Link>;
  return <button type="button" aria-label={label} aria-pressed={pressed} onClick={handleClick} className={className} style={style}>{children}</button>;
}
