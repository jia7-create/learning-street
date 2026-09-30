"use client";
import Link from "next/link";
import { useLearning } from "./LearningProvider";

export default function SiteHeader({ active }: { active?: string }) {
  const { learner } = useLearning();
  return <header className="topbar">
    <Link className="brand" href="/hub" aria-label="Learning Street home"><span className="brand-mark">LS</span><span>Learning Street</span></Link>
    <label className="site-search"><span aria-hidden="true">⌕</span><input aria-label="Search subjects or topics" placeholder="Search subject or topics…" onKeyDown={e => { if (e.key === "Enter") window.location.href = `/subjects?search=${encodeURIComponent((e.target as HTMLInputElement).value)}`; }} /></label>
    <nav className="topnav" aria-label="Main navigation">
      <Link className={active === "progress" ? "nav-pill active" : "nav-pill"} href="/progress"><span aria-hidden="true">♧</span> Progress</Link>
      <Link className={active === "subjects" ? "nav-pill active" : "nav-pill"} href="/subjects">Subjects</Link>
    </nav>
    <Link href="/onboarding" className="profile"><span className="profile-icon" aria-hidden="true">{learner?.name?.slice(0, 1) || "☺"}</span><span>{learner?.name || "Your profile"}</span><span aria-hidden="true">⌄</span></Link>
  </header>;
}
