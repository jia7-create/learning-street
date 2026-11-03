"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDifficultyConfig,
  type DifficultyMode,
  type GameConfig,
} from "@/lib/games";
import { getSubject, hasGroundedContent, type Concept } from "@/lib/curriculum";
import { bestNextConcept } from "@/lib/progress";
import {
  readStudySession,
  saveStudySession,
  type SessionRoundRecord,
} from "@/lib/study-session";
import {
  FigmaHouseArt,
  FigmaRunnerSprite,
  FigmaSchoolBusArt,
  FigmaSuspectSprite,
} from "./FigmaArt";
import { useLearning } from "./LearningProvider";
import { ctaMap } from "@/lib/cta-map";

const SIMON_ACTIONS = ["JUMP", "CLAP", "TURN", "STOMP"] as const;
type SimonAction = (typeof SIMON_ACTIONS)[number];

type RoundTask = {
  roundNumber: number;
  concept: Concept;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  misconception: string;
  // Simon Says specific fields
  simonCommandText?: string;
  simonTargetAction?: SimonAction;
  simonHasPrefix?: boolean;
};

/**
 * Ensures every question has 4 distinct curriculum options
 */
function buildFourOptions(
  concept: Concept,
  allConcepts: Concept[],
  roundIndex: number
): string[] {
  const base = [...concept.question.options];
  for (const other of allConcepts) {
    if (base.length >= 4) break;
    const candidate = other.question.answer;
    if (candidate && !base.includes(candidate)) {
      base.push(candidate);
    }
  }
  const fallbacks = ["Cell wall", "Cytoplasm", "Chloroplast", "Vacuole"];
  for (const fb of fallbacks) {
    if (base.length >= 4) break;
    if (!base.includes(fb)) base.push(fb);
  }
  const four = base.slice(0, 4);
  // Deterministic rotation so the correct answer is not always first
  return four.map((_, idx) => four[(idx + roundIndex) % four.length]);
}

function buildRoundTask(
  mode: string,
  roundIndex: number,
  concept: Concept,
  allConcepts: Concept[]
): RoundTask {
  const q = concept.question;
  const fourOptions = buildFourOptions(concept, allConcepts, roundIndex);

  if (mode === "simon-says") {
    const action = SIMON_ACTIONS[roundIndex % SIMON_ACTIONS.length];
    // Alternate between "Simon says [ACTION]" and "[ACTION]" (without Simon says)
    const hasSimonPrefix = roundIndex % 3 !== 1;
    const commandText = hasSimonPrefix ? `Simon says ${action}` : `${action}`;

    return {
      roundNumber: roundIndex + 1,
      concept,
      prompt: commandText,
      options: [...SIMON_ACTIONS],
      correctAnswer: hasSimonPrefix ? action : "DO_NOT_ACT",
      explanation: hasSimonPrefix
        ? `Great reflexes! Because the instruction began with "Simon says ${action}", performing ${action} was right. (${concept.title}: ${concept.explanation})`
        : `Sharp attention! The instruction was just "${action}" without "Simon says", so holding still was correct! (${concept.title}: ${concept.explanation})`,
      misconception: concept.misconception,
      simonCommandText: commandText,
      simonTargetAction: action,
      simonHasPrefix: hasSimonPrefix,
    };
  }

  return {
    roundNumber: roundIndex + 1,
    concept,
    prompt: q.prompt,
    options: fourOptions,
    correctAnswer: q.answer,
    explanation: q.explanation,
    misconception: concept.misconception,
  };
}

