"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StreetShell } from "@/components/StreetShell";
import { FigmaHouseArt, FigmaSubjectMotifBadge } from "@/components/FigmaArt";
import { useLearning } from "@/components/LearningProvider";
import { getSubjectsForClass } from "@/lib/curriculum";

export default function Subjects() {
  const router = useRouter();
  const { learner, progress, addSubjectHouse } = useLearning();

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

  return (
    <StreetShell bg="#ffffff" backHref="/hub" backLabel="Back to Street">
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
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
              LEARNING STREET HOUSES • CLASS {classLevel} •{" "}
              {board === "ICSE" ? "ICSE (CISCE)" : "CBSE (NCERT)"}
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(26px, 2.8vw, 36px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0d0e11",
              }}
            >
              Subject Houses
            </h1>
          </div>

          <p style={{ margin: 0, fontSize: 14, color: "#555861" }}>
            Click any house to step inside and revise its Hopscotch concepts.
          </p>
        </div>

        {/* Subject Houses Grid (Preserving House Metaphor: Artwork + Subject + Progress + Available Learning + Action) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 20,
          }}
        >
          {allSubjects.map((subj) => {
            const isBuilt = enrolledIds.includes(subj.id);
            const concepts = subj.chapters.flatMap((c) => c.concepts);
            const done = concepts.filter((c) =>
              progress.masteredConcepts.includes(c.id)
            ).length;
            const pct =
              concepts.length > 0
                ? Math.round((done / concepts.length) * 100)
                : 0;

            return (
              <div
                key={subj.id}
                onClick={() => router.push(`/subjects/${subj.slug}`)}
                style={{
                  padding: "16px 18px 20px",
                  borderRadius: 22,
                  backgroundColor: isBuilt ? "#ffffff" : "#fafbfc",
                  border: isBuilt ? "1px solid #e6e8ee" : "1.5px dashed #cfd4dc",
                  boxShadow: isBuilt
                    ? "0 8px 26px rgba(15, 23, 42, 0.04)"
                    : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                {/* Dominant House Artwork (Single House + Single Integrated Icon) */}
                <div style={{ height: 165 }}>
                  <FigmaHouseArt subjectId={subj.id} />
                </div>

                {/* Cohesive Subject + Progress + Available Learning + Action Group */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
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
                      {subj.name}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#0d0e11",
                      }}
                    >
                      {pct}% Mastered
                    </span>
                  </div>

                  <h2
                    style={{
                      margin: "0 0 4px",
                      fontSize: 19,
                      fontWeight: 700,
                      color: "#0d0e11",
                    }}
                  >
                    {subj.houseName}
                  </h2>

                  <p
                    style={{
                      margin: "0 0 12px",
                      fontSize: 13,
                      color: "#555861",
                    }}
                  >
                    {concepts.length} concepts across {subj.chapters.length}{" "}
                    {subj.chapters.length === 1 ? "chapter" : "chapters"}
                  </p>

                  <div
                    style={{
                      height: 6,
                      borderRadius: 999,
                      backgroundColor: "#eef0f4",
                      overflow: "hidden",
                      marginBottom: 14,
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

                  <div
                    style={{ display: "flex", gap: 8 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      href={`/subjects/${subj.slug}`}
                      style={{
                        flex: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: 12,
                        backgroundColor: "#0d0e11",
                        color: "#ffffff",
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      <span>Enter House</span>
                      <span>→</span>
                    </Link>

                    {!isBuilt && (
                      <button
                        type="button"
                        onClick={() => addSubjectHouse(subj.id)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 12,
                          backgroundColor: "#e5ecf9",
                          color: "#1e293b",
                          border: "none",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StreetShell>
  );
}
