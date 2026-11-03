"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { StreetShell } from "@/components/StreetShell";
import { FigmaSnakeLadderArt, FigmaHouseArt } from "@/components/FigmaArt";
import { useLearning } from "@/components/LearningProvider";
import { getSubjectsForClass } from "@/lib/curriculum";

export default function Progress() {
  const { learner, progress } = useLearning();
  const classLevel = learner?.classLevel || Number(learner?.grade) || 6;
  const board = learner?.board || "CBSE";
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

  const totalConcepts = enrolledSubjects.reduce(
    (acc, s) => acc + s.chapters.reduce((a, ch) => a + ch.concepts.length, 0),
    0
  );
  const masteredCount = enrolledSubjects.reduce(
    (acc, s) =>
      acc +
      s.chapters.reduce(
        (a, ch) =>
          a +
          ch.concepts.filter((c) => progress.masteredConcepts.includes(c.id))
            .length,
        0
      ),
    0
  );
  const overallMasteryPct =
    totalConcepts > 0 ? Math.round((masteredCount / totalConcepts) * 100) : 0;
  const overallAccuracy =
    progress.totalQuestions > 0
      ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
      : 100;

  // SECTION 3 — WHAT NEXT?
  const whatNext = useMemo(() => {
    for (const s of enrolledSubjects) {
      for (const ch of s.chapters) {
        for (const c of ch.concepts) {
          if (!progress.masteredConcepts.includes(c.id)) {
            return { subject: s, chapter: ch, concept: c, allDone: false };
          }
        }
      }
    }
    const fallback = enrolledSubjects[0] || allSubjects[0];
    return {
      subject: fallback,
      chapter: fallback.chapters[0],
      concept: fallback.chapters[0].concepts[0],
      allDone: true,
    };
  }, [enrolledSubjects, allSubjects, progress.masteredConcepts]);

  return (
    <StreetShell bg="#ffffff" backHref="/hub" backLabel="Back to Street">
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {/* ============================================================
            SECTION 1 — OVERALL (Figma Periwinkle Banner + Snake & Ladder Art)
            ============================================================ */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 0.75fr",
            gap: 24,
            alignItems: "center",
            padding: "24px 28px",
            borderRadius: 24,
            backgroundColor: "#e3eaf8",
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#4a5568",
                marginBottom: 6,
              }}
            >
              {(learner?.name || "JIA ARUN").toUpperCase()}&apos;S LEARNING PROGRESS • CLASS {classLevel} •{" "}
              {board === "ICSE"
                ? classLevel >= 11
                  ? "ISC (CISCE)"
                  : "ICSE (CISCE)"
                : "CBSE (NCERT)"}
            </span>

            <h1
              style={{
                margin: "0 0 8px",
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0d0e11",
              }}
            >
              {overallMasteryPct}% Overall Mastery ({masteredCount} of {totalConcepts} Stones)
            </h1>

            <p
              style={{
                margin: "0 0 18px",
                fontSize: 14,
                color: "#2d3748",
                lineHeight: 1.5,
                maxWidth: 560,
              }}
            >
              <strong>What this number means:</strong> You&apos;ve mastered{" "}
              {masteredCount} of {totalConcepts} Class {classLevel} {board} concepts.{" "}
              {whatNext.allDone
                ? "All current stones are complete—play a Hard round to lock in retention!"
                : `Your immediate next step is "${whatNext.concept.title}" in ${whatNext.subject.houseName}.`}
            </p>

            {/* Overall Metrics Kept Together (XP, Streak, Accuracy, Concepts Mastered) */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <div
                style={{
                  padding: "10px 16px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255, 255, 255, 0.82)",
                  minWidth: 110,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#4a5568",
                  }}
                >
                  TOTAL XP
                </span>
                <strong style={{ fontSize: 20, fontWeight: 700, color: "#0d0e11" }}>
                  {progress.xp} XP
                </strong>
              </div>

              <div
                style={{
                  padding: "10px 16px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255, 255, 255, 0.82)",
                  minWidth: 110,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#4a5568",
                  }}
                >
                  STREAK
                </span>
                <strong style={{ fontSize: 20, fontWeight: 700, color: "#0d0e11" }}>
                  {progress.streak} days
                </strong>
              </div>

              <div
                style={{
                  padding: "10px 16px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255, 255, 255, 0.82)",
                  minWidth: 110,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#4a5568",
                  }}
                >
                  ACCURACY
                </span>
                <strong style={{ fontSize: 20, fontWeight: 700, color: "#0d0e11" }}>
                  {overallAccuracy}%
                </strong>
              </div>

              <div
                style={{
                  padding: "10px 16px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255, 255, 255, 0.82)",
                  minWidth: 110,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#4a5568",
                  }}
                >
                  CONCEPTS MASTERED
                </span>
                <strong style={{ fontSize: 20, fontWeight: 700, color: "#0d0e11" }}>
                  {masteredCount} / {totalConcepts}
                </strong>
              </div>
            </div>
          </div>

          {/* Right: Figma Snake & Ladder Street Illustration */}
          <div style={{ height: 195 }}>
            <FigmaSnakeLadderArt />
          </div>
        </section>

        {/* ============================================================
            BOTTOM ROW: SECTION 2 (SUBJECT PROGRESS) + SECTION 3 (WHAT NEXT?)
            ============================================================ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 0.65fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* SECTION 2 — SUBJECT PROGRESS (Visually associated with each subject) */}
          <section>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: 18,
                fontWeight: 700,
                color: "#0d0e11",
              }}
            >
              Subject Progress
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              {enrolledSubjects.map((s) => {
                const concepts = s.chapters.flatMap((ch) => ch.concepts);
                const done = concepts.filter((c) =>
                  progress.masteredConcepts.includes(c.id)
                ).length;
                const pct =
                  concepts.length > 0
                    ? Math.round((done / concepts.length) * 100)
                    : 0;
                const nextConcept =
                  concepts.find(
                    (c) => !progress.masteredConcepts.includes(c.id)
                  ) || concepts[0];

                return (
                  <div
                    key={s.id}
                    style={{
                      padding: 16,
                      borderRadius: 18,
                      backgroundColor: "#ffffff",
                      border: "1px solid #e6e8ee",
                      color: "#0d0e11",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <Link
                      href={`/subjects/${s.slug}`}
                      style={{
                        height: 95,
                        display: "block",
                        textDecoration: "none",
                      }}
                    >
                      <FigmaHouseArt subjectId={s.id} />
                    </Link>

                    <div>
                      <div
                        style={{
                          fontSize: 10.5,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          color: "#14532d",
                        }}
                      >
                        {s.name} • {s.syllabusTag}
                      </div>
                      <strong
                        style={{
                          display: "block",
                          fontSize: 16,
                          fontWeight: 700,
                          margin: "2px 0 6px",
                        }}
                      >
                        {s.houseName.replace(/^The\s+/i, "")} — {pct}% mastered
                      </strong>

                      <div
                        style={{
                          height: 6,
                          borderRadius: 999,
                          backgroundColor: "#eef0f4",
                          overflow: "hidden",
                          marginBottom: 6,
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

                      <span
                        style={{
                          display: "block",
                          fontSize: 11.5,
                          color: "#555861",
                          marginBottom: 8,
                        }}
                      >
                        {done} of {concepts.length} stones mastered •{" "}
                        <strong>Up next: {nextConcept?.title}</strong>
                      </span>

                      <Link
                        href={`/saa-boo-three?subject=${s.slug}&concept=${nextConcept?.id}&from=/progress`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: 10,
                          backgroundColor: "#0d0e11",
                          color: "#ffffff",
                          fontSize: 11.5,
                          fontWeight: 700,
                          textDecoration: "none",
                          boxSizing: "border-box",
                        }}
                      >
                        <span>⚡ Revise {nextConcept?.title}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 3 — WHAT NEXT? (Turns progress into an immediate action) */}
          <section>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: 18,
                fontWeight: 700,
                color: "#0d0e11",
              }}
            >
              What Next?
            </h2>

            <div
              style={{
                padding: "22px 24px",
                borderRadius: 20,
                backgroundColor: "#f7f9fc",
                border: "1px solid #e4e8f0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 14,
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 6,
                    backgroundColor: "#e5f9ed",
                    color: "#14532d",
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  CONTINUE LEARNING
                </span>

                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#0d0e11",
                  }}
                >
                  {whatNext.subject.name} — {whatNext.concept.title}
                </h3>

                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: 13,
                    color: "#555861",
                    lineHeight: 1.45,
                  }}
                >
                  {whatNext.allDone
                    ? "You have mastered every stone in this house! Play a quick round to keep your streak strong."
                    : `You haven't mastered this yet. (${whatNext.subject.houseName} • ${whatNext.chapter.title})`}
                </p>
              </div>

              <Link
                href={`/saa-boo-three?subject=${whatNext.subject.slug}&concept=${whatNext.concept.id}&from=/progress`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
                  borderRadius: 14,
                  backgroundColor: "#0d0e11",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>Continue Revision</span>
                <span>→</span>
              </Link>

              {progress.recentActivity.length > 0 && (
                <div
                  style={{
                    marginTop: 4,
                    paddingTop: 12,
                    borderTop: "1px solid #e4e8f0",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6b7079",
                      marginBottom: 6,
                    }}
                  >
                    RECENT GAME & SESSION HISTORY
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    {progress.recentActivity.slice(0, 3).map((act) => (
                      <div
                        key={act.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "#0d0e11",
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{act.title}</span>
                        <span
                          style={{
                            fontWeight: 700,
                            color: act.score.includes("✓")
                              ? "#14532d"
                              : "#555861",
                          }}
                        >
                          {act.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </StreetShell>
  );
}
