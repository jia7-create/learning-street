"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { StreetShell } from "@/components/StreetShell";
import { FigmaGameArt } from "@/components/FigmaArt";
import { useLearning } from "@/components/LearningProvider";
import { getSubject } from "@/lib/curriculum";
import {
  readStudySession,
  saveStudySession,
  type StudySession,
} from "@/lib/study-session";
import { games, getDifficultyConfig } from "@/lib/games";
import { ctaMap } from "@/lib/cta-map";

export default function GameResultClient({
  game,
  subjectSlug,
  conceptId,
  score,
  total,
  difficulty = "simple",
}: {
  game: string;
  subjectSlug: string;
  conceptId: string;
  score: number;
  total: number;
  difficulty?: string;
}) {
  const router = useRouter();
  const { learner } = useLearning();
  const [sessionData, setSessionData] = useState<StudySession | null>(null);

  useEffect(() => {
    const saved = readStudySession();
    if (saved) {
      const completed = { ...saved, status: "complete" as const };
      saveStudySession(completed);
      setSessionData(completed);
    }
  }, []);

  const subject =
    getSubject(sessionData?.subjectSlug || subjectSlug, learner?.grade, learner?.board) ||
    getSubject("science", learner?.grade, learner?.board)!;
  const gameConfig =
    games.find((item) => item.slug === (sessionData?.selectedGame || game)) ||
    games[0];
  const diffCfg = getDifficultyConfig(
    sessionData?.difficultyMode || difficulty
  );

  // Compute all metrics strictly from actual session roundResults (with URL fallback if opened directly)
  const roundResults = sessionData?.roundResults || [];
  const hasRecordedRounds = roundResults.length > 0;

  const attemptedCount = hasRecordedRounds ? roundResults.length : total;
  const correctCount = hasRecordedRounds
    ? roundResults.filter((r) => r.correct).length
    : score;
  const incorrectCount = Math.max(0, attemptedCount - correctCount);
  const accuracyPct =
    attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  const xpEarned =
    sessionData?.xpEarned !== undefined
      ? sessionData.xpEarned
      : correctCount * diffCfg.xpPerCorrect;

  const stonesEarned =
    sessionData?.stonesEarned !== undefined
      ? sessionData.stonesEarned
      : correctCount > 0
        ? Math.max(1, Math.floor(correctCount / 2))
        : 0;

  const elapsedSec = sessionData?.elapsedSeconds || attemptedCount * 14;
  const formattedTime = useMemo(() => {
    const mins = Math.floor(elapsedSec / 60);
    const secs = elapsedSec % 60;
    if (mins === 0) return `${secs}s (${diffCfg.durationLabel} ${diffCfg.label})`;
    return `${mins}m ${secs}s (${diffCfg.durationLabel} ${diffCfg.label})`;
  }, [elapsedSec, diffCfg.durationLabel, diffCfg.label]);

  // Aggregate wrong concepts from actual session data
  const weakConcepts = useMemo(() => {
    if (hasRecordedRounds) {
      const map = new Map<
        string,
        {
          conceptId: string;
          conceptTitle: string;
          mistakes: number;
          missedPrompts: string[];
          misconception: string;
        }
      >();
      for (const r of roundResults) {
        if (!r.correct) {
          const existing = map.get(r.conceptId);
          if (existing) {
            existing.mistakes += 1;
            if (!existing.missedPrompts.includes(r.prompt)) {
              existing.missedPrompts.push(r.prompt);
            }
          } else {
            map.set(r.conceptId, {
              conceptId: r.conceptId,
              conceptTitle: r.conceptTitle,
              mistakes: 1,
              missedPrompts: [r.prompt],
              misconception: r.misconception,
            });
          }
        }
      }
      return Array.from(map.values());
    }

    // Fallback if someone navigated to /games/result directly via URL with score < total
    if (incorrectCount > 0) {
      const fallbackConcept =
        subject.concepts.find((c) => c.id === conceptId) || subject.concepts[0];
      return [
        {
          conceptId: fallbackConcept.id,
          conceptTitle: fallbackConcept.title,
          mistakes: incorrectCount,
          missedPrompts: [fallbackConcept.question.prompt],
          misconception: fallbackConcept.misconception,
        },
      ];
    }
    return [];
  }, [hasRecordedRounds, roundResults, incorrectCount, subject.concepts, conceptId]);

  function handlePlayAgain() {
    const current = readStudySession();
    if (current) {
      saveStudySession({
        ...current,
        roundResults: [],
        status: "playing",
      });
    }
    router.push(
      ctaMap.startGame(
        gameConfig.slug,
        subject.slug,
        conceptId,
        diffCfg.mode
      )
    );
  }

  function handleReviseWithAiAunty() {
    const weakNames = weakConcepts.map((w) => w.conceptTitle).join(", ");
    const queryParam = weakNames
      ? `?from=game-result&concepts=${encodeURIComponent(weakNames)}`
      : `?from=game-result&subject=${encodeURIComponent(subject.slug)}`;
    router.push(`/ai-screen${queryParam}`);
  }

  return (
    <StreetShell
      bg="#ffffff"
      backHref={`/subjects/${subject.slug}`}
      backLabel={`Back to ${subject.house}`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* ============================================================
            TOP REVISION SUMMARY BANNER
            ============================================================ */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 0.65fr",
            gap: 24,
            alignItems: "center",
            padding: "22px 28px",
            borderRadius: 24,
            backgroundColor: "#e4ebf8",
          }}
        >
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  backgroundColor: "#e5f9ed",
                  color: "#14532d",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                }}
              >
                GAME COMPLETE • REVISION SUMMARY
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  color: "#0d0e11",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                Class {learner?.classLevel || learner?.grade || 6} •{" "}
                {learner?.board || "CBSE"} • {gameConfig.name} • {subject.house}
              </span>
            </div>

            <h1
              style={{
                margin: "0 0 6px",
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0d0e11",
              }}
            >
              {accuracyPct}% Session Accuracy ({correctCount} / {attemptedCount}{" "}
              Correct)
            </h1>

            <p
              style={{
                margin: "0 0 16px",
                fontSize: 14,
                color: "#2d3748",
                lineHeight: 1.45,
              }}
            >
              {weakConcepts.length === 0
                ? `Spotless street run in ${gameConfig.name}! Every concept you practised was answered accurately and saved to your Learning Street progress.`
                : `You completed ${attemptedCount} street tasks in ${gameConfig.name}. We spotted ${weakConcepts.length} ${weakConcepts.length === 1 ? "concept" : "concepts"} that need a quick revision with AI Aunty.`}
            </p>

            {/* 8 Key Revision Summary Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 10,
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255,255,255,0.88)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#555861",
                    textTransform: "uppercase",
                  }}
                >
                  SCORE & ACCURACY
                </span>
                <strong style={{ fontSize: 18, color: "#0d0e11" }}>
                  {correctCount}/{attemptedCount} ({accuracyPct}%)
                </strong>
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255,255,255,0.88)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#555861",
                    textTransform: "uppercase",
                  }}
                >
                  CORRECT / WRONG
                </span>
                <strong style={{ fontSize: 18, color: "#0d0e11" }}>
                  <span style={{ color: "#2b8a3e" }}>{correctCount} ✓</span> •{" "}
                  <span style={{ color: "#e03131" }}>{incorrectCount} ✕</span>
                </strong>
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255,255,255,0.88)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#555861",
                    textTransform: "uppercase",
                  }}
                >
                  XP & STONES EARNED
                </span>
                <strong style={{ fontSize: 18, color: "#0d0e11" }}>
                  +{xpEarned} XP • {stonesEarned} Stones
                </strong>
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 14,
                  backgroundColor: "rgba(255,255,255,0.88)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#555861",
                    textTransform: "uppercase",
                  }}
                >
                  SESSION COMPLETED
                </span>
                <strong style={{ fontSize: 15, color: "#0d0e11" }}>
                  {formattedTime}
                </strong>
              </div>
            </div>
          </div>

          <div
            style={{
              height: 170,
              borderRadius: 18,
              backgroundColor: "rgba(255,255,255,0.65)",
              padding: 12,
            }}
          >
            <FigmaGameArt gameSlug={gameConfig.slug} />
          </div>
        </section>

        {/* ============================================================
            BOTTOM ROW: "THINGS TO REVISE" (NEEDS MORE PRACTICE) + ACTIONS
            ============================================================ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 0.75fr",
            gap: 22,
            alignItems: "start",
          }}
        >
          {/* Left: Things to revise / NEEDS MORE PRACTICE */}
          <section
            style={{
              padding: "20px 24px",
              borderRadius: 20,
              backgroundColor: "#f7f9fc",
              border: "1px solid #e4e8f0",
            }}
          >
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
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 6,
                    backgroundColor:
                      weakConcepts.length > 0 ? "#fce7eb" : "#e5f9ed",
                    color: weakConcepts.length > 0 ? "#9c2b4c" : "#14532d",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    marginBottom: 4,
                  }}
                >
                  {weakConcepts.length > 0
                    ? "NEEDS MORE PRACTICE"
                    : "ALL CONCEPTS ACCURATE"}
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#0d0e11",
                  }}
                >
                  Things to revise
                </h2>
              </div>

              <span style={{ fontSize: 12, fontWeight: 700, color: "#555861" }}>
                {weakConcepts.length}{" "}
                {weakConcepts.length === 1
                  ? "concept needs revision"
                  : "concepts need revision"}
              </span>
            </div>

            {weakConcepts.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {weakConcepts.map((item) => (
                  <div
                    key={item.conceptId}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 16,
                      backgroundColor: "#ffffff",
                      border: "1px solid #e6e8ef",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    <div>
                      <strong
                        style={{
                          display: "block",
                          fontSize: 16,
                          color: "#0d0e11",
                          marginBottom: 3,
                        }}
                      >
                        {item.conceptTitle}
                      </strong>
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          color: "#555861",
                        }}
                      >
                        Note: {item.misconception}
                      </span>
                    </div>

                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: 999,
                        backgroundColor: "#fce7eb",
                        color: "#9c2b4c",
                        fontSize: 12,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.mistakes}{" "}
                      {item.mistakes === 1 ? "mistake" : "mistakes"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: 16,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e6e8ef",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: 15,
                    color: "#14532d",
                    marginBottom: 4,
                  }}
                >
                  ✓ Zero mistakes in this session!
                </strong>
                <p style={{ margin: 0, fontSize: 13, color: "#555861" }}>
                  You answered every task accurately. You can still open AI
                  Aunty to explore deeper real-world examples of{" "}
                  <strong>{subject.name}</strong>.
                </p>
              </div>
            )}
          </section>

          {/* Right: Action Buttons ([Revise with AI Aunty →], [Play Again], [Back to Street]) */}
          <section
            style={{
              padding: "20px 24px",
              borderRadius: 20,
              backgroundColor: "#f7f9fc",
              border: "1px solid #e4e8f0",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#6b7079",
              }}
            >
              NEXT STEPS ON LEARNING STREET
            </span>

            <h3
              style={{
                margin: "0 0 4px",
                fontSize: 18,
                fontWeight: 700,
                color: "#0d0e11",
              }}
            >
              {weakConcepts.length > 0
                ? `Fix your ${weakConcepts.length} weak ${
                    weakConcepts.length === 1 ? "concept" : "concepts"
                  } with AI Aunty`
                : "Keep your street streak going!"}
            </h3>

            <p style={{ margin: "0 0 6px", fontSize: 13, color: "#555861" }}>
              AI Aunty already has your session results and wrong answers ready
              so you don&apos;t have to type what went wrong.
            </p>

            {/* Primary CTA: [Revise with AI Aunty →] */}
            <button
              type="button"
              onClick={handleReviseWithAiAunty}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: 14,
                border: "none",
                backgroundColor: "#0d0e11",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <span>Revise with AI Aunty</span>
              <span>→</span>
            </button>

            {/* Secondary CTA: [Play Again] */}
            <button
              type="button"
              onClick={handlePlayAgain}
              style={{
                width: "100%",
                padding: "13px 20px",
                borderRadius: 14,
                border: "1px solid #d5d8e0",
                backgroundColor: "#e4ebf8",
                color: "#0d0e11",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Play Again
            </button>

            {/* Tertiary CTA: [Back to Street] */}
            <Link
              href="/hub"
              style={{
                width: "100%",
                padding: "13px 20px",
                borderRadius: 14,
                border: "1px solid #d5d8e0",
                backgroundColor: "#ffffff",
                color: "#0d0e11",
                fontSize: 14,
                fontWeight: 700,
                textAlign: "center",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              Back to Street
            </Link>
          </section>
        </div>
      </div>
    </StreetShell>
  );
}
