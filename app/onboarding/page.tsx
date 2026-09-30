"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLearning } from "@/components/LearningProvider";
import type { Learner } from "@/lib/progress";
import { createStudySession, saveStudySession } from "@/lib/study-session";

const options = ["Science", "Mathematics", "English", "Social Science"];
export default function Onboarding() {
  const router = useRouter(); const { saveLearner, learner, attempts, ready } = useLearning();
  const [name, setName] = useState(""); const [grade, setGrade] = useState("6"); const [board, setBoard] = useState("CBSE"); const [language, setLanguage] = useState("English"); const [subjects, setSubjects] = useState(["Science"]); const [error, setError] = useState("");
  useEffect(() => { if (ready && learner) { setName(learner.name); setGrade(learner.grade); setBoard(learner.board); setLanguage(learner.language); setSubjects(learner.subjects); } }, [ready, learner]);
  const toggle = (s: string) => setSubjects(current => current.includes(s) ? current.filter(x => x !== s) : [...current, s]);
  function submit(e: FormEvent) { e.preventDefault(); if (!name.trim() || !subjects.length) { setError("Add your name and choose at least one subject to begin."); return; } const nextLearner = { name: name.trim(), grade, board, subjects, language } satisfies Learner; saveLearner(nextLearner); const continueToStudy = sessionStorage.getItem("learning-street-pending-study") === "true"; sessionStorage.removeItem("learning-street-pending-study"); if (continueToStudy) { saveStudySession(createStudySession(nextLearner, attempts, undefined, undefined, "/")); router.push("/saa-boo-three"); } else router.push("/hub"); }
  return <main className="onboarding-page"><Link href="/" className="brand"><span className="brand-mark">LS</span> Learning Street</Link><section className="onboarding-card"><div className="step-label">YOUR STREET STARTS HERE <span>01 / 01</span></div><h1>Let’s meet, neighbour.</h1><p>Tell us what you’re learning so we can make your street yours.</p><form onSubmit={submit}>
    <label className="field-label">What should we call you?<input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="Your name" maxLength={48} /></label>
    <div className="field-row"><label className="field-label">Class / grade<select value={grade} onChange={e => setGrade(e.target.value)}>{Array.from({length: 12}, (_, i) => String(i + 1)).map(g => <option key={g} value={g}>Class {g}</option>)}</select></label><label className="field-label">Board / syllabus<select value={board} onChange={e => setBoard(e.target.value)}>{["CBSE", "ICSE", "State Board", "Other / not sure"].map(b => <option key={b}>{b}</option>)}</select></label></div>
    <fieldset className="subject-picker"><legend>What subjects are on your street?</legend><div>{options.map(s => <button type="button" key={s} className={subjects.includes(s) ? "subject-choice chosen" : "subject-choice"} onClick={() => toggle(s)} aria-pressed={subjects.includes(s)}><span>{subjects.includes(s) ? "✓" : "+"}</span>{s}</button>)}</div></fieldset>
    <label className="field-label">Preferred language<select value={language} onChange={e => setLanguage(e.target.value)}>{["English", "Hindi", "Tamil", "Bengali", "Telugu", "Marathi", "Other"].map(l => <option key={l}>{l}</option>)}</select></label>
    {error && <p className="form-error" role="alert">{error}</p>}<button className="black-button form-submit" type="submit">Build my street <span aria-hidden="true">→</span></button>
    <small>Your choices stay in this browser. You can update them anytime.</small>
  </form></section></main>;
}
