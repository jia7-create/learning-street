"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FigmaScreen from "@/components/FigmaScreen";
import { useLearning } from "@/components/LearningProvider";
import { createStudySession, readStudySession, saveStudySession, selectGameForSession } from "@/lib/study-session";
import { ctaMap } from "@/lib/cta-map";

export default function SaaBooThree() {
  const router = useRouter();
  const { learner, attempts, ready } = useLearning();
  const [studyMode, setStudyMode] = useState<"solo" | "friends">("solo");

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams(window.location.search);
    const subject = params.get("subject") || undefined;
    const concept = params.get("concept") || undefined;
    const previousPath = params.get("from") || "/hub";
    const existing = readStudySession();
    const session = subject ? createStudySession(learner, attempts, subject, concept, previousPath) : existing || createStudySession(learner, attempts);
    if (!existing || subject) saveStudySession(session);
  }, [ready, learner, attempts]);

  function selectGame() {
    const session = readStudySession() || createStudySession(learner, attempts);
    const selected = selectGameForSession(session);
    saveStudySession({ ...selected, studyMode });
    router.push(ctaMap.gameIntro(selected.selectedGame || "catch-catch", selected.subjectSlug, selected.conceptId));
  }

  return <FigmaScreen name="saa-boo-three" hotspots={[
    { label: "Choose to study by myself", onClick: () => setStudyMode("solo"), x: 4.5, y: 18.3, width: 15.5, height: 5.8, pressed: studyMode === "solo" },
    { label: "Choose to study with friends", onClick: () => setStudyMode("friends"), x: 22.2, y: 18.3, width: 22.5, height: 5.8, pressed: studyMode === "friends" },
    { label: "Flip your hand and choose a game", onClick: selectGame, x: 6, y: 79.1, width: 27.5, height: 9.2 }
  ]} />;
}
