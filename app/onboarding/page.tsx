"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLearning } from "@/components/LearningProvider";
import type { Learner } from "@/lib/progress";
import { createStudySession, saveStudySession } from "@/lib/study-session";

const availableSubjects = [
  { name: "Science", icon: "🌿", house: "The Biology House" },
  { name: "Mathematics", icon: "📐", house: "The Maths House" },
  { name: "English", icon: "📖", house: "The English House" },
  { name: "Social Science", icon: "🏛️", house: "The History House" },
];

export default function Onboarding() {
  const router = useRouter();
  const { saveLearner, learner, attempts, ready } = useLearning();

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("6");
  const [board, setBoard] = useState("CBSE");
  const [language, setLanguage] = useState("English");
  const [subjects, setSubjects] = useState<string[]>([
    "Science",
    "Mathematics",
    "English",
  ]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && learner) {
      setName(learner.name);
      setGrade(learner.grade);
      setBoard(learner.board);
      setLanguage(learner.language);
      setSubjects(learner.subjects);
    }
  }, [ready, learner]);

  const toggle = (s: string) => {
    setSubjects((current) =>
      current.includes(s) ? current.filter((x) => x !== s) : [...current, s]
    );
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please tell us your name so we can personalize your street.");
      return;
    }
    if (!subjects.length) {
      setError("Choose at least one subject house to build on your street.");
      return;
    }

    const nextLearner: Learner = {
      name: name.trim(),
      grade,
      board,
      subjects,
      language,
    };

    saveLearner(nextLearner);

    const continueToStudy =
      sessionStorage.getItem("learning-street-pending-study") === "true";
    sessionStorage.removeItem("learning-street-pending-study");

    if (continueToStudy) {
      saveStudySession(
        createStudySession(nextLearner, attempts, undefined, undefined, "/hub")
      );
      router.push("/saa-boo-three");
    } else {
      router.push("/hub");
    }
  }

  return (
    <main
      className="onboarding-page"
      style={{
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px clamp(24px, 5vw, 64px)",
      }}
    >
      <Link href="/" className="brand">
        <span className="brand-mark">LS</span> Learning Street
      </Link>

      <section
        className="onboarding-card"
        style={{
          margin: "auto",
          padding: "24px 32px",
          maxWidth: 620,
          width: "100%",
        }}
      >
        <div className="step-label">
          PERSONALIZED VILLAGE SETUP <span>STEP 01 / 01</span>
        </div>

        <h1 style={{ margin: "10px 0 6px", fontSize: "clamp(26px, 3.2vw, 36px)" }}>
          Let’s meet, neighbour.
        </h1>
        <p style={{ margin: "0 0 16px", fontSize: 13 }}>
          Tell us your name and select your class so we can tailor the houses, games, and questions on your street.
        </p>

        <form onSubmit={submit}>
          <label className="field-label">
            What is your name?
            <input
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Jia, Maya, Arjun..."
              maxLength={48}
            />
          </label>

          <div className="field-row">
            <label className="field-label">
              Your Class / Grade
              <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value="5">Class 5 (Junior Foundations)</option>
                <option value="6">Class 6 (Middle School Concepts)</option>
                <option value="10">Class 10 (Board Exam Level)</option>
                <option value="12">Class 12 (Senior Secondary Level)</option>
              </select>
            </label>

            <label className="field-label">
              Board / Syllabus
              <select value={board} onChange={(e) => setBoard(e.target.value)}>
                <option value="CBSE">CBSE (NCERT Aligned)</option>
                <option value="ICSE">ICSE / ISC (CISCE Aligned)</option>
              </select>
            </label>
          </div>

          <fieldset className="subject-picker">
            <legend>Which subject houses do you want on your street?</legend>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              {availableSubjects.map((s) => {
                const isChosen = subjects.includes(s.name);
                return (
                  <button
                    type="button"
                    key={s.name}
                    className={`subject-choice ${isChosen ? "chosen" : ""}`}
                    onClick={() => toggle(s.name)}
                    aria-pressed={isChosen}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      border: isChosen ? "2px solid #111" : "1px solid #d5d7de",
                      backgroundColor: isChosen ? "#e5ecfa" : "#fff",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "6px",
                        display: "grid",
                        placeItems: "center",
                        fontSize: "12px",
                        fontWeight: 800,
                        backgroundColor: isChosen ? "#111" : "#edf0f7",
                        color: isChosen ? "#fff" : "#777",
                      }}
                    >
                      {isChosen ? "✓" : "+"}
                    </span>
                    <div>
                      <strong
                        style={{ display: "block", fontSize: "13px", color: "#111" }}
                      >
                        {s.icon} {s.name}
                      </strong>
                      <small style={{ fontSize: "10px", color: "#666" }}>
                        {s.house}
                      </small>
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="field-label">
            Language for explanations
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hinglish">Hinglish (Hindi + English)</option>
              <option value="Hindi">Hindi</option>
            </select>
          </label>

          {error && (
            <p
              className="form-error"
              role="alert"
              style={{ color: "#c92a2a", fontWeight: 600 }}
            >
              {error}
            </p>
          )}

          <button className="black-button form-submit" type="submit">
            Enter Learning Street <span aria-hidden="true">→</span>
          </button>
        </form>
      </section>
    </main>
  );
}
