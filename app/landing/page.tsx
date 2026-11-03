"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StreetShell } from "@/components/StreetShell";
import { FigmaStreetScene } from "@/components/FigmaArt";
import { useLearning } from "@/components/LearningProvider";

const tourSteps = [
  {
    title: "1. Welcome to Learning Street!",
    tag: "STREET PHILOSOPHY",
    desc: "Learning isn't boring worksheets or rigid tests. On Learning Street, revision is an active village playground where you learn with curiosity, joy, and freedom.",
    highlight: "🏘️ Every learner builds and personalizes their own street.",
  },
  {
    title: "2. Subjects Become Houses",
    tag: "KNOWLEDGE HOMES",
    desc: "Science, Mathematics, English, and more exist as distinct houses along the street. Step inside any house to study its rooms and concepts.",
    highlight: "📐 Maths House, 🌿 Biology House, and 📖 English House are waiting.",
  },
  {
    title: "3. Concepts Live Inside Subjects",
    tag: "STEPPING STONES",
    desc: "Inside every subject house, concepts are arranged as hopscotch stepping stones. Master one concept to unlock the next step in the journey.",
    highlight: "✨ Earn mastery badges from Roots to Flowers and Fractions to Algebra.",
  },
  {
    title: "4. Revision Happens Through Games",
    tag: "VILLAGE GAMES",
    desc: "Play energetic childhood street games: Catch-Catch runners, Cops & Robbers chasers, Simon Says, King, and Hide & Seek!",
    highlight: "🎮 Real movement, real choices, and instant helpful explanations.",
  },
  {
    title: "5. Progress Moves Through the Street",
    tag: "HOPSCOTCH & TELEPHONE",
    desc: "Every question answered adds live XP and lights up your telephone poles and hopscotch tiles.",
    highlight: "📈 Hopscotch 1–6 steps and powerlines update dynamically as you learn.",
  },
  {
    title: "6. AI Aunty Is Always Here to Help",
    tag: "STREET MENTOR",
    desc: "Whenever you get stuck or want a friendly hint, AI Aunty sits right on the street corner ready to explain concepts in warm, simple language.",
    highlight: "👩‍🏫 Contextual hints, patient analogies, and encouraging advice.",
  },
];

export default function Landing() {
  const router = useRouter();
  const { learner } = useLearning();
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const currentStep = tourSteps[tourStep];

  return (
    <StreetShell bg="#ffffff">
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 36,
          alignItems: "center",
          padding: "12px 0",
        }}
      >
        {/* Left: Figma Welcome & Landing Typography + Tour & Get Started Actions */}
        <div>
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: 6,
              backgroundColor: "#e5f9ed",
              color: "#14532d",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ✦ LEARNING STREET • CLASS 5 &amp; 6
          </span>

          <h1
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(34px, 3.8vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.06,
              color: "#0d0e11",
            }}
          >
            Where every subject is a house &amp; revision is a street game.
          </h1>

          <p
            style={{
              margin: "0 0 24px",
              fontSize: 15,
              lineHeight: 1.6,
              color: "#555861",
              maxWidth: 520,
            }}
          >
            Step inside the Biology, Maths, or English House, hop across 1–6 concept stones, flip your hand on{" "}
            <strong>Saa-Boo-Three</strong>, and ask AI Aunty whenever you need a friendly explanation.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            <Link
              href={learner ? "/hub" : "/onboarding"}
              style={{
                padding: "14px 26px",
                borderRadius: 14,
                backgroundColor: "#0d0e11",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {learner ? `Enter ${learner.name}’s Street →` : "Get Started →"}
            </Link>

            <button
              type="button"
              onClick={() => {
                setTourStep(0);
                setTourOpen(true);
              }}
              style={{
                padding: "14px 24px",
                borderRadius: 14,
                border: "none",
                backgroundColor: "#e4ebf8",
                color: "#0d0e11",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Continue the Tour
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: 24,
              paddingTop: 18,
              borderTop: "1px solid #eceef2",
              fontSize: 13,
              color: "#555861",
            }}
          >
            <span>🏠 Subject Houses</span>
            <span>✋ Saa-Boo-Three Games</span>
            <span>👩‍🏫 AI Study Aunty</span>
          </div>
        </div>

        {/* Right: Dominant Figma Learning Street Illustration */}
        <div style={{ height: 460 }}>
          <FigmaStreetScene />
        </div>
      </div>

      {/* Interactive 6-Step Tour Modal */}
      {tourOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(17, 18, 20, 0.55)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 24,
              padding: 32,
              maxWidth: 520,
              width: "100%",
              boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  backgroundColor: "#e5ebf9",
                  color: "#284386",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {currentStep.tag}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#6b7079" }}>
                STEP {tourStep + 1} OF {tourSteps.length}
              </span>
            </div>

            <h2 style={{ margin: "0 0 10px", fontSize: 24, fontWeight: 700 }}>
              {currentStep.title}
            </h2>
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 14,
                lineHeight: 1.6,
                color: "#555861",
              }}
            >
              {currentStep.desc}
            </p>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                backgroundColor: "#f7f8fa",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 22,
              }}
            >
              {currentStep.highlight}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => setTourOpen(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#6b7079",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Skip Tour
              </button>

              <div style={{ display: "flex", gap: 10 }}>
                {tourStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setTourStep((s) => s - 1)}
                    style={{
                      padding: "10px 16px",
                      borderRadius: 10,
                      border: "1px solid #d5d8e0",
                      backgroundColor: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Previous
                  </button>
                )}
                {tourStep < tourSteps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setTourStep((s) => s + 1)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 10,
                      border: "none",
                      backgroundColor: "#0d0e11",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setTourOpen(false);
                      router.push("/onboarding");
                    }}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 10,
                      border: "none",
                      backgroundColor: "#0d0e11",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Start Learning →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </StreetShell>
  );
}
