"use client";

import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { StreetShell } from "@/components/StreetShell";
import { FigmaAiAuntyArt } from "@/components/FigmaArt";
import { useLearning } from "@/components/LearningProvider";
import { getSubjectsForClass } from "@/lib/curriculum";
import { readStudySession, type SessionRoundRecord } from "@/lib/study-session";

interface ChatMessage {
  role: "aunty" | "student";
  text: string;
  relatedLink?: { label: string; href: string };
}

interface WeakConceptGroup {
  conceptId: string;
  conceptTitle: string;
  subjectSlug: string;
  subjectName: string;
  mistakes: number;
  wrongRounds: SessionRoundRecord[];
}

export default function AiScreenPage() {
  const { learner, attempts, markConceptMastered } = useLearning();
  const classLevel = learner?.classLevel || Number(learner?.grade) || 6;
  const board = learner?.board || "CBSE";
  const firstName = learner?.name?.split(" ")[0] || "beta";
  const allSubjects = useMemo(
    () => getSubjectsForClass(classLevel, board),
    [classLevel, board]
  );

  const allConcepts = useMemo(
    () =>
      allSubjects.flatMap((s) =>
        s.chapters.flatMap((ch) =>
          ch.concepts.map((c) => ({
            ...c,
            subjectId: s.id,
            subjectSlug: s.slug,
            subjectName: s.name,
            houseName: s.houseName,
            chapterTitle: ch.title,
          }))
        )
      ),
    [allSubjects]
  );

  const [weakConcepts, setWeakConcepts] = useState<WeakConceptGroup[]>([]);
  const [revisedIds, setRevisedIds] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "aunty",
      text: `Yes ${firstName}, how can I help you today? Ask me about any concept from your Biology, Maths, English, or History House and I’ll explain it step-by-step.`,
    },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const reviseSingleWeakConcept = (group: WeakConceptGroup) => {
    const matched = allConcepts.find(
      (c) =>
        c.id === group.conceptId ||
        c.title.toLowerCase() === group.conceptTitle.toLowerCase()
    );
    const sampleWrong = group.wrongRounds[0];

    const breakdownLines = [
      `Let’s revise "${group.conceptTitle}" (${group.subjectName}) together, ${firstName}!`,
      sampleWrong
        ? `\n1. What tripped you up in the game:\nTask: "${sampleWrong.prompt}"\n• Your choice: "${sampleWrong.selectedAnswer}"\n• Correct answer: "${sampleWrong.correctAnswer}"`
        : "",
      matched
        ? `\n2. Core Concept Step-by-Step:\n• ${matched.keyFacts.join("\n• ")}`
        : sampleWrong
          ? `\n2. Explanation:\n${sampleWrong.explanation}\nWatch out for: ${sampleWrong.misconception}`
          : "",
    ]
      .filter(Boolean)
      .join("\n");

    setMessages((prev) => [
      ...prev,
      {
        role: "student",
        text: `Help me revise ${group.conceptTitle} (${group.mistakes} ${
          group.mistakes === 1 ? "mistake" : "mistakes"
        })`,
      },
      {
        role: "aunty",
        text: breakdownLines,
        relatedLink: {
          label: `Practise ${group.conceptTitle} in a Game →`,
          href: `/saa-boo-three?subject=${group.subjectSlug}&concept=${group.conceptId}&from=/ai-screen`,
        },
      },
    ]);

    if (!revisedIds.includes(group.conceptId)) {
      setRevisedIds((prev) => [...prev, group.conceptId]);
      markConceptMastered(group.conceptId, 5);
    }
  };

  const reviseAllWeakConcepts = (groups: WeakConceptGroup[]) => {
    if (!groups.length) return;
    const summaryBlocks = groups.map((g, idx) => {
      const matched = allConcepts.find((c) => c.id === g.conceptId);
      const sample = g.wrongRounds[0];
      return `${idx + 1}. ${g.conceptTitle} (${g.mistakes} ${
        g.mistakes === 1 ? "mistake" : "mistakes"
      }):\n• Key Idea: ${
        matched?.summary || sample?.explanation || "Review the core rule."
      }\n• Common Mix-up to Avoid: ${
        sample?.misconception || matched?.keyFacts[2] || ""
      }`;
    });

    setMessages((prev) => [
      ...prev,
      {
        role: "student",
        text: `Yes, please revise ${groups
          .map((g) => g.conceptTitle)
          .join(" and ")} with me!`,
      },
      {
        role: "aunty",
        text: `Here is your step-by-step revision guide for the concepts from your game session:\n\n${summaryBlocks.join(
          "\n\n"
        )}`,
        relatedLink: {
          label: `Play another round on ${groups[0].subjectName} →`,
          href: `/saa-boo-three?subject=${groups[0].subjectSlug}&concept=${groups[0].conceptId}&from=/ai-screen`,
        },
      },
    ]);

    groups.forEach((g) => markConceptMastered(g.conceptId, 5));
    setRevisedIds(groups.map((g) => g.conceptId));
  };

  const answerPrompt = (rawPrompt: string) => {
    const prompt = rawPrompt.trim();
    if (!prompt) return;

    const lower = prompt.toLowerCase();
    const matched = allConcepts.find(
      (c) =>
        lower.includes(c.title.toLowerCase()) ||
        c.title
          .toLowerCase()
          .split(/\s+/)
          .some((w) => w.length > 3 && lower.includes(w)) ||
        c.summary.toLowerCase().includes(lower)
    );

    let replyText = "";
    let relatedLink: { label: string; href: string } | undefined;

    if (matched) {
      replyText = `${matched.title} (${matched.houseName}):\n${matched.summary}\n\n• ${matched.keyFacts.join("\n• ")}`;
      relatedLink = {
        label: `Revise ${matched.title} →`,
        href: `/saa-boo-three?subject=${matched.subjectSlug}&concept=${matched.id}&from=/ai-screen`,
      };
    } else if (lower.includes("mistake") || lower.includes("repeat")) {
      if (weakConcepts.length > 0) {
        reviseAllWeakConcepts(weakConcepts);
        return;
      }
      const pick = allConcepts[0];
      replyText = `Let’s review "${pick.title}" from ${pick.houseName}: ${pick.summary}\nRemember: ${pick.keyFacts[2] || pick.keyFacts[0]}`;
      relatedLink = {
        label: `Visit ${pick.houseName} →`,
        href: `/subjects/${pick.subjectSlug}`,
      };
    } else {
      const sampleList = allConcepts
        .slice(0, 6)
        .map((c) => c.title)
        .join(", ");
      replyText = `I can help explain any concept from your street houses — try asking about: ${sampleList}.`;
    }

    setMessages((prev) => [
      ...prev,
      { role: "student", text: prompt },
      { role: "aunty", text: replyText, relatedLink },
    ]);
  };

  // Load wrong answers from the latest study session or attempts automatically
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const session = readStudySession();
    const rounds = session?.roundResults || [];
    const wrongRounds = rounds.filter((r) => !r.correct);

    const groupedMap = new Map<string, WeakConceptGroup>();
    for (const r of wrongRounds) {
      const existing = groupedMap.get(r.conceptId);
      if (existing) {
        existing.mistakes += 1;
        existing.wrongRounds.push(r);
      } else {
        groupedMap.set(r.conceptId, {
          conceptId: r.conceptId,
          conceptTitle: r.conceptTitle,
          subjectSlug: r.subjectSlug || session?.subjectSlug || "science",
          subjectName: r.subjectName || "Science",
          mistakes: 1,
          wrongRounds: [r],
        });
      }
    }

    // Also check recent failed attempts if session had none
    if (groupedMap.size === 0 && attempts.length > 0) {
      const failedAttempts = attempts.filter((a) => !a.correct).slice(0, 4);
      for (const a of failedAttempts) {
        const matched = allConcepts.find((c) => c.id === a.conceptId);
        const existing = groupedMap.get(a.conceptId);
        if (existing) {
          existing.mistakes += 1;
        } else {
          groupedMap.set(a.conceptId, {
            conceptId: a.conceptId,
            conceptTitle: a.conceptTitle,
            subjectSlug: matched?.subjectSlug || "science",
            subjectName: a.subject,
            mistakes: 1,
            wrongRounds: [],
          });
        }
      }
    }

    const groups = Array.from(groupedMap.values());
    setWeakConcepts(groups);

    if (groups.length > 0) {
      const namesList = groups.map((g) => g.conceptTitle).join(" and ");
      setMessages([
        {
          role: "aunty",
          text: `AI Aunty noticed you struggled with ${namesList}. Would you like to revise these concepts? Click a concept below or "Revise All Weak Concepts" and I’ll walk you through what went wrong step-by-step!`,
        },
      ]);
    } else if (q) {
      answerPrompt(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allConcepts.length]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const q = input;
    setInput("");
    answerPrompt(q);
  };

  return (
    <StreetShell bg="#ffffff" backHref="/hub" backLabel="Back to Street">
      <div
        style={{
          maxWidth: "100%",
          width: "100%",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: "4px 0",
        }}
      >
        {/* Top Row: Figma AI Aunty Greeting + Automatic Weak Concepts Context */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: weakConcepts.length > 0 ? "0.9fr 1.1fr" : "1fr",
            gap: 20,
            alignItems: "center",
            padding: "16px 22px",
            borderRadius: 22,
            backgroundColor: "#f7f9fc",
            border: "1px solid #e4e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 120, height: 95, flexShrink: 0 }}>
              <FigmaAiAuntyArt />
            </div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "3px 9px",
                  borderRadius: 6,
                  backgroundColor: "#e5f9ed",
                  color: "#14532d",
                  fontSize: 10,
                  fontWeight: 800,
                  marginBottom: 4,
                }}
              >
                NEIGHBOURHOOD MENTOR
              </span>
              <h1
                style={{
                  margin: "0 0 4px",
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#0d0e11",
                }}
              >
                Ask AI Aunty
              </h1>
              <p style={{ margin: 0, fontSize: 13, color: "#555861" }}>
                Step-by-step explanations and guided revision for your wrong
                answers.
              </p>
            </div>
          </div>

          {/* Automatic Weak Concepts Revision Box (Populated from Game Session) */}
          {weakConcepts.length > 0 && (
            <div
              style={{
                padding: "14px 16px",
                borderRadius: 16,
                backgroundColor: "#ffffff",
                border: "1.5px solid #0d0e11",
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
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    color: "#9c2b4c",
                  }}
                >
                  ★ SESSION WRONG ANSWERS LOADED
                </span>
                <button
                  type="button"
                  onClick={() => reviseAllWeakConcepts(weakConcepts)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#0d0e11",
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Revise All Weak Concepts →
                </button>
              </div>

              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#0d0e11",
                }}
              >
                AI Aunty noticed you struggled with{" "}
                <strong>
                  {weakConcepts.map((w) => w.conceptTitle).join(" and ")}
                </strong>
                . Would you like to revise these concepts?
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {weakConcepts.map((w) => {
                  const isDone = revisedIds.includes(w.conceptId);
                  return (
                    <button
                      key={w.conceptId}
                      type="button"
                      onClick={() => reviseSingleWeakConcept(w)}
                      style={{
                        padding: "7px 12px",
                        borderRadius: 10,
                        border: "1px solid #d5d8e0",
                        backgroundColor: isDone ? "#e5f9ed" : "#fce7eb",
                        color: "#0d0e11",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {isDone ? "✓ " : "↻ "}
                      {w.conceptTitle} ({w.mistakes}{" "}
                      {w.mistakes === 1 ? "mistake" : "mistakes"}) →
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Center Figma Prompt Bar */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            gap: 10,
            padding: "7px 10px 7px 18px",
            borderRadius: 999,
            border: "1px solid #6b7079",
            backgroundColor: "#ffffff",
            boxSizing: "border-box",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Aunty any question or click a concept above to revise..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "#111",
              backgroundColor: "transparent",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "9px 22px",
              borderRadius: 999,
              border: "none",
              backgroundColor: "#0d0e11",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Ask →
          </button>
        </form>

        {/* Two Figma Action Pills */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            width: "100%",
          }}
        >
          <button
            type="button"
            onClick={() =>
              answerPrompt(
                `Explain ${
                  weakConcepts[0]?.conceptTitle ||
                  allConcepts[0]?.title ||
                  "Roots"
                } in more depth with examples`
              )
            }
            style={{
              padding: "11px 16px",
              borderRadius: 14,
              border: "1px solid #e4e8f0",
              backgroundColor: "#f7f9fc",
              color: "#0d0e11",
              fontSize: 13,
              fontWeight: 600,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Explain{" "}
            {weakConcepts[0]?.conceptTitle ||
              allConcepts[0]?.title ||
              "a concept"}{" "}
            in more depth with examples →
          </button>

          <button
            type="button"
            onClick={() => answerPrompt("Review my repeated mistakes")}
            style={{
              padding: "11px 16px",
              borderRadius: 14,
              border: "1px solid #e4e8f0",
              backgroundColor: "#f7f9fc",
              color: "#0d0e11",
              fontSize: 13,
              fontWeight: 600,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Review your repeated mistakes from today&apos;s session →
          </button>
        </div>

        {/* Conversation Thread */}
        <div
          ref={listRef}
          style={{
            width: "100%",
            maxHeight: 245,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "4px 2px",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.role === "student" ? "flex-end" : "flex-start",
                maxWidth: "88%",
                padding: "12px 16px",
                borderRadius: 16,
                backgroundColor:
                  m.role === "student" ? "#0d0e11" : "#e4ebf8",
                color: m.role === "student" ? "#ffffff" : "#0d0e11",
                fontSize: 13,
                lineHeight: 1.5,
                whiteSpace: "pre-line",
              }}
            >
              <strong
                style={{
                  display: "block",
                  fontSize: 11,
                  marginBottom: 4,
                  opacity: 0.75,
                }}
              >
                {m.role === "aunty" ? "AI Aunty" : firstName}
              </strong>
              <div>{m.text}</div>
              {m.relatedLink && (
                <Link
                  href={m.relatedLink.href}
                  style={{
                    display: "inline-block",
                    marginTop: 8,
                    padding: "7px 14px",
                    borderRadius: 8,
                    backgroundColor: "#0d0e11",
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {m.relatedLink.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </StreetShell>
  );
}
