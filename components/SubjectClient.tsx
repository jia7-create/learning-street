"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { StreetShell } from "@/components/StreetShell";
import { FigmaHouseArt, FigmaSubjectMotifBadge } from "@/components/FigmaArt";
import { useLearning } from "@/components/LearningProvider";
import { getSubjectById } from "@/lib/curriculum";

export default function SubjectClient({ slug }: { slug: string }) {
  const { learner, progress, markConceptMastered } = useLearning();
  const classLevel = learner?.classLevel || Number(learner?.grade) || 6;
  const board = learner?.board || "CBSE";

  const subject = useMemo(
    () =>
      getSubjectById(classLevel, slug, board) ||
      getSubjectById(classLevel, "biology", board)!,
    [classLevel, slug, board]
  );

  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const activeChapter =
    subject.chapters[selectedChapterIdx] || subject.chapters[0];

  const [selectedStoneIdx, setSelectedStoneIdx] = useState(0);
  const activeConcept =
    activeChapter.concepts[selectedStoneIdx] || activeChapter.concepts[0];

  const allConcepts = useMemo(
    () => subject.chapters.flatMap((ch) => ch.concepts),
    [subject]
  );
  const masteredCount = useMemo(
    () =>
      allConcepts.filter((c) => progress.masteredConcepts.includes(c.id)).length,
    [allConcepts, progress.masteredConcepts]
  );
  const masteryPct =
    allConcepts.length > 0
      ? Math.round((masteredCount / allConcepts.length) * 100)
      : 0;
  const remainingCount = Math.max(0, allConcepts.length - masteredCount);

  const reviseHref = activeConcept
    ? `/saa-boo-three?subject=${subject.slug}&concept=${activeConcept.id}&from=/subjects/${subject.slug}`
    : `/saa-boo-three?subject=${subject.slug}&from=/subjects/${subject.slug}`;

  const stones = activeChapter.concepts.slice(0, 6);

  return (
    <StreetShell
      bg="#ffffff"
      backHref="/hub"
      backLabel="Back to Learner's Hub"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {/* ============================================================
            TOP SECTION: SUBJECT HEADER + CURRENT PROGRESS + HOUSE ART
            ============================================================ */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 0.75fr",
            gap: 28,
            alignItems: "center",
            paddingBottom: 18,
            borderBottom: "1px solid #eceef2",
          }}
        >
          {/* Left: Subject Header + Current Progress Kept Together */}
          <div>
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
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 6,
                  backgroundColor: "#e5f9ed",
                  color: "#14532d",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {subject.name} • Class {classLevel} •{" "}
                {board === "ICSE" ? "ICSE (CISCE)" : "CBSE (NCERT)"}
              </span>

              <FigmaSubjectMotifBadge subjectId={subject.id} />
            </div>

            <h1
              style={{
                margin: "0 0 8px",
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0d0e11",
              }}
            >
              {subject.houseName}
            </h1>

            <p
              style={{
                margin: "0 0 16px",
                fontSize: 14,
                lineHeight: 1.5,
                color: "#555861",
                maxWidth: 620,
              }}
            >
              {subject.description}
            </p>

            {/* CURRENT PROGRESS GROUP (Mastered % + Remaining + Current Chapter + Primary Action) */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 18,
                padding: "12px 18px",
                borderRadius: 16,
                backgroundColor: "#f7f9fc",
                border: "1px solid #e6eaf0",
              }}
            >
              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#0d0e11",
                  }}
                >
                  {masteryPct}% mastered
                </strong>
                <span style={{ fontSize: 12, color: "#6b7079" }}>
                  {remainingCount} concepts remaining
                </span>
              </div>

              <div
                style={{ width: 1, height: 28, backgroundColor: "#dcdde2" }}
              />

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#6b7079",
                  }}
                >
                  Current Chapter
                </span>
                <strong style={{ fontSize: 14, color: "#0d0e11" }}>
                  Ch {activeChapter.number} — {activeChapter.title}
                </strong>
              </div>

              <div style={{ marginLeft: "auto" }}>
                <Link
                  href={reviseHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    borderRadius: 12,
                    backgroundColor: "#e4ebf8",
                    color: "#0d0e11",
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Let&apos;s Study! <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Figma Subject House + Telephone Pylon Artwork */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              alignItems: "center",
              gap: 10,
              height: 185,
            }}
          >
            <div style={{ height: "100%" }}>
              <FigmaHouseArt subjectId={subject.id} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/figma/assets/individual-subject-house-img-1.png"
                alt="Telephone Powerline"
                style={{ width: 96, height: 96, objectFit: "contain" }}
              />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7079" }}>
                {masteredCount}/{allConcepts.length} Stones Lit
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            BOTTOM SECTION: CHAPTERS / TOPICS + HOPSCOTCH COURT +
            SELECTED CONCEPT & [REVISE] ACTION ALL VISUALLY TOGETHER
            ============================================================ */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Left: Chapter Header + Horizontal Figma Hopscotch 1-6 Court */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#6b7079",
                  }}
                >
                  CHAPTER {activeChapter.number} — {activeChapter.title.toUpperCase()}
                </span>
                <h2
                  style={{
                    margin: "2px 0 0",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#0d0e11",
                  }}
                >
                  Hopscotch Concept Stones (Select a concept to revise)
                </h2>
              </div>

              {subject.chapters.length > 1 && (
                <div style={{ display: "flex", gap: 6 }}>
                  {subject.chapters.map((ch, idx) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        setSelectedChapterIdx(idx);
                        setSelectedStoneIdx(0);
                      }}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "1px solid #d5d8e0",
                        backgroundColor:
                          idx === selectedChapterIdx ? "#0d0e11" : "#ffffff",
                        color: idx === selectedChapterIdx ? "#ffffff" : "#111",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Ch {ch.number}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lively Street Playground Hopscotch Court (1 -> 2 -> 3 -> [4 stacked over 5] -> 6 Semi-Circle HOME Dome) */}
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "auto 1fr 1fr 1fr 1.08fr 1.2fr",
                gap: 8,
                alignItems: "center",
                padding: "22px 18px",
                borderRadius: 24,
                background:
                  "linear-gradient(135deg, #f4f6fa 0%, #eef2f8 100%)",
                border: "2px dashed #cbd2e1",
                boxShadow: "inset 0 2px 10px rgba(15, 23, 42, 0.03)",
              }}
            >
              {/* Decorative Dashed Hop Trajectory Line Across the Court */}
              <svg
                viewBox="0 0 600 120"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  opacity: 0.45,
                }}
              >
                <path
                  d="M 45 60 Q 115 20, 175 60 T 305 60 Q 370 25, 425 40 M 305 60 Q 370 95, 425 80 M 445 60 Q 500 60, 545 60"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2.2"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Start Footprint Marker (Inspired by Hopscotch Footprint Diagrams) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  paddingRight: 4,
                  zIndex: 1,
                }}
                title="Hop from Stone 1 to 6!"
              >
                <div
                  style={{
                     display: "flex",
                    gap: 3,
                    padding: "6px 7px",
                    borderRadius: 12,
                    backgroundColor: "#ffffff",
                    border: "1.5px solid #0d0e11",
                    boxShadow: "0 3px 0 #0d0e11",
                  }}
                >
                  <span style={{ fontSize: 13, lineHeight: 1 }}>👟</span>
                </div>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "#475569",
                  }}
                >
                  HOP
                </span>
              </div>

              {/* Stones 1, 2, 3 */}
              {[0, 1, 2].map((idx) =>
                stones[idx] ? (
                  <FigmaHopscotchTile
                    key={stones[idx].id}
                    stoneNumber={idx + 1}
                    title={stones[idx].title}
                    selected={selectedStoneIdx === idx}
                    mastered={progress.masteredConcepts.includes(stones[idx].id)}
                    onClick={() => setSelectedStoneIdx(idx)}
                  />
                ) : null
              )}

              {/* Stones 4 & 5 Stacked (Double-Foot Hop) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  zIndex: 1,
                }}
              >
                {[3, 4].map((idx) =>
                  stones[idx] ? (
                    <FigmaHopscotchTile
                      key={stones[idx].id}
                      stoneNumber={idx + 1}
                      title={stones[idx].title}
                      selected={selectedStoneIdx === idx}
                      mastered={progress.masteredConcepts.includes(
                        stones[idx].id
                      )}
                      onClick={() => setSelectedStoneIdx(idx)}
                      compact
                    />
                  ) : null
                )}
              </div>

              {/* Stone 6: Rounded Right Semi-Circle HOME Apex */}
              {stones[5] && (
                <FigmaHopscotchTile
                  stoneNumber={6}
                  title={stones[5].title}
                  selected={selectedStoneIdx === 5}
                  mastered={progress.masteredConcepts.includes(stones[5].id)}
                  onClick={() => setSelectedStoneIdx(5)}
                  isApex
                />
              )}
            </div>

            {/* Compact Concept Pills Below Court for Instant Scanning */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 12,
              }}
            >
              {stones.map((st, idx) => {
                const isSel = selectedStoneIdx === idx;
                const isDone = progress.masteredConcepts.includes(st.id);
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStoneIdx(idx)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: isSel ? "1.5px solid #0d0e11" : "1px solid #dcdde2",
                      backgroundColor: isSel
                        ? "#e4ebf8"
                        : isDone
                          ? "#e5f9ed"
                          : "#ffffff",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#111",
                      cursor: "pointer",
                    }}
                  >
                    {idx + 1}. {st.title} {isDone ? "✓" : ""}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Concept Details + Associated [Revise] Action Kept Visually Together */}
          {activeConcept && (
            <div
              style={{
                padding: "22px 24px",
                borderRadius: 22,
                backgroundColor: "#f7f9fc",
                border: "1px solid #e4e8f0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 14,
              }}
            >
              <div>
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
                      color: "#3d548f",
                    }}
                  >
                    CONCEPT {activeConcept.stoneNumber} OF {stones.length} •{" "}
                    {activeChapter.title}
                  </span>

                  <button
                    type="button"
                    onClick={() => markConceptMastered(activeConcept.id, 15)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      border: "1px solid #cfd4dc",
                      backgroundColor: progress.masteredConcepts.includes(
                        activeConcept.id
                      )
                        ? "#e5f9ed"
                        : "#ffffff",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {progress.masteredConcepts.includes(activeConcept.id)
                      ? "✓ Mastered"
                      : "Mark Mastered"}
                  </button>
                </div>

                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#0d0e11",
                  }}
                >
                  {activeConcept.title}
                </h3>

                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "#333740",
                  }}
                >
                  {activeConcept.summary}
                </p>

                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e6eaf0",
                    fontSize: 12,
                    color: "#555861",
                    lineHeight: 1.45,
                  }}
                >
                  <strong style={{ color: "#111" }}>Key takeaway: </strong>
                  {activeConcept.keyFacts[1] || activeConcept.keyFacts[0]}
                </div>
              </div>

              {/* Primary [Revise] CTA + AI Aunty helper link right together */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  paddingTop: 4,
                }}
              >
                <Link
                  href={reviseHref}
                  style={{
                    flex: 1,
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
                  <span>Revise &ldquo;{activeConcept.title}&rdquo;</span>
                  <span>→</span>
                </Link>

                <Link
                  href={`/ai-screen?q=${encodeURIComponent(`Explain ${activeConcept.title}`)}`}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    backgroundColor: "#ffffff",
                    border: "1px solid #d5d8e0",
                    color: "#111",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Ask AI Aunty
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </StreetShell>
  );
}

