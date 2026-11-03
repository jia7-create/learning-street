"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StreetShell } from "@/components/StreetShell";
import { FigmaGameArt } from "@/components/FigmaArt";
import { useLearning } from "@/components/LearningProvider";
import { getSubject } from "@/lib/curriculum";
import { ctaMap } from "@/lib/cta-map";
import {
  DIFFICULTY_SESSIONS,
  games,
  getDifficultyConfig,
  type DifficultyMode,
} from "@/lib/games";
import {
  readStudySession,
  saveStudySession,
  selectGameForSession,
  type StudySession,
} from "@/lib/study-session";

const instructions: Record<string, string> = {
  "catch-catch": "Catch the correct runner before they sprint past the finish line.",
  "cops-robbers": "Spot and intercept the sneaky misconception robber before they escape.",
  "simon-says": "Follow Simon's street command only when the statement is factually true!",
  king: "Challengers orbit the street throne — crown the concept that rules true.",
  "hide-seek": "Answers play peek-a-boo behind street bushes and buses — tag the right hider.",
};

export default function GameIntroClient({
  game,
  subject,
  concept,
}: {
  game: string;
  subject: string;
  concept: string;
}) {
  const router = useRouter();
  const { learner, ready } = useLearning();
  const config = games.find((item) => item.slug === game) || games[0];
  const [selectedMode, setSelectedMode] = useState<DifficultyMode>("simple");

  const currentSubject =
    getSubject(subject, learner?.grade, learner?.board) ||
    getSubject("science", learner?.grade, learner?.board)!;
  const currentConcept =
    currentSubject.concepts.find((c) => c.id === concept) ||
    currentSubject.concepts[0];

  useEffect(() => {
    if (!ready) return;
    const session = readStudySession();
    const classLvl = Number(learner?.classLevel || learner?.grade || 6);
    if (session?.difficultyMode) {
      setSelectedMode(session.difficultyMode);
    } else if (classLvl >= 12) {
      // PAIN POINT 4: Senior Class 12 students automatically start at Hard (20 min) challenge level
      setSelectedMode("hard");
    } else if (classLvl >= 10) {
      setSelectedMode("intermediate");
    }
    if (session) {
      saveStudySession({
        ...session,
        selectedGame: game,
        subjectSlug: subject,
        conceptId: concept,
        status: "intro",
      });
    }
  }, [ready, game, subject, concept, learner]);

  const activeDiff = getDifficultyConfig(selectedMode);

  function startGame() {
    const session = readStudySession();
    const diffCfg = getDifficultyConfig(selectedMode);
    const updated: StudySession = {
      ...(session || {
        id: `${Date.now()}`,
        studentName: learner?.name || "Learner",
        subjectSlug: subject,
        conceptId: concept,
        selectedGame: game,
        startedAt: new Date().toISOString(),
        status: "playing",
      }),
      selectedGame: game,
      subjectSlug: subject,
      conceptId: concept,
      difficultyMode: selectedMode,
      sessionLengthMinutes: diffCfg.durationMinutes,
      totalPlannedQuestions: diffCfg.questionCount,
      roundResults: [],
      startedAt: new Date().toISOString(),
      status: "playing",
    };
    saveStudySession(updated);
    router.push(ctaMap.startGame(game, subject, concept, selectedMode));
  }

  function chooseDifferentGame() {
    const session = readStudySession();
    if (!session) {
      router.push("/saa-boo-three");
      return;
    }
    const next = selectGameForSession(session, game);
    saveStudySession(next);
    router.push(
      ctaMap.gameIntro(
        next.selectedGame || "catch-catch",
        next.subjectSlug,
        next.conceptId
      )
    );
  }

  return (
    <StreetShell
      bg="#ffffff"
      backHref={`/saa-boo-three?subject=${subject}&concept=${concept}`}
      backLabel="Back to Games"
    >
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.25fr 0.75fr",
          gap: 32,
          alignItems: "center",
          padding: "8px 0",
        }}
      >
        {/* Left: Chosen Game + "How do you want to play?" 3 Session Modes + [Start Game →] */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                padding: "5px 10px",
                borderRadius: 6,
                backgroundColor: "#e5f9ed",
                color: "#14532d",
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              Class {learner?.classLevel || learner?.grade || 6} •{" "}
              {learner?.board || "CBSE"} • {currentSubject.house} •{" "}
              {currentConcept?.title}
            </span>
            <span
              style={{
                padding: "5px 10px",
                borderRadius: 6,
                backgroundColor: config.accentBg,
                color: "#0d0e11",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {config.badgeText}
            </span>
            {Number(learner?.classLevel || learner?.grade || 6) >= 10 && (
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: 6,
                  backgroundColor: "#0d0e11",
                  color: "#ffffff",
                  fontSize: 10.5,
                  fontWeight: 700,
                }}
              >
                ⚡ Senior Class {learner?.classLevel || learner?.grade} Difficulty Scaling Active
              </span>
            )}
          </div>

          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "clamp(34px, 4vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#0d0e11",
            }}
          >
            It’s {config.name}!
          </h1>

          <p
            style={{
              margin: "0 0 20px",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 1.4,
              color: "#555861",
              maxWidth: 540,
            }}
          >
            {instructions[config.slug] || config.purpose}
          </p>

          {/* ============================================================
              2. DIFFICULTY / SESSION SELECTION ("How do you want to play?")
              ============================================================ */}
          <div style={{ marginBottom: 22 }}>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#0d0e11",
              }}
            >
              How do you want to play?
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              {DIFFICULTY_SESSIONS.map((opt) => {
                const isSelected = selectedMode === opt.mode;
                return (
                  <button
                    key={opt.mode}
                    type="button"
                    onClick={() => setSelectedMode(opt.mode)}
                    style={{
                      padding: "16px 16px",
                      borderRadius: 18,
                      border: isSelected
                        ? "2px solid #0d0e11"
                        : "1px solid #dfe3ec",
                      backgroundColor: isSelected ? opt.accentBg : "#f7f9fc",
                      color: "#0d0e11",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 8,
                      transition: "all 0.16s ease",
                      boxShadow: isSelected
                        ? "0 8px 20px rgba(13, 14, 17, 0.08)"
                        : "none",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: "#0d0e11",
                          }}
                        >
                          {opt.label}
                        </span>
                        <span
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border: "1.5px solid #0d0e11",
                            backgroundColor: isSelected
                              ? "#0d0e11"
                              : "transparent",
                            color: "#ffffff",
                            fontSize: 10,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {isSelected ? "✓" : ""}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: 26,
                          fontWeight: 700,
                          letterSpacing: "-0.03em",
                          color: "#0d0e11",
                          marginBottom: 4,
                        }}
                      >
                        {opt.durationLabel}
                      </div>

                      <p
                        style={{
                          margin: "0 0 10px",
                          fontSize: 13,
                          fontWeight: 600,
                          lineHeight: 1.35,
                          color: "#2d3139",
                        }}
                      >
                        {opt.description}
                      </p>
                    </div>

                    <div
                      style={{
                        paddingTop: 8,
                        borderTop: "1px solid rgba(13, 14, 17, 0.1)",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#555861",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{opt.questionCount} tasks</span>
                      <span>+{opt.xpPerCorrect} XP / task</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary Bar + Primary Action Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 13,
              fontWeight: 600,
              color: "#555861",
              marginBottom: 16,
            }}
          >
            <span>◴ {activeDiff.durationLabel} session</span>
            <span style={{ color: "#cfd4dc" }}>|</span>
            <span>{activeDiff.questionCount} STREET TASKS</span>
            <span style={{ color: "#cfd4dc" }}>|</span>
            <span>
              Up to +{activeDiff.questionCount * activeDiff.xpPerCorrect} XP
            </span>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={startGame}
              style={{
                minWidth: 210,
                padding: "15px 28px",
                borderRadius: 14,
                border: "none",
                backgroundColor: "#0d0e11",
                color: "#ffffff",
                fontSize: 15,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                cursor: "pointer",
              }}
            >
              <span>Start Game</span>
              <span>→</span>
            </button>

            <button
              type="button"
              onClick={chooseDifferentGame}
              style={{
                padding: "15px 22px",
                borderRadius: 14,
                border: "1px solid #d5d8e0",
                backgroundColor: "#e4ebf8",
                color: "#0d0e11",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Flip your hand again
            </button>
          </div>
        </div>

        {/* Right: Game Illustration + Saa-Boo-Three Hands */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 220,
              borderRadius: 24,
              backgroundColor: config.accentBg,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FigmaGameArt gameSlug={config.slug} />
          </div>

          <div
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 18,
              backgroundColor: "#f7f9fc",
              border: "1px solid #e6e9f2",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <img
              src="/figma/hands-all.svg"
              alt="Saa-Boo-Three hands"
              style={{ width: 68, height: 68, objectFit: "contain" }}
            />
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#6b7079",
                }}
              >
                TODAY&apos;S STREET TOPIC
              </span>
              <strong
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "#0d0e11",
                  marginBottom: 2,
                }}
              >
                {currentConcept?.title} ({currentSubject.name})
              </strong>
              <span style={{ fontSize: 12, color: "#555861" }}>
                {currentSubject.chapter}
              </span>
            </div>
          </div>
        </div>
      </div>
    </StreetShell>
  );
}
