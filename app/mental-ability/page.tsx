"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StreetShell } from "@/components/StreetShell";
import { useLearning } from "@/components/LearningProvider";

const RIDDLES = [
  {
    id: "ma-1",
    category: "NUMBER PATTERN",
    question:
      "The Hopscotch stones on Learning Street are numbered 2, 6, 12, 20, 30, __. Which number comes next?",
    options: ["38", "40", "42", "44"],
    correctIndex: 2,
    explanation:
      "The differences between stones are +4, +6, +8, +10, so the next step adds +12: 30 + 12 = 42.",
  },
  {
    id: "ma-2",
    category: "DIRECTION SENSE",
    question:
      "Aarav walks 40m North from the Maths House, turns right and walks 30m to the Biology House. How far is he straight-line from the Maths House?",
    options: ["50m", "60m", "70m", "45m"],
    correctIndex: 0,
    explanation:
      "By the 3-4-5 right triangle rule: √(40² + 30²) = 50m.",
  },
  {
    id: "ma-3",
    category: "ODD ONE OUT",
    question:
      "Three of these street shapes share a property. Which one is the Odd One Out?",
    options: ["Cube", "Sphere", "Square", "Cylinder"],
    correctIndex: 2,
    explanation:
      "Square is a flat 2D shape, whereas Cube, Sphere, and Cylinder are 3D solids.",
  },
];

export default function MentalAbilityPage() {
  const { recordGameResult } = useLearning();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const current = RIDDLES[idx];

  const handleSelect = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    if (optIdx === current.correctIndex) {
      recordGameResult({
        title: `Mental Ability: ${current.category}`,
        score: "1/1",
        xpEarned: 15,
        correct: 1,
        total: 1,
      });
    }
  };

  return (
    <StreetShell bg="#ffffff" backHref="/hub" backLabel="Back to Street">
      {/* Matches Figma mental-ability.svg: Left content + CTA, Right isometric Cow */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 36,
          alignItems: "center",
          padding: "16px 0",
        }}
      >
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
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            MENTAL ABILITY • {current.category}
          </span>

          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0d0e11",
            }}
          >
            Mental Ability
          </h1>

          <p
            style={{
              margin: "0 0 20px",
              fontSize: 14,
              color: "#555861",
              lineHeight: 1.5,
            }}
          >
            Logic puzzles, patterns &amp; number riddles on Learning Street.
          </p>

          {/* Interactive Riddle Group */}
          <div
            style={{
              padding: "20px 22px",
              borderRadius: 20,
              backgroundColor: "#f7f9fc",
              border: "1px solid #e4e8f0",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 16,
                fontWeight: 700,
                color: "#0d0e11",
                lineHeight: 1.4,
              }}
            >
              {current.question}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {current.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect =
                  selected !== null && i === current.correctIndex;
                const isWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={selected !== null}
                    onClick={() => handleSelect(i)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: isCorrect
                        ? "1.5px solid #166534"
                        : isWrong
                          ? "1.5px solid #991b1b"
                          : "1px solid #d5d8e0",
                      backgroundColor: isCorrect
                        ? "#dcfce7"
                        : isWrong
                          ? "#fee2e2"
                          : "#ffffff",
                      color: "#0d0e11",
                      fontSize: 14,
                      fontWeight: 600,
                      textAlign: "left",
                      cursor: selected !== null ? "default" : "pointer",
                    }}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  fontSize: 13,
                  color: "#333740",
                }}
              >
                <span>{current.explanation}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setIdx((p) => (p + 1) % RIDDLES.length);
                  }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    border: "none",
                    backgroundColor: "#0d0e11",
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Next Riddle →
                </button>
              </div>
            )}
          </div>

          <Link
            href="/saa-boo-three?subject=mathematics&from=/mental-ability"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 26px",
              borderRadius: 14,
              backgroundColor: "#0d0e11",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <span>Let’s Revise!</span>
            <span>→</span>
          </Link>
        </div>

        {/* Right: Figma Isometric Cow Illustration */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/figma/assets/mental-ability-img-0.png"
            alt="Mental Ability Cow"
            style={{
              width: "100%",
              maxWidth: 360,
              maxHeight: 360,
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </StreetShell>
  );
}