const HOPSCOTCH_STONE_PALETTE: Record<
  number,
  { bg: string; activeBg: string; accent: string; badgeBg: string }
> = {
  1: {
    bg: "#FFE4D6",
    activeBg: "#FFD0B8",
    accent: "#EA580C",
    badgeBg: "#FFF7ED",
  },
  2: {
    bg: "#FEF3C7",
    activeBg: "#FDE68A",
    accent: "#D97706",
    badgeBg: "#FFFBEB",
  },
  3: {
    bg: "#DCEBFA",
    activeBg: "#BFDBFE",
    accent: "#2563EB",
    badgeBg: "#EFF6FF",
  },
  4: {
    bg: "#FCE7F3",
    activeBg: "#FBCFE8",
    accent: "#DB2777",
    badgeBg: "#FDF2F8",
  },
  5: {
    bg: "#E0E7FF",
    activeBg: "#C7D2FE",
    accent: "#4F46E5",
    badgeBg: "#EEF2FF",
  },
  6: {
    bg: "#FDE68A",
    activeBg: "#FCD34D",
    accent: "#B45309",
    badgeBg: "#FFFBEB",
  },
};

function FigmaHopscotchTile({
  stoneNumber,
  title,
  selected,
  mastered,
  compact = false,
  isApex = false,
  onClick,
}: {
  stoneNumber: number;
  title: string;
  selected: boolean;
  mastered: boolean;
  compact?: boolean;
  isApex?: boolean;
  onClick: () => void;
}) {
  const palette = HOPSCOTCH_STONE_PALETTE[stoneNumber] || HOPSCOTCH_STONE_PALETTE[1];
  const bgColor = mastered
    ? "#CCFBF1"
    : selected
      ? palette.activeBg
      : palette.bg;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        zIndex: 1,
        height: isApex ? 182 : compact ? 87 : 116,
        padding: compact ? "8px 10px" : "10px 10px",
        borderRadius: isApex ? "18px 999px 999px 18px" : 16,
        border: selected ? "2.5px solid #0d0e11" : "2px solid #0d0e11",
        backgroundColor: bgColor,
        boxShadow: selected
          ? "0 5px 0 #0d0e11"
          : "0 3px 0 rgba(13, 14, 17, 0.85)",
        transform: selected ? "translateY(-2px)" : "translateY(0)",
        color: "#0d0e11",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: compact ? 3 : 5,
        overflow: "hidden",
        transition: "transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
      }}
    >
      {/* Subtle Geometric Chalk Diagonal Lines (Inspired by Street Hopscotch Art) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.18,
        }}
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke={palette.accent} strokeWidth="2" />
        <line x1="100" y1="0" x2="0" y2="100" stroke={palette.accent} strokeWidth="2" />
      </svg>

      {/* Active Hopscotch Marker / Mastered Star */}
      {selected && (
        <span
          style={{
            position: "absolute",
            top: 5,
            right: isApex ? 18 : 6,
            fontSize: 11,
            lineHeight: 1,
          }}
          title="You are standing on this stone"
        >
          👟
        </span>
      )}
      {mastered && !selected && (
        <span
          style={{
            position: "absolute",
            top: 5,
            right: isApex ? 18 : 6,
            fontSize: 11,
            fontWeight: 800,
            color: "#0f766e",
          }}
        >
          ★
        </span>
      )}

      {isApex && (
        <span
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "2px 7px",
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.75)",
            border: "1px solid #0d0e11",
            color: "#0d0e11",
          }}
        >
          HOME • 6
        </span>
      )}

      {/* Chalk Number Medallion */}
      {!isApex && (
        <span
          style={{
            width: compact ? 22 : 28,
            height: compact ? 22 : 28,
            borderRadius: "50%",
            backgroundColor: mastered ? "#99f6e4" : palette.badgeBg,
            border: "1.5px solid #0d0e11",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: compact ? 12 : 15,
            fontWeight: 800,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {stoneNumber}
        </span>
      )}

      <span
        style={{
          position: "relative",
          fontSize: compact ? 11.5 : 12,
          fontWeight: 700,
          lineHeight: 1.2,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          padding: "0 2px",
        }}
      >
        {title}
      </span>
    </button>
  );
}
