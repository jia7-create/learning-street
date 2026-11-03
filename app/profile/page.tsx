"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StreetShell } from "@/components/StreetShell";
import { useLearning } from "@/components/LearningProvider";

export default function ProfilePage() {
  const router = useRouter();
  const { learner, saveLearner, progress, ready } = useLearning();

  const [activeTab, setActiveTab] = useState<
    "personal" | "security" | "notifications" | "subscription"
  >("personal");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [grade, setGrade] = useState("6");
  const [board, setBoard] = useState("CBSE");
  const [publicMastery, setPublicMastery] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (ready && learner) {
      setFullName(learner.name || "");
      setUsername(
        learner.username ||
          `@${(learner.name || "learner").toLowerCase().replace(/\s+/g, "_")}`
      );
      setEmail(
        learner.email ||
          `${(learner.name || "learner").toLowerCase().replace(/\s+/g, ".")}@studystreet.edu`
      );
      setBio(
        learner.bio ||
          "I love learning through games! Currently mastering concepts on Learning Street."
      );
      setGrade(learner.grade || "6");
      setBoard(learner.board || "CBSE");
      setPublicMastery(learner.publicMastery ?? true);
    }
  }, [ready, learner]);

  const level = Math.max(1, Math.floor(progress.xp / 30) + 1);
  const badgesCount = Math.max(1, progress.masteredConcepts.length);

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!learner) return;

    saveLearner({
      ...learner,
      name: fullName.trim() || learner.name,
      grade,
      board,
      username: username.trim(),
      email: email.trim(),
      bio: bio.trim(),
      publicMastery,
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2200);
  }

  return (
    <StreetShell bg="#f9fafc" backHref="/hub" backLabel="Back to Street">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <h1
            style={{
              margin: "0 0 4px",
              fontSize: "clamp(26px, 2.8vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0d0e11",
            }}
          >
            Street Resident Profile
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7079" }}>
            Manage your personal information, preferences, and house settings here on Learning Street.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* Left Card: Resident Identity & Navigation (Matching media_1791819660052_ca2109d5.png) */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 22,
              border: "1px solid #eceef2",
              padding: 22,
              boxShadow: "0 6px 24px rgba(15, 23, 42, 0.03)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: "50%",
                  margin: "0 auto 10px",
                  background: "linear-gradient(135deg, #fde2e6 0%, #e4ebf8 100%)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#0d0e11",
                }}
              >
                {(fullName || "J").charAt(0).toUpperCase()}
              </div>
              <strong style={{ display: "block", fontSize: 18, fontWeight: 700 }}>
                {fullName || "Jia Arun"}
              </strong>
              <span style={{ fontSize: 12, color: "#6b7079" }}>{username}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 14,
                  backgroundColor: "#f3f6ea",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 14 }}>🏆</div>
                <strong style={{ fontSize: 12, color: "#4d5e20" }}>
                  LVL {level}
                </strong>
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 14,
                  backgroundColor: "#eaf3fa",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 14 }}>✪</div>
                <strong style={{ fontSize: 12, color: "#1d5b8c" }}>
                  {badgesCount} BADGES
                </strong>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {(
                [
                  { id: "personal", label: "Personal Info" },
                  { id: "security", label: "Security" },
                  { id: "notifications", label: "Notifications" },
                  { id: "subscription", label: "Subscription" },
                ] as const
              ).map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      borderRadius: 12,
                      border: "none",
                      backgroundColor: active ? "#f497a9" : "transparent",
                      color: active ? "#ffffff" : "#4f535d",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{tab.label}</span>
                    <span>›</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Card: Personal Information Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 22,
                border: "1px solid #eceef2",
                padding: 26,
                boxShadow: "0 6px 24px rgba(15, 23, 42, 0.03)",
              }}
            >
              {activeTab === "personal" ? (
                <form onSubmit={handleSaveProfile}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 18,
                    }}
                  >
                    <div>
                      <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700 }}>
                        Personal Information
                      </h2>
                      <p style={{ margin: 0, fontSize: 12, color: "#6b7079" }}>
                        Update your public profile and neighborhood identity.
                      </p>
                    </div>
                    {savedNotice && (
                      <span
                        style={{
                          padding: "5px 12px",
                          borderRadius: 999,
                          backgroundColor: "#e5f9ed",
                          color: "#14532d",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        ✓ Profile Saved
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 14,
                    }}
                  >
                    <label>
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: 6,
                        }}
                      >
                        Full Name
                      </span>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "1px solid #e2e5ec",
                          fontSize: 13,
                          boxSizing: "border-box",
                        }}
                      />
                    </label>

                    <label>
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: 6,
                        }}
                      >
                        Username
                      </span>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "1px solid #e2e5ec",
                          fontSize: 13,
                          boxSizing: "border-box",
                        }}
                      />
                    </label>

                    <label>
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: 6,
                        }}
                      >
                        Email Address
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "1px solid #e2e5ec",
                          fontSize: 13,
                          boxSizing: "border-box",
                        }}
                      />
                    </label>

                    <label>
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: 6,
                        }}
                      >
                        Class / Grade
                      </span>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "1px solid #e2e5ec",
                          fontSize: 13,
                          backgroundColor: "#fff",
                        }}
                      >
                        <option value="5">Class 5 (Junior Foundations)</option>
                        <option value="6">Class 6 (Middle School)</option>
                        <option value="10">Class 10 (Secondary Board)</option>
                        <option value="12">Class 12 (Senior Secondary)</option>
                      </select>
                    </label>

                    <label>
                      <span
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#333",
                          marginBottom: 6,
                        }}
                      >
                        Board / Curriculum Syllabus
                      </span>
                      <select
                        value={board}
                        onChange={(e) => setBoard(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "1px solid #e2e5ec",
                          fontSize: 13,
                          backgroundColor: "#fff",
                        }}
                      >
                        <option value="CBSE">CBSE (NCERT Aligned)</option>
                        <option value="ICSE">ICSE / ISC (CISCE Aligned)</option>
                      </select>
                    </label>
                  </div>

                  <label style={{ display: "block", marginBottom: 18 }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#333",
                        marginBottom: 6,
                      }}
                    >
                      About Me (Bio)
                    </span>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: "1px solid #e2e5ec",
                        fontSize: 13,
                        boxSizing: "border-box",
                        resize: "none",
                      }}
                    />
                  </label>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 12,
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        padding: "10px 22px",
                        borderRadius: 999,
                        border: "none",
                        backgroundColor: "#f497a9",
                        color: "#ffffff",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>
                    {activeTab === "security"
                      ? "Security & Local Persistence"
                      : activeTab === "notifications"
                        ? "Notification Preferences"
                        : "Resident Pass"}
                  </h2>
                  <p style={{ fontSize: 13, color: "#555861" }}>
                    Your Learning Street progress and houses are automatically saved in your browser.
                  </p>
                </div>
              )}
            </div>

            {/* Public Mastery Profile Toggle Bar */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 18,
                border: "1px solid #eceef2",
                padding: "14px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong style={{ display: "block", fontSize: 13 }}>
                  Public Mastery Profile
                </strong>
                <span style={{ fontSize: 12, color: "#6b7079" }}>
                  Allow other students to see your badges and high scores on the street.
                </span>
              </div>
              <input
                type="checkbox"
                checked={publicMastery}
                onChange={(e) => setPublicMastery(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: "#f497a9" }}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => router.push("/landing")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#d9534f",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                ↪ Sign Out of the Street
              </button>
            </div>
          </div>
        </div>
      </div>
    </StreetShell>
  );
}
