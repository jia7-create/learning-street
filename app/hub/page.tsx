"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StreetShell } from "@/components/StreetShell";
import {
  FigmaHouseArt,
  FigmaSubjectMotifBadge,
  FigmaAiAuntyArt,
  FigmaHopscotchArt,
} from "@/components/FigmaArt";
import { useLearning } from "@/components/LearningProvider";
import { getSubjectsForClass } from "@/lib/curriculum";

const HOUSE_PILL_COLORS: Record<string, { bg: string; text: string }> = {
  maths: { bg: "#e5ecf9", text: "#1e293b" },
  biology: { bg: "#e5f9ed", text: "#14532d" },
  english: { bg: "#fae8f0", text: "#50182c" },
  history: { bg: "#fef3c7", text: "#451a03" },
};

export default function Hub() {
  const router = useRouter();
  const { learner, progress, addSubjectHouse, saveLearner, ready } = useLearning();
  const [addHouseOpen, setAddHouseOpen] = useState(false);
  const [customSvgMap, setCustomSvgMap] = useState<Record<string, string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("learning-street-custom-house-svgs");
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  const classLevel = learner?.classLevel || Number(learner?.grade) || 6;
  const board = learner?.board || "CBSE";
  const firstName = learner?.name?.split(" ")[0] || "Jia";

  const allSubjects = useMemo(
    () => getSubjectsForClass(classLevel, board),
    [classLevel, board]
  );

  const enrolledIds = useMemo(() => {
    if (learner?.enrolledSubjects?.length) return learner.enrolledSubjects;
    return ["maths", "biology", "english"];
  }, [learner]);

  const enrolledSubjects = useMemo(
    () => allSubjects.filter((s) => enrolledIds.includes(s.id)),
    [allSubjects, enrolledIds]
  );

  const unbuiltSubjects = useMemo(
    () => allSubjects.filter((s) => !enrolledIds.includes(s.id)),
    [allSubjects, enrolledIds]
  );

  // Determine "What should I do next?" for Group 7 (Progress)
  const nextRecommendation = useMemo(() => {
    for (const s of enrolledSubjects) {
      const allC = s.chapters.flatMap((ch) => ch.concepts);
      const done = allC.filter((c) =>
        progress.masteredConcepts.includes(c.id)
      ).length;
      const pct = allC.length ? Math.round((done / allC.length) * 100) : 0;
      const nextConcept = allC.find(
        (c) => !progress.masteredConcepts.includes(c.id)
      );
      if (nextConcept) {
        return {
          subject: s,
          pct,
          nextConcept,
        };
      }
    }
    const fallback = enrolledSubjects[0] || allSubjects[0];
    return {
      subject: fallback,
      pct: 100,
      nextConcept: fallback.chapters[0].concepts[0],
    };
  }, [enrolledSubjects, allSubjects, progress.masteredConcepts]);

  const handleUploadCustomSvg = (subjectId: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      const next = { ...customSvgMap, [subjectId]: dataUrl };
      setCustomSvgMap(next);
      try {
        localStorage.setItem(
          "learning-street-custom-house-svgs",
          JSON.stringify(next)
        );
      } catch {
        // ignore storage quota errors
      }
    };
    reader.readAsDataURL(file);
  };

  if (!ready) {
    return (
      <StreetShell>
        <div style={{ padding: "40px 0", fontSize: 15, color: "#666" }}>
          Opening your street…
        </div>
      </StreetShell>
    );
  }

  return (
    <StreetShell bg="#ffffff">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.48fr 0.82fr",
          gap: 36,
          alignItems: "start",
        }}
      >
        {/* ============================================================
            LEFT / CENTER: THE LEARNING STREET (GROUP 1, GROUP 2, GROUP 3)
            ============================================================ */}
        <div>
          {/* GROUP 1 — LEARNER / STREET CONTEXT (Compact, Figma style + Class-Level & CBSE/ICSE Syllabus Switchers) */}
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 12px",
                  borderRadius: 6,
                  backgroundColor: "#e5f9ed",
                  color: "#111111",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                ✦ {firstName}&apos;s Learning Street • Class {classLevel} •{" "}
                {board === "ICSE"
                  ? classLevel >= 11
                    ? "ISC (CISCE)"
                    : "ICSE (CISCE)"
                  : "CBSE (NCERT)"}
              </span>

              {/* PAIN POINT 4: Class-Level Adaptation Switcher (Junior Class 5/6 to Senior Class 10/12) */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  padding: 3,
                  borderRadius: 8,
                  backgroundColor: "#f1f4f9",
                  border: "1px solid #e2e6ef",
                }}
              >
                {(["5", "6", "10", "12"] as const).map((g) => {
                  const active = String(classLevel) === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        if (learner) {
                          saveLearner({
                            ...learner,
                            grade: g,
                            classLevel: Number(g),
                          });
                        }
                      }}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: active ? "#0d0e11" : "transparent",
                        color: active ? "#ffffff" : "#555861",
                        fontSize: 10,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Class {g}
                    </button>
                  );
                })}
              </div>

              {/* PAIN POINT 5: Curriculum Board Switcher (CBSE vs ICSE/ISC) */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: 3,
                  borderRadius: 8,
                  backgroundColor: "#f1f4f9",
                  border: "1px solid #e2e6ef",
                }}
              >
                {(["CBSE", "ICSE"] as const).map((b) => {
                  const active = board.toUpperCase() === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        if (learner) {
                          saveLearner({ ...learner, board: b });
                        }
                      }}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: active ? "#0d0e11" : "transparent",
                        color: active ? "#ffffff" : "#555861",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        cursor: "pointer",
                      }}
                    >
                      {b === "ICSE" && classLevel >= 11 ? "ISC / ICSE" : b}
                    </button>
                  );
                })}
              </div>
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#0d0e11",
              }}
            >
              Welcome back to the street {firstName}!
            </h1>
          </div>

          {/* GROUP 2 — SUBJECT HOUSES (Dominant Visual Element on the Street) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {/* Subtle Hopscotch kids decoration in top-left of the street, just like Figma */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 22,
                alignItems: "stretch",
              }}
            >
              {enrolledSubjects.map((subj) => {
                const concepts = subj.chapters.flatMap((c) => c.concepts);
                const done = concepts.filter((c) =>
                  progress.masteredConcepts.includes(c.id)
                ).length;
                const pct =
                  concepts.length > 0
                    ? Math.round((done / concepts.length) * 100)
                    : 0;
                const pillStyle =
                  HOUSE_PILL_COLORS[subj.id] || HOUSE_PILL_COLORS.maths;
                const customSvg = customSvgMap[subj.id];

                return (
                  <div
                    key={subj.id}
                    onClick={() => router.push(`/subjects/${subj.slug}`)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "14px 18px 18px",
                      borderRadius: 22,
                      backgroundColor: "#ffffff",
                      border: "1px solid #eceef2",
                      boxShadow: "0 8px 26px rgba(15, 23, 42, 0.04)",
                      cursor: "pointer",
                      transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    }}
                  >
                    {/* Dominant Isometric House Illustration + Floating Figma House Pill */}
                    <div
                      style={{
                        position: "relative",
                        height: 175,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                      }}
                    >
                      {customSvg ? (
                        <img
                          src={customSvg}
                          alt={subj.houseName}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <FigmaHouseArt subjectId={subj.id} />
                      )}

                      {/* Figma Pastel Label Pill right beside the house roof */}
                      <span
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 6,
                          padding: "6px 14px",
                          borderRadius: 10,
                          backgroundColor: pillStyle.bg,
                          color: pillStyle.text,
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {subj.houseName.replace(/^The\s+/i, "")}
                      </span>
                    </div>

                    {/* Cohesive Information Group: Subject -> House Name -> Available Learning -> Progress -> Enter Action */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: "#6b7079",
                          }}
                        >
                          {subj.name} • {subj.syllabusTag}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#111111",
                          }}
                        >
                          {pct}% Mastered
                        </span>
                      </div>

                      <h2
                        style={{
                          margin: "0 0 4px",
                          fontSize: 20,
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          color: "#0d0e11",
                        }}
                      >
                        {subj.houseName}
                      </h2>

                      <p
                        style={{
                          margin: "0 0 10px",
                          fontSize: 13,
                          color: "#555861",
                        }}
                      >
                        {concepts.length} concepts • {subj.chapters[0]?.title}
                      </p>

                      {/* Subtle Progress Line */}
                      <div
                        style={{
                          height: 6,
                          borderRadius: 999,
                          backgroundColor: "#eef0f4",
                          overflow: "hidden",
                          marginBottom: 8,
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.max(pct, 4)}%`,
                            height: "100%",
                            backgroundColor: "#0d0e11",
                            borderRadius: 999,
                          }}
                        />
                      </div>

                      {/* PAIN POINT 3: Progress Interpretation (Translate numbers into immediate next action) */}
                      {(() => {
                        const nextUnmastered =
                          concepts.find(
                            (c) => !progress.masteredConcepts.includes(c.id)
                          ) || concepts[0];
                        return (
                          <div
                            style={{
                              fontSize: 11,
                              color: "#555861",
                              marginBottom: 10,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <span
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Next: <strong>{nextUnmastered?.title}</strong>
                            </span>
                            <Link
                              href={`/saa-boo-three?subject=${subj.slug}&concept=${nextUnmastered?.id}&from=/hub`}
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#14532d",
                                textDecoration: "none",
                                flexShrink: 0,
                              }}
                            >
                              Revise →
                            </Link>
                          </div>
                        );
                      })()}

                      <Link
                        href={`/subjects/${subj.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "10px 16px",
                          borderRadius: 12,
                          backgroundColor: "#0d0e11",
                          color: "#ffffff",
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: "none",
                          boxSizing: "border-box",
                        }}
                      >
                        <span>Enter House</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}

              {/* GROUP 3 — ADD ANOTHER SUBJECT HOUSE (Belongs right on the street with the houses) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "18px 20px",
                  borderRadius: 22,
                  backgroundColor: "#fafbfc",
                  border: "1.5px dashed #cfd4dc",
                  minHeight: 260,
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: 6,
                      backgroundColor: "#e5ecf9",
                      color: "#1e293b",
                      fontSize: 11,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    NEW STREET PLOT
                  </span>
                  <h2
                    style={{
                      margin: "0 0 6px",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#0d0e11",
                    }}
                  >
                    + Add another subject house
                  </h2>
                  <p
                    style={{
                      margin: "0 0 12px",
                      fontSize: 13,
                      color: "#555861",
                      lineHeight: 1.45,
                    }}
                  >
                    {unbuiltSubjects.length > 0
                      ? `Build ${unbuiltSubjects.map((s) => s.houseName).join(", ")} on your street, or customize a house SVG.`
                      : "All 4 subject houses are built on your street! You can also customize any house illustration."}
                  </p>
                </div>

                {/* Quick one-click buttons for unbuilt houses */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {unbuiltSubjects.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => addSubjectHouse(s.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: 12,
                        backgroundColor: "#ffffff",
                        border: "1px solid #d5d8e0",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#111",
                        cursor: "pointer",
                      }}
                    >
                      <span>+ Build {s.houseName}</span>
                      <span style={{ color: "#6b7079", fontSize: 12 }}>{s.name}</span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setAddHouseOpen(true)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 12,
                      backgroundColor: "#eef1f6",
                      border: "none",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#111",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    Manage houses / Upload custom house SVG →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN: REVISION (GROUP 4), PROGRESS (GROUP 7),
            MENTAL ABILITY (GROUP 5), AI AUNTY (GROUP 6)
            ============================================================ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* GROUP 4 — REVISION (Saa-Boo-Three: Let's Revise!) */}
          <section
            style={{
              padding: "20px 22px",
              borderRadius: 22,
              backgroundColor: "#f7f9fc",
              border: "1px solid #e6eaf0",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: 12,
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#6b7079",
                  }}
                >
                  SAA-BOO-THREE
                </span>
                <h2
                  style={{
                    margin: "4px 0 6px",
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#0d0e11",
                  }}
                >
                  Let&apos;s Revise!
                </h2>
                <p
                  style={{
                    margin: "0 0 14px",
                    fontSize: 13,
                    color: "#555861",
                    lineHeight: 1.45,
                  }}
                >
                  Flip your hand to practise concepts through street games — Catch-Catch, Cops &amp; Robbers, Simon Says, King, and Hide &amp; Seek.
                </p>

                <Link
                  href={`/saa-boo-three?subject=${nextRecommendation.subject.slug}&from=/hub`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 22px",
                    borderRadius: 14,
                    backgroundColor: "#0d0e11",
                    color: "#ffffff",
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <span>Let&apos;s Revise!</span>
                  <span>→</span>
                </Link>
              </div>

              <div
                style={{
                  height: 115,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/figma/hands-all.svg"
                  alt="Saa-Boo-Three hand toss"
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* GROUP 7 — PROGRESS ("What should I do next?") */}
          <section
            style={{
              padding: "18px 22px",
              borderRadius: 22,
              backgroundColor: "#ffffff",
              border: "1px solid #eceef2",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#6b7079",
                }}
              >
                YOUR PROGRESS • WHAT TO DO NEXT
              </span>
              <Link
                href="/progress"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#3b5bdb",
                  textDecoration: "none",
                }}
              >
                Full Progress →
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                fontSize: 12,
                color: "#555861",
                marginBottom: 10,
              }}
            >
              <span>
                <strong style={{ color: "#111" }}>
                  {progress.masteredConcepts.length}
                </strong>{" "}
                concepts mastered
              </span>
              <span>•</span>
              <span>
                <strong style={{ color: "#111" }}>{progress.streak}-day</strong>{" "}
                streak
              </span>
              <span>•</span>
              <span>
                <strong style={{ color: "#111" }}>{progress.xp}</strong> XP
              </span>
            </div>

            <div
              style={{
                padding: "12px 14px",
                borderRadius: 14,
                backgroundColor: "#f4f7fc",
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
                {nextRecommendation.subject.name} — {nextRecommendation.pct}% mastered
              </div>
              <div style={{ fontSize: 13, color: "#3d548f", marginTop: 2, fontWeight: 600 }}>
                Next: {nextRecommendation.nextConcept.title}
              </div>
            </div>

            <Link
              href={`/saa-boo-three?subject=${nextRecommendation.subject.slug}&concept=${nextRecommendation.nextConcept.id}&from=/hub`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "10px 16px",
                borderRadius: 12,
                backgroundColor: "#0d0e11",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              <span>Continue Revision ({nextRecommendation.nextConcept.title})</span>
              <span>→</span>
            </Link>
          </section>

          {/* GROUP 5 — MENTAL ABILITY (Compact Group with Figma Cow) */}
          <section
            style={{
              padding: "16px 20px",
              borderRadius: 20,
              backgroundColor: "#ffffff",
              border: "1px solid #eceef2",
              display: "grid",
              gridTemplateColumns: "1fr 72px",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 4px",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0d0e11",
                }}
              >
                Mental Ability
              </h3>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 13,
                  color: "#555861",
                  lineHeight: 1.4,
                }}
              >
                Logic puzzles, patterns &amp; number riddles.
              </p>
              <Link
                href="/mental-ability"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 10,
                  backgroundColor: "#0d0e11",
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Open Riddles <span>→</span>
              </Link>
            </div>

            <img
              src="/figma/assets/mental-ability-img-0.png"
              alt="Mental Ability Cow"
              style={{ width: 68, height: 68, objectFit: "contain" }}
            />
          </section>

          {/* GROUP 6 — AI AUNTY (Compact Group: Description + Action Together) */}
          <section
            style={{
              padding: "16px 20px",
              borderRadius: 20,
              backgroundColor: "#ffffff",
              border: "1px solid #eceef2",
              display: "grid",
              gridTemplateColumns: "1fr 84px",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 4px",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0d0e11",
                }}
              >
                Ask AI Aunty
              </h3>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 13,
                  color: "#555861",
                  lineHeight: 1.4,
                }}
              >
                Step-by-step explanations and real-world examples.
              </p>
              <Link
                href="/ai-screen"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 10,
                  backgroundColor: "#0d0e11",
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Ask a Doubt <span>→</span>
              </Link>
            </div>

            <div style={{ width: 80, height: 64 }}>
              <FigmaAiAuntyArt />
            </div>
          </section>
        </div>
      </div>

      {/* Modal for Adding / Customizing a Subject House SVG */}
      {addHouseOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 24,
              padding: 28,
              maxWidth: 540,
              width: "100%",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
                Add or Customize a Subject House
              </h2>
              <button
                type="button"
                onClick={() => setAddHouseOpen(false)}
                style={{
                  border: "none",
                  background: "#f1f3f7",
                  borderRadius: 999,
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ margin: "0 0 16px", fontSize: 13, color: "#555861" }}>
              Add another house to your Learning Street or upload a custom SVG house illustration.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {allSubjects.map((s) => {
                const isBuilt = enrolledIds.includes(s.id);
                return (
                  <div
                    key={s.id}
                    style={{
                      padding: 14,
                      borderRadius: 16,
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <strong style={{ fontSize: 14 }}>{s.houseName}</strong>
                    <div style={{ height: 75 }}>
                      {customSvgMap[s.id] ? (
                        <img
                          src={customSvgMap[s.id]}
                          alt={s.houseName}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      ) : (
                        <FigmaHouseArt subjectId={s.id} />
                      )}
                    </div>

                    <div style={{ display: "flex", gap: 6 }}>
                      {!isBuilt ? (
                        <button
                          type="button"
                          onClick={() => {
                            addSubjectHouse(s.id);
                            setAddHouseOpen(false);
                          }}
                          style={{
                            flex: 1,
                            padding: "8px 10px",
                            borderRadius: 10,
                            backgroundColor: "#0d0e11",
                            color: "#fff",
                            border: "none",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          + Build House
                        </button>
                      ) : (
                        <span
                          style={{
                            flex: 1,
                            padding: "8px 10px",
                            borderRadius: 10,
                            backgroundColor: "#e5f9ed",
                            color: "#14532d",
                            fontSize: 12,
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          Built on Street ✓
                        </span>
                      )}

                      <label
                        style={{
                          padding: "8px 10px",
                          borderRadius: 10,
                          backgroundColor: "#f1f3f7",
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Upload SVG
                        <input
                          type="file"
                          accept=".svg,image/svg+xml,image/png"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleUploadCustomSvg(
                              s.id,
                              e.target.files?.[0] || null
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </StreetShell>
  );
}