export default function GameClient({
  config,
  subjectSlug = "science",
  conceptId = "",
  difficultyParam,
}: {
  config: GameConfig;
  subjectSlug?: string;
  conceptId?: string;
  difficultyParam?: string;
}) {
  const router = useRouter();
  const { learner, attempts, recordAttempt, markConceptMastered, ready } =
    useLearning();

  const [difficultyMode, setDifficultyMode] = useState<DifficultyMode>(
    (difficultyParam as DifficultyMode) || "simple"
  );

  useEffect(() => {
    if (difficultyParam) {
      setDifficultyMode(difficultyParam as DifficultyMode);
      return;
    }
    const saved = readStudySession();
    if (saved?.difficultyMode) {
      setDifficultyMode(saved.difficultyMode);
    }
  }, [difficultyParam]);

  const diffCfg = useMemo(
    () => getDifficultyConfig(difficultyMode),
    [difficultyMode]
  );

  const subject =
    getSubject(subjectSlug, learner?.grade, learner?.board) ||
    getSubject("science", learner?.grade, learner?.board)!;

  // Build ordered sequence of concepts for the session
  const orderedConcepts = useMemo(() => {
    const all = subject.concepts;
    const primary =
      all.find((c) => c.id === conceptId) ||
      bestNextConcept(all, attempts) ||
      all[0];
    const rest = all.filter((c) => c.id !== primary.id);
    const pool = [primary, ...rest];
    const list: Concept[] = [];
    for (let i = 0; i < diffCfg.questionCount; i++) {
      list.push(pool[i % pool.length]);
    }
    return list;
  }, [subject.concepts, conceptId, attempts, diffCfg.questionCount]);

  const [roundIdx, setRoundIdx] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [roundStartedAt, setRoundStartedAt] = useState<number>(Date.now());
  const sessionStartRef = useRef<number>(Date.now());
  const [sessionElapsedSec, setSessionElapsedSec] = useState(0);
  const [roundRecords, setRoundRecords] = useState<SessionRoundRecord[]>([]);

  // ============================================================
  // GAME-SPECIFIC VISUAL MECHANIC STATES
  // ============================================================

  // 1. CATCH CATCH: 4 runners moving slowly across the screen (0..100%)
  const [runnerX, setRunnerX] = useState<number[]>([6, 14, 4, 11]);
  const [runnerCaughtState, setRunnerCaughtState] = useState<
    "running" | "caught" | "escaped"
  >("running");

  // 2. COPS & ROBBERS: Police & Robber positions on the street chase scene
  const [policePos, setPolicePos] = useState<number>(18);
  const [robberPos, setRobberPos] = useState<number>(52);
  const [chaseOutcome, setChaseOutcome] = useState<
    "chasing" | "caught" | "escaped"
  >("chasing");

  // 3. SIMON SAYS: Central character pose + beat timer for non-"Simon says" commands
  const [simonPose, setSimonPose] = useState<
    "idle" | "JUMP" | "CLAP" | "TURN" | "STOMP" | "stumble"
  >("idle");
  const [simonWaitProgress, setSimonWaitProgress] = useState<number>(0);

  // 4. KING: Learner progression steps toward the King's Throne (0..totalRounds)
  const [kingStep, setKingStep] = useState<number>(0);
  const [kingLastMove, setKingLastMove] = useState<
    "idle" | "forward" | "blocked"
  >("idle");

  // 5. HIDE & SEEK: Revealed hiding places & second-chance support on Simple mode
  const [openedSpots, setOpenedSpots] = useState<string[]>([]);
  const [hideSeekHintMsg, setHideSeekHintMsg] = useState<string | null>(null);
  const [hadWrongPeekThisRound, setHadWrongPeekThisRound] =
    useState<boolean>(false);

  const totalRounds = orderedConcepts.length;
  const currentConcept = orderedConcepts[roundIdx] || orderedConcepts[0];
  const mode = config.slug;

  const currentTask = useMemo(
    () =>
      buildRoundTask(mode, roundIdx, currentConcept, subject.concepts),
    [mode, roundIdx, currentConcept, subject.concepts]
  );

  // Session clock
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionElapsedSec(
        Math.floor((Date.now() - sessionStartRef.current) / 1000)
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Reset per-round states
  useEffect(() => {
    setRoundStartedAt(Date.now());
    setRunnerX([5, 13, 3, 10]);
    setRunnerCaughtState("running");
    setPolicePos(18);
    setRobberPos(50);
    setChaseOutcome("chasing");
    setSimonPose("idle");
    setSimonWaitProgress(0);
    setKingLastMove("idle");
    setOpenedSpots([]);
    setHideSeekHintMsg(null);
    setHadWrongPeekThisRound(false);
  }, [roundIdx]);

  // ============================================================
  // 1. CATCH CATCH ANIMATION LOOP (Slow, readable runner movement)
  // ============================================================
  useEffect(() => {
    if (mode !== "catch-catch" || selected) return;
    // Slow, comfortable speeds that scale gently with difficulty
    const baseSpeeds = [0.24, 0.19, 0.27, 0.21].map(
      (s) => s * diffCfg.paceMultiplier
    );
    const interval = setInterval(() => {
      setRunnerX((prev) =>
        prev.map((x, idx) => {
          const next = x + baseSpeeds[idx % baseSpeeds.length];
          // Loop gently from left if a runner reaches the far right edge
          return next > 72 ? 4 : next;
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [mode, selected, diffCfg.paceMultiplier]);

  // ============================================================
  // 2. COPS & ROBBERS AMBIENT CHASE LOOP
  // ============================================================
  useEffect(() => {
    if (mode !== "cops-robbers" || selected) return;
    const interval = setInterval(() => {
      setRobberPos((r) => {
        const next = r + 0.12 * diffCfg.paceMultiplier;
        return next > 74 ? 48 : next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [mode, selected, diffCfg.paceMultiplier]);

  // ============================================================
  // 3. SIMON SAYS AUTO-PASS TIMER WHEN "Simon says" IS OMITTED
  // ============================================================
  useEffect(() => {
    if (mode !== "simon-says" || selected) return;
    if (currentTask.simonHasPrefix) return;

    // When instruction does NOT contain "Simon says", waiting 4.5s without pressing the action counts as passing!
    const totalWaitMs = Math.round(4500 / diffCfg.paceMultiplier);
    const stepMs = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += stepMs;
      const pct = Math.min(100, Math.round((elapsed / totalWaitMs) * 100));
      setSimonWaitProgress(pct);
      if (elapsed >= totalWaitMs) {
        clearInterval(interval);
        handleCommitAnswer("DO_NOT_ACT");
      }
    }, stepMs);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mode,
    roundIdx,
    selected,
    currentTask.simonHasPrefix,
    diffCfg.paceMultiplier,
  ]);

  if (!ready) {
    return <main className="page-loading">Setting up your street game…</main>;
  }

  if (!learner || !hasGroundedContent(learner, subject)) {
    return (
      <main className="empty-state">
        <h1>Choose your subject house first.</h1>
        <Link className="black-button" href="/hub">
          Back to Learning Street →
        </Link>
      </main>
    );
  }

  function handleCommitAnswer(answer: string, forceIncorrect = false) {
    if (selected) return;
    setSelected(answer);

    const isCorrect = !forceIncorrect && answer === currentTask.correctAnswer;
    const responseTimeMs = Math.max(300, Date.now() - roundStartedAt);
    const difficultyNum =
      difficultyMode === "hard" ? 4 : difficultyMode === "intermediate" ? 2 : 1;

    // Update game-specific visual outcomes
    if (mode === "catch-catch") {
      setRunnerCaughtState(isCorrect ? "caught" : "escaped");
    } else if (mode === "cops-robbers") {
      if (isCorrect) {
        setChaseOutcome("caught");
        setPolicePos(robberPos - 4);
      } else {
        setChaseOutcome("escaped");
        setRobberPos(90);
      }
    } else if (mode === "simon-says") {
      if (isCorrect) {
        setSimonPose(
          answer === "DO_NOT_ACT"
            ? "idle"
            : (answer as "JUMP" | "CLAP" | "TURN" | "STOMP")
        );
      } else {
        setSimonPose("stumble");
      }
    } else if (mode === "king") {
      if (isCorrect) {
        setKingStep((s) => Math.min(totalRounds, s + 1));
        setKingLastMove("forward");
      } else {
        setKingStep((s) =>
          difficultyMode === "hard" ? Math.max(0, s - 1) : s
        );
        setKingLastMove("blocked");
      }
    }

    recordAttempt({
      subject: subject.name,
      conceptId: currentConcept.id,
      conceptTitle: currentConcept.title,
      game: config.slug,
      correct: isCorrect,
      responseTimeMs,
      difficulty: difficultyNum,
    });

    const newRecord: SessionRoundRecord = {
      round: roundIdx + 1,
      conceptId: currentConcept.id,
      conceptTitle: currentConcept.title,
      subjectName: subject.name,
      subjectSlug: subject.slug,
      prompt:
        mode === "simon-says"
          ? `${currentTask.prompt} (${currentConcept.title})`
          : currentTask.prompt,
      selectedAnswer:
        answer === "DO_NOT_ACT" ? "Held still (Did not perform)" : answer,
      correctAnswer:
        currentTask.correctAnswer === "DO_NOT_ACT"
          ? "Hold still (Simon didn't say!)"
          : currentTask.correctAnswer,
      correct: isCorrect,
      explanation: currentTask.explanation,
      misconception: currentTask.misconception,
      responseTimeMs,
    };

    const nextRecords = [...roundRecords, newRecord];
    setRoundRecords(nextRecords);

    if (isCorrect) {
      setXpEarned((x) => x + diffCfg.xpPerCorrect);
      setFeedback(currentTask.explanation);
    } else {
      setFeedback(
        `${currentTask.explanation} Note: ${currentTask.misconception}`
      );
    }

    const existingSession = readStudySession();
    if (existingSession) {
      saveStudySession({
        ...existingSession,
        roundResults: nextRecords,
        xpEarned: isCorrect ? xpEarned + diffCfg.xpPerCorrect : xpEarned,
      });
    }
  }

  function handleSearchHidingSpot(option: string) {
    if (selected) return;
    if (!openedSpots.includes(option)) {
      setOpenedSpots((prev) => [...prev, option]);
    }

    const isRightSpot = option === currentTask.correctAnswer;
    if (isRightSpot) {
      setHideSeekHintMsg(null);
      handleCommitAnswer(option, hadWrongPeekThisRound);
      return;
    }

    // Wrong hiding place selected!
    // On SIMPLE mode, give the user 1 opportunity to keep seeking while recording that they needed a retry
    if (difficultyMode === "simple" && !hadWrongPeekThisRound) {
      setHadWrongPeekThisRound(true);
      setHideSeekHintMsg(
        `Wrong hiding place! "${option}" was hiding here, not the answer. Try searching one more hiding spot!`
      );
      return;
    }

    setHideSeekHintMsg(null);
    handleCommitAnswer(option, true);
  }

  function handleNextRound() {
    if (roundIdx + 1 >= totalRounds) {
      const correctCount = roundRecords.filter((r) => r.correct).length;
      const totalElapsed = Math.max(
        1,
        Math.floor((Date.now() - sessionStartRef.current) / 1000)
      );

      const conceptIdsAttempted = Array.from(
        new Set(roundRecords.map((r) => r.conceptId))
      );
      let stonesCount = 0;
      for (const cid of conceptIdsAttempted) {
        const conceptRounds = roundRecords.filter((r) => r.conceptId === cid);
        if (
          conceptRounds.length > 0 &&
          conceptRounds.every((r) => r.correct)
        ) {
          stonesCount += 1;
          markConceptMastered(cid, 10);
        }
      }

      const existing = readStudySession();
      saveStudySession({
        ...(existing || {
          id: `${Date.now()}`,
          studentName: learner?.name || "Learner",
          subjectSlug: subject.slug,
          conceptId: currentConcept.id,
          selectedGame: config.slug,
          startedAt: new Date(sessionStartRef.current).toISOString(),
        }),
        selectedGame: config.slug,
        subjectSlug: subject.slug,
        conceptId: currentConcept.id,
        difficultyMode,
        sessionLengthMinutes: diffCfg.durationMinutes,
        totalPlannedQuestions: totalRounds,
        elapsedSeconds: totalElapsed,
        xpEarned,
        stonesEarned: stonesCount,
        roundResults: roundRecords,
        status: "complete",
      });

      router.push(
        ctaMap.gameResult(
          config.slug,
          subject.slug,
          currentConcept.id,
          correctCount,
          totalRounds,
          difficultyMode
        )
      );
      return;
    }

    setRoundIdx((r) => r + 1);
    setSelected(null);
    setFeedback("");
  }

  const formatClock = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const correctSoFar = roundRecords.filter((r) => r.correct).length;

  return (
    <main
      style={{
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ============================================================
          TOP NAVIGATION / SESSION PROGRESS BAR
          ============================================================ */}
      <header
        style={{
          height: 58,
          borderBottom: "1px solid #e6e8ef",
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href={`/games/intro?game=${config.slug}&subject=${subject.slug}&concept=${currentConcept.id}`}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid #d7d9df",
              fontSize: 12,
              fontWeight: 700,
              color: "#0d0e11",
              textDecoration: "none",
            }}
          >
            ← Session Mode
          </Link>
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
            {learner?.board || "CBSE"}
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
            {config.name.toUpperCase()} • {diffCfg.label} ({diffCfg.durationLabel})
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#555861" }}>
            {subject.house} — <strong>{currentConcept.title}</strong>
          </span>
        </div>

        {/* Session Progress Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {orderedConcepts.map((_, i) => {
            const rec = roundRecords[i];
            const isCurrent = i === roundIdx;
            const bg = rec
              ? rec.correct
                ? "#2b8a3e"
                : "#e03131"
              : isCurrent
                ? "#0d0e11"
                : "#dfe3ec";
            return (
              <span
                key={i}
                style={{
                  width: isCurrent ? 26 : 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: bg,
                  transition: "all 0.2s ease",
                }}
              />
            );
          })}
          <span
            style={{
              marginLeft: 8,
              fontSize: 12,
              fontWeight: 700,
              color: "#0d0e11",
            }}
          >
            Task {roundIdx + 1} / {totalRounds}
          </span>
        </div>

        {/* Live XP, Stones, Clock & Exit */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              padding: "5px 11px",
              borderRadius: 999,
              backgroundColor: "#e5f9ed",
              color: "#14532d",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            ★ {xpEarned} XP • {correctSoFar} Stones
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#555861",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ◴ {formatClock(sessionElapsedSec)}
          </span>
          <Link
            href={`/subjects/${subject.slug}`}
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#6b7079",
              textDecoration: "none",
            }}
          >
            Exit ×
          </Link>
        </div>
      </header>

      {/* ============================================================
          MAIN STAGE CONTAINER (No Scrolling)
          ============================================================ */}
      <div
        style={{
          flex: 1,
          maxWidth: 1240,
          width: "100%",
          margin: "0 auto",
          padding: "12px 28px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 10,
          overflow: "hidden",
        }}
      >
        {/* ==========================================================
            GAME 1: CATCH CATCH
            4 Playful Runner Characters moving slowly across the street
            ========================================================== */}
        {mode === "catch-catch" && (
          <>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 999,
                  backgroundColor: "#e4ebf8",
                  color: "#234bb5",
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                🏃 CATCH CATCH • Catch the runner carrying the correct answer before they get away!
              </span>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 2.2vw, 27px)",
                  fontWeight: 700,
                  color: "#0d0e11",
                }}
              >
                {currentTask.prompt}
              </h1>
            </div>

            {/* 4-Lane Street Running Environment */}
            <div
              style={{
                flex: 1,
                position: "relative",
                borderRadius: 24,
                backgroundColor: "#f7f9fc",
                border: "1px solid #e2e7f2",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                padding: "8px 24px",
              }}
            >
              {/* Street Finish / Escape Edge */}
              <div
                style={{
                  position: "absolute",
                  right: 22,
                  top: 10,
                  bottom: 10,
                  width: 26,
                  borderRadius: 8,
                  backgroundColor: "#fce7eb",
                  border: "1px dashed #e08b9d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  writingMode: "vertical-rl",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  color: "#9c2b4c",
                }}
              >
                STREET EXIT 🏁
              </div>

              {currentTask.options.map((option, i) => {
                const isSelected = selected === option;
                const isCorrect =
                  !!selected && option === currentTask.correctAnswer;
                const isWrongSelected = isSelected && !isCorrect;

                // If user selected a wrong runner, that wrong runner escapes to the right edge (84%)!
                const rawPos = runnerX[i % runnerX.length] || 10;
                const displayLeft = isWrongSelected ? 82 : Math.min(rawPos, 70);
                const lanePills = ["#e4ebf8", "#e5f9ed", "#fce7eb", "#fff3b0"];

                return (
                  <div
                    key={option}
                    style={{
                      position: "relative",
                      height: 70,
                      borderBottom:
                        i < 3 ? "1px dashed rgba(13,14,17,0.08)" : "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "#8c919c",
                        letterSpacing: "0.08em",
                      }}
                    >
                      LANE {i + 1}
                    </span>

                    <button
                      type="button"
                      disabled={!!selected}
                      onClick={() => handleCommitAnswer(option)}
                      style={{
                        position: "absolute",
                        left: `${displayLeft}%`,
                        transition: isWrongSelected
                          ? "left 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
                          : "left 0.08s linear",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "7px 18px 7px 10px",
                        borderRadius: 18,
                        border: isCorrect
                          ? "2.5px solid #2b8a3e"
                          : isWrongSelected
                            ? "2.5px solid #e03131"
                            : "1.5px solid #0d0e11",
                        backgroundColor: isCorrect
                          ? "#e5f9ed"
                          : isWrongSelected
                            ? "#ffe3e3"
                            : lanePills[i % lanePills.length],
                        color: "#0d0e11",
                        cursor: selected ? "default" : "pointer",
                        boxShadow: "0 6px 16px rgba(13, 14, 17, 0.08)",
                        zIndex: isSelected ? 5 : 2,
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 50,
                          borderRadius: 12,
                          backgroundColor: "#ffffff",
                          padding: 2,
                          flexShrink: 0,
                        }}
                      >
                        <FigmaRunnerSprite index={i} />
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <span
                          style={{
                            display: "block",
                            fontSize: 10,
                            fontWeight: 800,
                            letterSpacing: "0.06em",
                            color: isCorrect
                              ? "#14532d"
                              : isWrongSelected
                                ? "#c92a2a"
                                : "#555861",
                          }}
                        >
                          RUNNER {i + 1} →{" "}
                          {isCorrect
                            ? "CAUGHT! ✓"
                            : isWrongSelected && runnerCaughtState === "escaped"
                              ? "ESCAPED! 💨"
                              : "TAP TO CATCH"}
                        </span>
                        <strong style={{ fontSize: 15, fontWeight: 700 }}>
                          {option}
                        </strong>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ==========================================================
            GAME 2: COPS & ROBBERS
            Police chasing Robber on the street; correct answer catches
            the Robber, wrong answer lets the Robber escape!
            ========================================================== */}
        {mode === "cops-robbers" && (
          <>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 999,
                  backgroundColor: "#fce7eb",
                  color: "#9c2b4c",
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                🚔 COPS & ROBBERS • Choose the correct answer so the Police catches the Robber!
              </span>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 2.2vw, 27px)",
                  fontWeight: 700,
                  color: "#0d0e11",
                }}
              >
                {currentTask.prompt}
              </h1>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {/* Interactive Police vs Robber Street Chase Scene */}
              <div
                style={{
                  height: 145,
                  borderRadius: 22,
                  backgroundColor:
                    chaseOutcome === "caught"
                      ? "#e5f9ed"
                      : chaseOutcome === "escaped"
                        ? "#ffe3e3"
                        : "#f7f9fc",
                  border: "1px solid #e2e7f2",
                  position: "relative",
                  overflow: "hidden",
                  padding: "12px 24px",
                  transition: "background-color 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#555861",
                  }}
                >
                  <span>🚔 POLICE PATROL STATION</span>
                  <span>
                    {chaseOutcome === "caught"
                      ? "🎯 ROBBER CAUGHT BY POLICE!"
                      : chaseOutcome === "escaped"
                        ? "💨 WRONG ANSWER — ROBBER ESCAPED!"
                        : "STREET CHASE IN PROGRESS..."}
                  </span>
                  <span>🏃‍♂️ ROBBER GETAWAY ALLEY</span>
                </div>

                {/* Street Road Line */}
                <div
                  style={{
                    position: "absolute",
                    left: 24,
                    right: 24,
                    bottom: 26,
                    height: 4,
                    background:
                      "repeating-linear-gradient(to right, #cbd3e3 0 18px, transparent 18px 32px)",
                  }}
                />

                {/* Police Character */}
                <div
                  style={{
                    position: "absolute",
                    left: `${policePos}%`,
                    bottom: 18,
                    transition: "left 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 12px",
                    borderRadius: 14,
                    backgroundColor: "#e4ebf8",
                    border: "2px solid #0d0e11",
                    zIndex: 3,
                  }}
                >
                  <div style={{ width: 42, height: 48 }}>
                    <FigmaSuspectSprite index={0} />
                  </div>
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: 9,
                        fontWeight: 800,
                        color: "#234bb5",
                      }}
                    >
                      👮 POLICE
                    </span>
                    <strong style={{ fontSize: 12, color: "#0d0e11" }}>
                      {chaseOutcome === "caught" ? "Gotcha! 🚔" : "In Pursuit!"}
                    </strong>
                  </div>
                </div>

                {/* Robber Character */}
                <div
                  style={{
                    position: "absolute",
                    left: `${robberPos}%`,
                    bottom: 18,
                    transition: "left 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 12px",
                    borderRadius: 14,
                    backgroundColor:
                      chaseOutcome === "caught" ? "#e5f9ed" : "#fce7eb",
                    border: "2px solid #0d0e11",
                    zIndex: 2,
                  }}
                >
                  <div style={{ width: 42, height: 48 }}>
                    <FigmaRunnerSprite index={2} />
                  </div>
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: 9,
                        fontWeight: 800,
                        color: "#9c2b4c",
                      }}
                    >
                      🥷 ROBBER
                    </span>
                    <strong style={{ fontSize: 12, color: "#0d0e11" }}>
                      {chaseOutcome === "caught"
                        ? "Caught! 🛑"
                        : chaseOutcome === "escaped"
                          ? "Escaped! 💨"
                          : "Fleeing..."}
                    </strong>
                  </div>
                </div>
              </div>

              {/* 4 Street Checkpoints / Answers to direct the Police */}
              <div
                style={{
                  flex: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 12,
                }}
              >
                {currentTask.options.map((option, i) => {
                  const isSelected = selected === option;
                  const isCorrect =
                    !!selected && option === currentTask.correctAnswer;
                  const isWrong = isSelected && !isCorrect;
                  const checkpointLabels = [
                    " STREET CORNER A",
                    " MARKET GATE B",
                    " BANYAN LANE C",
                    " SCHOOL CROSSING D",
                  ];

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={!!selected}
                      onClick={() => handleCommitAnswer(option)}
                      style={{
                        padding: 16,
                        borderRadius: 18,
                        border: isCorrect
                          ? "2.5px solid #2b8a3e"
                          : isWrong
                            ? "2.5px solid #e03131"
                            : "1.5px solid #0d0e11",
                        backgroundColor: isCorrect
                          ? "#e5f9ed"
                          : isWrong
                            ? "#ffe3e3"
                            : "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        textAlign: "left",
                        cursor: selected ? "default" : "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: "#6b7079",
                          letterSpacing: "0.06em",
                        }}
                      >
                        📍{checkpointLabels[i % checkpointLabels.length]}
                      </span>

                      <strong
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          color: "#0d0e11",
                          margin: "8px 0",
                        }}
                      >
                        {option}
                      </strong>

                      <span
                        style={{
                          padding: "7px 10px",
                          borderRadius: 10,
                          backgroundColor: isCorrect
                            ? "#2b8a3e"
                            : isWrong
                              ? "#e03131"
                              : "#0d0e11",
                          color: "#ffffff",
                          fontSize: 11,
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                      >
                        {isCorrect
                          ? "🚔 POLICE CAUGHT ROBBER!"
                          : isWrong
                            ? "💨 ROBBER ESCAPED!"
                            : "👮 Send Police Here →"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ==========================================================
            GAME 3: SIMON SAYS
            Playful character in the centre surrounded by 4 actions:
            JUMP, CLAP, TURN, STOMP. Only act when "Simon says"!
            ========================================================== */}
        {mode === "simon-says" && (
          <>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 999,
                  backgroundColor: "#e5f9ed",
                  color: "#14532d",
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                🗣️ SIMON SAYS • Only perform the action if the instruction begins with &ldquo;Simon says&rdquo;!
              </span>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(24px, 2.8vw, 34px)",
                  fontWeight: 700,
                  color: "#0d0e11",
                }}
              >
                &ldquo;{currentTask.simonCommandText}&rdquo;
              </h1>
              <span style={{ fontSize: 12, color: "#555861" }}>
                Revising <strong>{currentConcept.title}</strong>:{" "}
                {currentConcept.explanation}
              </span>
            </div>

            {/* Radial Layout: 4 Actions (JUMP, CLAP, TURN, STOMP) around Center Character */}
            <div
              style={{
                flex: 1,
                borderRadius: 24,
                backgroundColor: "#f7f9fc",
                border: "1px solid #e2e7f2",
                padding: "14px 28px",
                display: "grid",
                gridTemplateColumns: "1fr 1.15fr 1fr",
                gap: 18,
                alignItems: "center",
              }}
            >
              {/* Left Pair of Actions: JUMP & TURN */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                {(["JUMP", "TURN"] as const).map((act) => {
                  const isSelected = selected === act;
                  const isCorrect =
                    !!selected && act === currentTask.correctAnswer;
                  const isWrong = isSelected && !isCorrect;
                  return (
                    <button
                      key={act}
                      type="button"
                      disabled={!!selected}
                      onClick={() => handleCommitAnswer(act)}
                      style={{
                        padding: "20px 22px",
                        borderRadius: 20,
                        border: isCorrect
                          ? "2.5px solid #2b8a3e"
                          : isWrong
                            ? "2.5px solid #e03131"
                            : "2px solid #0d0e11",
                        backgroundColor: isCorrect
                          ? "#e5f9ed"
                          : isWrong
                            ? "#ffe3e3"
                            : act === "JUMP"
                              ? "#e4ebf8"
                              : "#fff3b0",
                        color: "#0d0e11",
                        fontSize: 20,
                        fontWeight: 700,
                        cursor: selected ? "default" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{act === "JUMP" ? "⬆️ JUMP" : "🔄 TURN"}</span>
                      <span style={{ fontSize: 13 }}>Tap →</span>
                    </button>
                  );
                })}
              </div>

              {/* Center Playful Character + "Hold Still" Option */}
              <div
                style={{
                  height: "100%",
                  borderRadius: 22,
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #dfe3ec",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 999,
                    backgroundColor: "#f4f6fb",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#3d548f",
                  }}
                >
                  STREET PLAYER POSE: {simonPose.toUpperCase()}
                </span>

                <div
                  style={{
                    width: 110,
                    height: 120,
                    transition: "transform 0.3s ease",
                    transform:
                      simonPose === "JUMP"
                        ? "translateY(-18px) scale(1.08)"
                        : simonPose === "TURN"
                          ? "rotate(18deg) scale(1.05)"
                          : simonPose === "CLAP"
                            ? "scale(1.12)"
                            : simonPose === "STOMP"
                              ? "translateY(8px) scale(1.06)"
                              : simonPose === "stumble"
                                ? "rotate(-14deg)"
                                : "none",
                  }}
                >
                  <FigmaRunnerSprite index={1} />
                </div>

                {/* Hold Still / Don't Act button for when "Simon says" is NOT in the prompt */}
                <button
                  type="button"
                  disabled={!!selected}
                  onClick={() => handleCommitAnswer("DO_NOT_ACT")}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1.5px solid #0d0e11",
                    backgroundColor:
                      selected === "DO_NOT_ACT"
                        ? currentTask.correctAnswer === "DO_NOT_ACT"
                          ? "#e5f9ed"
                          : "#ffe3e3"
                        : "#0d0e11",
                    color: selected === "DO_NOT_ACT" ? "#0d0e11" : "#ffffff",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: selected ? "default" : "pointer",
                  }}
                >
                  ✋ Hold Still — Simon Didn&apos;t Say!
                  {!currentTask.simonHasPrefix &&
                    !selected &&
                    simonWaitProgress > 0 &&
                    ` (${100 - simonWaitProgress}%)`}
                </button>
              </div>

              {/* Right Pair of Actions: CLAP & STOMP */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                {(["CLAP", "STOMP"] as const).map((act) => {
                  const isSelected = selected === act;
                  const isCorrect =
                    !!selected && act === currentTask.correctAnswer;
                  const isWrong = isSelected && !isCorrect;
                  return (
                    <button
                      key={act}
                      type="button"
                      disabled={!!selected}
                      onClick={() => handleCommitAnswer(act)}
                      style={{
                        padding: "20px 22px",
                        borderRadius: 20,
                        border: isCorrect
                          ? "2.5px solid #2b8a3e"
                          : isWrong
                            ? "2.5px solid #e03131"
                            : "2px solid #0d0e11",
                        backgroundColor: isCorrect
                          ? "#e5f9ed"
                          : isWrong
                            ? "#ffe3e3"
                            : act === "CLAP"
                              ? "#e5f9ed"
                              : "#fce7eb",
                        color: "#0d0e11",
                        fontSize: 20,
                        fontWeight: 700,
                        cursor: selected ? "default" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{act === "CLAP" ? "👏 CLAP" : "🦶 STOMP"}</span>
                      <span style={{ fontSize: 13 }}>Tap →</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ==========================================================
            GAME 4: KING
            Learner progresses step-by-step along the Street Path
            toward the King's Throne with each correct answer!
            ========================================================== */}
        {mode === "king" && (
          <>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 999,
                  backgroundColor: "#fff3b0",
                  color: "#0d0e11",
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                👑 KING • Answer correctly to move your character forward to the King&apos;s Throne!
              </span>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 2.2vw, 27px)",
                  fontWeight: 700,
                  color: "#0d0e11",
                }}
              >
                {currentTask.prompt}
              </h1>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {/* Visual Progression Track Toward Becoming the King */}
              <div
                style={{
                  height: 145,
                  borderRadius: 22,
                  backgroundColor: "#f7f9fc",
                  border: "1px solid #e2e7f2",
                  padding: "14px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#555861",
                  }}
                >
                  <span>
                    🚶 YOUR PROGRESSION: STEP {kingStep} OF {totalRounds}
                  </span>
                  <span
                    style={{
                      color:
                        kingLastMove === "forward"
                          ? "#2b8a3e"
                          : kingLastMove === "blocked"
                            ? "#e03131"
                            : "#0d0e11",
                    }}
                  >
                    {kingLastMove === "forward"
                      ? "✓ STEPPED FORWARD TOWARD THE CROWN!"
                      : kingLastMove === "blocked"
                        ? "✕ STOPPED ON THIS STONE!"
                        : "Advance across every stone to reach the Crown!"}
                  </span>
                  <span>👑 GOAL: BECOME KING OF THE STREET</span>
                </div>

                {/* Stepping Stones from 0 to totalRounds */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${totalRounds + 1}, minmax(0, 1fr))`,
                    gap: 8,
                    alignItems: "end",
                  }}
                >
                  {Array.from({ length: totalRounds + 1 }).map((_, stepIdx) => {
                    const isLearnerHere = kingStep === stepIdx;
                    const isPassed = stepIdx < kingStep;
                    const isKingGoal = stepIdx === totalRounds;

                    return (
                      <div
                        key={stepIdx}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {/* Learner Character or Crown Above the Stone */}
                        <div
                          style={{
                            height: 52,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {isLearnerHere ? (
                            <div
                              style={{
                                width: 44,
                                height: 50,
                                transform: "translateY(-2px)",
                              }}
                            >
                              <FigmaRunnerSprite index={0} />
                            </div>
                          ) : isKingGoal ? (
                            <span style={{ fontSize: 28 }}>👑</span>
                          ) : null}
                        </div>

                        {/* Stone Block */}
                        <div
                          style={{
                            width: "100%",
                            padding: "8px 6px",
                            borderRadius: 10,
                            border: isLearnerHere
                              ? "2px solid #0d0e11"
                              : "1px solid #d5d9e2",
                            backgroundColor: isKingGoal
                              ? "#fff3b0"
                              : isLearnerHere
                                ? "#e4ebf8"
                                : isPassed
                                  ? "#e5f9ed"
                                  : "#ffffff",
                            textAlign: "center",
                            fontSize: 10,
                            fontWeight: 800,
                            color: "#0d0e11",
                          }}
                        >
                          {isKingGoal
                            ? "👑 KING"
                            : stepIdx === 0
                              ? "START"
                              : `STEP ${stepIdx}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4 Answer Choices That Drive the Learner's Movement */}
              <div
                style={{
                  flex: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 12,
                }}
              >
                {currentTask.options.map((option, i) => {
                  const isSelected = selected === option;
                  const isCorrect =
                    !!selected && option === currentTask.correctAnswer;
                  const isWrong = isSelected && !isCorrect;

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={!!selected}
                      onClick={() => handleCommitAnswer(option)}
                      style={{
                        padding: 16,
                        borderRadius: 18,
                        border: isCorrect
                          ? "2.5px solid #2b8a3e"
                          : isWrong
                            ? "2.5px solid #e03131"
                            : "1.5px solid #0d0e11",
                        backgroundColor: isCorrect
                          ? "#e5f9ed"
                          : isWrong
                            ? "#ffe3e3"
                            : "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        textAlign: "left",
                        cursor: selected ? "default" : "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: "#6b7079",
                        }}
                      >
                        STEP CHOICE {i + 1}
                      </span>

                      <strong
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          color: "#0d0e11",
                          margin: "8px 0",
                        }}
                      >
                        {option}
                      </strong>

                      <span
                        style={{
                          padding: "7px 10px",
                          borderRadius: 10,
                          backgroundColor: isCorrect
                            ? "#2b8a3e"
                            : isWrong
                              ? "#e03131"
                              : "#0d0e11",
                          color: "#ffffff",
                          fontSize: 11,
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                      >
                        {isCorrect
                          ? "👑 MOVED FORWARD +1 STEP!"
                          : isWrong
                            ? "✕ BLOCKED!"
                            : "Step Forward with This →"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ==========================================================
            GAME 5: HIDE & SEEK
            Concepts/answers are hiding around the Learning Street
            (behind a house, behind a tree, behind a wall, around a bus)
            ========================================================== */}
        {mode === "hide-seek" && (
          <>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 999,
                  backgroundColor: "#f5e8fa",
                  color: "#5f2568",
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                🙈 HIDE & SEEK • Search the street hiding places to find where the correct answer is hiding!
              </span>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 2.2vw, 27px)",
                  fontWeight: 700,
                  color: "#0d0e11",
                }}
              >
                {currentTask.prompt}
              </h1>
              {hideSeekHintMsg && (
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#c92a2a",
                  }}
                >
                  {hideSeekHintMsg}
                </div>
              )}
            </div>

            {/* Street Environment with 4 Hiding Places */}
            <div
              style={{
                flex: 1,
                borderRadius: 24,
                backgroundColor: "#f7f9fc",
                border: "1px solid #e2e7f2",
                padding: "14px 20px",
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 14,
                alignItems: "stretch",
              }}
            >
              {currentTask.options.map((option, i) => {
                const hidingPlaces = [
                  {
                    label: "Behind a House",
                    badge: "🏠 HIDING PLACE 1",
                    bg: "#e4ebf8",
                    kind: "house",
                  },
                  {
                    label: "Behind a Tree",
                    badge: "🌳 HIDING PLACE 2",
                    bg: "#e5f9ed",
                    kind: "tree",
                  },
                  {
                    label: "Behind a Wall",
                    badge: "🧱 HIDING PLACE 3",
                    bg: "#fce7eb",
                    kind: "wall",
                  },
                  {
                    label: "Around a Street Bus",
                    badge: "🚌 HIDING PLACE 4",
                    bg: "#fff3b0",
                    kind: "bus",
                  },
                ];
                const place = hidingPlaces[i % hidingPlaces.length];
                const isOpened =
                  openedSpots.includes(option) || !!selected;
                const isSelected = selected === option;
                const isCorrect =
                  !!selected && option === currentTask.correctAnswer;
                const isWrong =
                  (isSelected && !isCorrect) ||
                  (openedSpots.includes(option) &&
                    option !== currentTask.correctAnswer);

                return (
                  <div
                    key={option}
                    onClick={() => handleSearchHidingSpot(option)}
                    style={{
                      borderRadius: 20,
                      padding: 14,
                      backgroundColor: isCorrect
                        ? "#e5f9ed"
                        : isWrong
                          ? "#ffe3e3"
                          : "#ffffff",
                      border: isCorrect
                        ? "2.5px solid #2b8a3e"
                        : isWrong
                          ? "2px solid #e03131"
                          : "1.5px solid #d8dde8",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: selected ? "default" : "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Hiding Place Tag */}
                    <div
                      style={{
                        padding: "6px 10px",
                        borderRadius: 10,
                        backgroundColor: place.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: "#0d0e11",
                        }}
                      >
                        {place.badge}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#555861",
                        }}
                      >
                        {place.label}
                      </span>
                    </div>

                    {/* Visual Street Object + Hidden Concept */}
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px 6px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: 74,
                          marginBottom: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transform: isOpened
                            ? "translateX(-10px) scale(0.92)"
                            : "scale(1)",
                          transition: "transform 0.28s ease",
                        }}
                      >
                        {place.kind === "house" && (
                          <FigmaHouseArt subjectId="biology" />
                        )}
                        {place.kind === "bus" && <FigmaSchoolBusArt />}
                        {place.kind === "tree" && (
                          <div
                            style={{
                              width: 68,
                              height: 68,
                              borderRadius: "50%",
                              backgroundColor: "#b8dc96",
                              border: "3px solid #5c8038",
                              display: "grid",
                              placeItems: "center",
                              fontSize: 30,
                            }}
                          >
                            🌳
                          </div>
                        )}
                        {place.kind === "wall" && (
                          <div
                            style={{
                              width: 96,
                              height: 56,
                              borderRadius: 10,
                              background:
                                "repeating-linear-gradient(0deg, #d99b82 0 12px, #f4e6dc 12px 15px)",
                              border: "2px solid #8c5843",
                              display: "grid",
                              placeItems: "center",
                              fontSize: 22,
                            }}
                          >
                            🧱
                          </div>
                        )}
                      </div>

                      {/* Hidden Concept Peeking From Behind the Object */}
                      <div
                        style={{
                          padding: "8px 12px",
                          borderRadius: 12,
                          backgroundColor: isOpened ? "#ffffff" : "#f4f6fb",
                          border: "1px dashed #aeb5c4",
                          width: "100%",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            fontSize: 9,
                            fontWeight: 800,
                            color: "#6b7079",
                            marginBottom: 2,
                          }}
                        >
                          {isOpened ? "REVEALED:" : "HIDING HERE:"}
                        </span>
                        <strong
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#0d0e11",
                          }}
                        >
                          {option}
                        </strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!!selected}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSearchHidingSpot(option);
                      }}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: 10,
                        border: "none",
                        backgroundColor: isCorrect
                          ? "#2b8a3e"
                          : isWrong
                            ? "#e03131"
                            : "#0d0e11",
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: selected ? "default" : "pointer",
                      }}
                    >
                      {isCorrect
                        ? "🎉 CONCEPT FOUND!"
                        : isWrong
                          ? "✕ WRONG HIDING PLACE"
                          : `🔍 Search ${place.label} →`}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ============================================================
            IMMEDIATE FEEDBACK & NEXT QUESTION BAR
            ============================================================ */}
        <div
          style={{
            minHeight: 58,
            borderRadius: 16,
            padding: "9px 18px",
            backgroundColor: selected
              ? roundRecords[roundRecords.length - 1]?.correct
                ? "#e5f9ed"
                : "#fff3cd"
              : "#f7f9fc",
            border: "1px solid #e4e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexShrink: 0,
          }}
        >
          {selected ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: roundRecords[roundRecords.length - 1]
                      ?.correct
                      ? "#2b8a3e"
                      : "#d9480f",
                    color: "#ffffff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {roundRecords[roundRecords.length - 1]?.correct ? "✓" : "!"}
                </span>
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: 13,
                      color: "#0d0e11",
                    }}
                  >
                    {roundRecords[roundRecords.length - 1]?.correct
                      ? `Correct! (+${diffCfg.xpPerCorrect} XP earned)`
                      : "Recorded for revision:"}
                  </strong>
                  <span style={{ fontSize: 12, color: "#2d3139" }}>
                    {feedback}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextRound}
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: "none",
                  backgroundColor: "#0d0e11",
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {roundIdx + 1 >= totalRounds
                  ? "Complete Game & View Summary →"
                  : "Next Question →"}
              </button>
            </>
          ) : (
            <>
              <span style={{ fontSize: 12, color: "#555861" }}>
                <strong>Street Game Rule:</strong> Every move directly affects
                the game on screen and updates your revision summary.
              </span>
              <Link
                href={`/ai-screen?q=${encodeURIComponent(
                  `Explain ${currentConcept.title}`
                )}`}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#3d548f",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Need a hint? Ask AI Aunty →
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
