"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLearning } from "@/components/LearningProvider";
import { getSubjectsForClass } from "@/lib/curriculum";

export function FigmaHeader({
  backHref,
  backLabel,
}: {
  backHref?: string;
  backLabel?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { learner, saveLearner } = useLearning();
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const classLevel = learner?.classLevel || Number(learner?.grade) || 6;
  const board = learner?.board || "CBSE";
  const subjects = useMemo(
    () => getSubjectsForClass(classLevel, board),
    [classLevel, board]
  );

  // PAIN POINT 2 — DIRECT TOPIC DISCOVERY:
  // Even before typing, focusing the search bar surfaces quick-jump topics with 1-click "Revise Now"
  const discoveryItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const items: {
      label: string;
      sub: string;
      stoneHref: string;
      reviseHref: string;
    }[] = [];

    for (const s of subjects) {
      for (const ch of s.chapters) {
        for (const c of ch.concepts) {
          const matchesQuery =
            !q ||
            c.title.toLowerCase().includes(q) ||
            c.summary.toLowerCase().includes(q) ||
            s.name.toLowerCase().includes(q) ||
            s.houseName.toLowerCase().includes(q) ||
            ch.title.toLowerCase().includes(q);

          if (matchesQuery) {
            items.push({
              label: c.title,
              sub: `${s.houseName.replace(/^The\s+/i, "")} (${s.name}) • ${ch.title}`,
              stoneHref: `/subjects/${s.slug}?concept=${c.id}`,
              reviseHref: `/saa-boo-three?subject=${s.slug}&concept=${c.id}&from=${pathname || "/hub"}`,
            });
          }
        }
      }
    }
    return items.slice(0, 7);
  }, [searchQuery, subjects, pathname]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (discoveryItems.length > 0) {
      router.push(discoveryItems[0].reviseHref);
      setFocused(false);
      return;
    }
    router.push("/subjects");
    setFocused(false);
  };

  const handleGradeChange = (newGrade: string) => {
    if (!learner) return;
    saveLearner({
      ...learner,
      grade: newGrade,
      classLevel: Number(newGrade),
    });
  };

  const handleBoardChange = (newBoard: string) => {
    if (!learner) return;
    saveLearner({
      ...learner,
      board: newBoard,
    });
  };

  return (
    <header
      style={{
        width: "100%",
        maxWidth: 1360,
        margin: "0 auto",
        padding: "12px 32px",
        borderBottom: "1px solid #e6e7ec",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        backgroundColor: "#ffffff",
        fontFamily: "'DM Sans', sans-serif",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      {/* Left: Home Icon + Back Arrow + Direct Topic Discovery Search + Persistent Class/Board Context */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flex: "1 1 520px",
        }}
      >
        <Link
          href={learner ? "/hub" : "/landing"}
          title="Learning Street Home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            borderRadius: 8,
            flexShrink: 0,
          }}
        >
          <img
            src="/figma/home-icon.svg"
            alt="Home"
            style={{ width: 22, height: 22, display: "block" }}
          />
        </Link>

        {backHref && (
          <Link
            href={backHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 13,
              fontWeight: 600,
              color: "#333",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 16 }}>‹</span> {backLabel || "Back"}
          </Link>
        )}

        {/* PAIN POINT 2: Direct Topic Discovery & 1-Click Revision Search */}
        <div style={{ position: "relative", width: "100%", maxWidth: 340 }}>
          <form onSubmit={onSearchSubmit}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: 38,
                padding: "0 14px",
                borderRadius: 999,
                border: focused ? "1.5px solid #0d0e11" : "1px solid #6b7079",
                backgroundColor: "#ffffff",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7a7f87"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                value={searchQuery}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Jump to any Class ${classLevel} ${board} topic...`}
                aria-label="Direct topic discovery search"
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: 12.5,
                  color: "#111",
                  backgroundColor: "transparent",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
          </form>

          {focused && discoveryItems.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                width: 440,
                backgroundColor: "#ffffff",
                border: "1.5px solid #0d0e11",
                borderRadius: 16,
                boxShadow: "0 16px 36px rgba(13,14,17,0.14)",
                padding: 8,
                zIndex: 80,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 8px 6px",
                  borderBottom: "1px solid #eef0f4",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#6b7079",
                  }}
                >
                  ⚡ DIRECT TOPIC DISCOVERY • CLASS {classLevel} {board}
                </span>
                <span style={{ fontSize: 10, color: "#14532d", fontWeight: 700 }}>
                  1-Click Revise
                </span>
              </div>

              {discoveryItems.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 8px",
                    borderRadius: 10,
                    borderBottom:
                      i < discoveryItems.length - 1
                        ? "1px solid #f5f6f9"
                        : "none",
                  }}
                >
                  <Link
                    href={m.stoneHref}
                    style={{
                      flex: 1,
                      textDecoration: "none",
                      color: "#0d0e11",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        fontSize: 12.5,
                        fontWeight: 700,
                      }}
                    >
                      {m.label}
                    </strong>
                    <span style={{ fontSize: 11, color: "#6b7079" }}>
                      {m.sub}
                    </span>
                  </Link>

                  <Link
                    href={m.reviseHref}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 8,
                      backgroundColor: "#0d0e11",
                      color: "#ffffff",
                      fontSize: 11,
                      fontWeight: 700,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ⚡ Revise →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAIN POINTS 4 & 5: Persistent Class-Level & Board Curriculum Context Bar */}
        {learner && (
          <div
            title="Active Class & Board Syllabus (Remains visible across all revision screens)"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 10,
              backgroundColor: "#e5f9ed",
              border: "1px solid #b7ebc9",
              flexShrink: 0,
            }}
          >
            <select
              aria-label="Select Class Level"
              value={String(classLevel)}
              onChange={(e) => handleGradeChange(e.target.value)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#14532d",
                fontSize: 11.5,
                fontWeight: 800,
                cursor: "pointer",
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="10">Class 10</option>
              <option value="12">Class 12 (Senior)</option>
            </select>
            <span style={{ color: "#14532d", opacity: 0.4 }}>•</span>
            <select
              aria-label="Select Curriculum Board"
              value={board.toUpperCase() === "ICSE" ? "ICSE" : "CBSE"}
              onChange={(e) => handleBoardChange(e.target.value)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#14532d",
                fontSize: 11.5,
                fontWeight: 800,
                cursor: "pointer",
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <option value="CBSE">CBSE (NCERT)</option>
              <option value="ICSE">
                {classLevel >= 11 ? "ISC / ICSE (CISCE)" : "ICSE (CISCE)"}
              </option>
            </select>
          </div>
        )}
      </div>

      {/* Right: Figma Navigation Buttons + Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link
          href="/saa-boo-three"
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            color: pathname === "/saa-boo-three" ? "#111" : "#555861",
            backgroundColor:
              pathname === "/saa-boo-three" ? "#f1f3f7" : "transparent",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Saa-Boo-Three
        </Link>

        <Link
          href="/mental-ability"
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            color: pathname === "/mental-ability" ? "#111" : "#555861",
            backgroundColor:
              pathname === "/mental-ability" ? "#f1f3f7" : "transparent",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Mental Ability
        </Link>

        <Link
          href="/ai-screen"
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            color: pathname === "/ai-screen" ? "#111" : "#555861",
            backgroundColor:
              pathname === "/ai-screen" ? "#f1f3f7" : "transparent",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          AI Aunty
        </Link>

        {/* Figma Progress Pill Button */}
        <Link
          href="/progress"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            height: 38,
            padding: "0 16px",
            borderRadius: 10,
            backgroundColor: pathname === "/progress" ? "#dfe7f6" : "#0d0e11",
            color: pathname === "/progress" ? "#111" : "#ffffff",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <span>🗼</span> Progress
        </Link>

        {/* Figma Subjects Pill Button */}
        <Link
          href="/subjects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 38,
            padding: "0 18px",
            borderRadius: 10,
            backgroundColor: pathname?.startsWith("/subjects")
              ? "#dfe7f6"
              : "#0d0e11",
            color: pathname?.startsWith("/subjects") ? "#111" : "#ffffff",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Subjects
        </Link>

        {/* Vertical Divider */}
        <div
          style={{
            width: 1,
            height: 28,
            backgroundColor: "#dcdde2",
            margin: "0 2px",
          }}
        />

        {/* User Profile Link */}
        <Link
          href="/profile"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "#111",
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "2px solid #111",
              display: "grid",
              placeItems: "center",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {(learner?.name || "J").charAt(0).toUpperCase()}
          </span>
          <span>{learner?.name || "Jia Arun"}</span>
          <span style={{ fontSize: 11, color: "#666" }}>⌄</span>
        </Link>
      </div>
    </header>
  );
}
