"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StreetShell } from "@/components/StreetShell";
import { FigmaGameArt } from "@/components/FigmaArt";
import { useLearning } from "@/components/LearningProvider";
import { getSubject } from "@/lib/curriculum";
import { games } from "@/lib/games";
import {
  createStudySession,
  readStudySession,
  saveStudySession,
  selectGameForSession,
} from "@/lib/study-session";
import { ctaMap } from "@/lib/cta-map";

export default function SaaBooThree() {
  const router = useRouter();
  const { learner, attempts, ready } = useLearning();
  const [studyMode, setStudyMode] = useState<"solo" | "friends">("friends");
  const [flipping, setFlipping] = useState(false);
  const [chant, setChant] = useState<string | null>(null);
  const [stepHand, setStepHand] = useState<number>(0);
  const [backPath, setBackPath] = useState<string>("/hub");
  const [subjectSlug, setSubjectSlug] = useState<string>("science");
  const [conceptId, setConceptId] = useState<string>("roots");
  const [tossedGame, setTossedGame] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams(window.location.search);
    const subjectParam = params.get("subject") || undefined;
    const conceptParam = params.get("concept") || undefined;
    const previousPath = params.get("from") || "/hub";
    setBackPath(previousPath);

    const existing = readStudySession();
    const session = subjectParam
      ? createStudySession(
          learner,
          attempts,
          subjectParam,
          conceptParam,
          previousPath
        )
      : existing || createStudySession(learner, attempts);

    setSubjectSlug(session.subjectSlug || "science");
    setConceptId(session.conceptId || "roots");
    saveStudySession(session);
  }, [ready, learner, attempts]);

  const currentSubject =
    getSubject(subjectSlug, learner?.grade, learner?.board) ||
    getSubject("science", learner?.grade, learner?.board)!;
  const currentConcept =
    currentSubject.concepts.find((c) => c.id === conceptId) ||
    currentSubject.concepts[0];

  function handleChooseGame(gameSlug: string) {
    const session =
      readStudySession() ||
      createStudySession(learner, attempts, subjectSlug, conceptId, backPath);
    saveStudySession({
      ...session,
      selectedGame: gameSlug,
      subjectSlug: currentSubject.slug,
      conceptId: currentConcept?.id || conceptId,
      studyMode,
      status: "intro",
    });
    router.push(
      ctaMap.gameIntro(
        gameSlug,
        currentSubject.slug,
        currentConcept?.id || conceptId
      )
    );
  }

  function handleFlip() {
    if (flipping) return;
    setFlipping(true);
    setStepHand(1);
    setChant("Saa...");

    setTimeout(() => {
      setStepHand(2);
      setChant("Boo...");
    }, 450);

    setTimeout(() => {
      setStepHand(3);
      setChant("Three! ✋🤚");
    }, 900);

    setTimeout(() => {
      setStepHand(0);
      setFlipping(false);
      const session =
        readStudySession() ||
        createStudySession(learner, attempts, subjectSlug, conceptId, backPath);
      const selected = selectGameForSession(session, tossedGame || undefined);
      const picked = selected.selectedGame || "catch-catch";
      const gameObj = games.find((g) => g.slug === picked) || games[0];
      setTossedGame(picked);
      setChant(`Tossed: ${gameObj.name}!`);
      saveStudySession({
        ...selected,
        selectedGame: picked,
        studyMode,
      });
    }, 1350);
  }

  const handSvgSrc =
    stepHand === 1
      ? "/figma/hand-1.svg"
      : stepHand === 2
        ? "/figma/hand-2.svg"
        : stepHand === 3
          ? "/figma/hand-3.svg"
          : "/figma/hands-all.svg";

  return (
    <StreetShell bg="#ffffff" backHref={backPath} backLabel="Back">
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {/* ============================================================
            STAGE 1A — SAA-BOO-THREE HAND TOSS & REVISION CONTEXT
            ============================================================ */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 0.75fr",
            gap: 28,
            alignItems: "center",
            padding: "20px 26px",
            borderRadius: 24,
            backgroundColor: "#f7f9fc",
            border: "1px solid #e6e9f2",
          }}
        >
          <div>
            {/* Mode Selector Pills + Active Topic Context */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <button
                type="button"
                onClick={() => setStudyMode("solo")}
                style={{
                  padding: "7px 14px",
                  borderRadius: 10,
                  border: "none",
                  backgroundColor: studyMode === "solo" ? "#0d0e11" : "#e4ebf8",
                  color: studyMode === "solo" ? "#ffffff" : "#0d0e11",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Study by yourself
              </button>

              <button
                type="button"
                onClick={() => setStudyMode("friends")}
                style={{
                  padding: "7px 14px",
                  borderRadius: 10,
                  border: "none",
                  backgroundColor:
                    studyMode === "friends" ? "#0d0e11" : "#e4ebf8",
                  color: studyMode === "friends" ? "#ffffff" : "#0d0e11",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Study with friends
              </button>

              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
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
            </div>

            {/* PAIN POINT 2: Quick Concept Switcher Pill Bar so experienced users can switch topics in 1 click */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 6,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "#6b7079",
                  marginRight: 4,
                }}
              >
                Topic:
              </span>
              {currentSubject.concepts.slice(0, 6).map((c) => {
                const isSelected = c.id === currentConcept?.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setConceptId(c.id)}
                    style={{
                      padding: "4px 9px",
                      borderRadius: 999,
                      border: isSelected
                        ? "1.5px solid #0d0e11"
                        : "1px solid #d7dbe4",
                      backgroundColor: isSelected ? "#0d0e11" : "#ffffff",
                      color: isSelected ? "#ffffff" : "#2d3748",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {c.title}
                  </button>
                );
              })}
            </div>

            <span
              style={{
                display: "block",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#6b7079",
                marginBottom: 4,
              }}
            >
              STEP 1 • SAA-BOO-THREE STREET TOSS
            </span>

            <h1
              style={{
                margin: "0 0 6px",
                fontSize: "clamp(26px, 2.8vw, 36px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#0d0e11",
              }}
            >
              Saa, Boo, Three! — Choose Your Street Game
            </h1>

            <p
              style={{
                margin: "0 0 14px",
                fontSize: 13,
                lineHeight: 1.5,
                color: "#555861",
                maxWidth: 560,
              }}
            >
              Flip your hand on &ldquo;Saa, Boo, Three!&rdquo; to toss a random street game, or pick any of the 5 Learning Street games below to practise{" "}
              <strong>{currentConcept?.title}</strong> ({currentSubject.name}).
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <button
                type="button"
                onClick={handleFlip}
                disabled={flipping}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 20px",
                  borderRadius: 12,
                  border: "none",
                  backgroundColor: "#0d0e11",
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: flipping ? "wait" : "pointer",
                }}
              >
                <span>
                  {flipping
                    ? chant || "Flipping hands..."
                    : "✋ Flip your hand (Saa-Boo-Three Toss)"}
                </span>
              </button>

              {tossedGame && !flipping && (
                <button
                  type="button"
                  onClick={() => handleChooseGame(tossedGame)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "11px 18px",
                    borderRadius: 12,
                    border: "1.5px solid #0d0e11",
                    backgroundColor: "#e4ebf8",
                    color: "#0d0e11",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <span>
                    Play {games.find((g) => g.slug === tossedGame)?.name}
                  </span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Figma Kids Flipping Hands Illustration */}
          <div
            onClick={handleFlip}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              height: 165,
              position: "relative",
            }}
          >
            <img
              src={handSvgSrc}
              alt="Kids flipping hands in Saa-Boo-Three"
              style={{
                height: "100%",
                maxWidth: 240,
                objectFit: "contain",
                transform: flipping ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.25s ease",
              }}
            />
            {chant && (
              <div
                style={{
                  position: "absolute",
                  bottom: 4,
                  padding: "5px 14px",
                  borderRadius: 999,
                  backgroundColor: "#0d0e11",
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {chant}
              </div>
            )}
          </div>
        </section>

        {/* ============================================================
            1. GAME SELECTION — THE 5 DISTINCT LEARNING STREET GAMES
            ============================================================ */}
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#6b7079",
                }}
              >
                CHOOSE A GAME • 5 PLAYFUL STREET ACTIVITIES
              </span>
              <h2
                style={{
                  margin: "2px 0 0",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0d0e11",
                }}
              >
                Pick a street game to start revising
              </h2>
            </div>
            <span style={{ fontSize: 12, color: "#555861" }}>
              Next step: Choose session length (10 / 15 / 20 min) →
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {games.map((g) => {
              const isTossed = tossedGame === g.slug;
              return (
                <div
                  key={g.slug}
                  onClick={() => handleChooseGame(g.slug)}
                  style={{
                    borderRadius: 20,
                    padding: 16,
                    backgroundColor: "#ffffff",
                    border: isTossed
                      ? "2px solid #0d0e11"
                      : "1px solid #e4e7ef",
                    boxShadow: isTossed
                      ? "0 10px 24px rgba(13, 14, 17, 0.08)"
                      : "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 10,
                    cursor: "pointer",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                  }}
                >
                  <div>
                    {/* Game Visual Identity Header + Unique Figma Illustration */}
                    <div
                      style={{
                        height: 118,
                        borderRadius: 14,
                        backgroundColor: g.accentBg,
                        padding: 8,
                        marginBottom: 10,
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FigmaGameArt gameSlug={g.slug} />
                      <span
                        style={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          padding: "3px 8px",
                          borderRadius: 6,
                          backgroundColor: "rgba(255,255,255,0.9)",
                          color: "#0d0e11",
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {isTossed ? "★ TOSSED FOR YOU" : g.badgeText}
                      </span>
                    </div>

                    {/* Game Name */}
                    <h3
                      style={{
                        margin: "0 0 4px",
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: "#0d0e11",
                      }}
                    >
                      {g.name}
                    </h3>

                    {/* One-Line Explanation */}
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        lineHeight: 1.42,
                        color: "#555861",
                      }}
                    >
                      {g.purpose}
                    </p>
                  </div>

                  {/* Clear Play Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChooseGame(g.slug);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 12,
                      border: "none",
                      backgroundColor: "#0d0e11",
                      color: "#ffffff",
                      fontSize: 13,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      marginTop: 4,
                    }}
                  >
                    <span>Play {g.name}</span>
                    <span>→</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </StreetShell>
  );
}
