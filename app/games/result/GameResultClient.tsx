"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLearning } from "@/components/LearningProvider";
import { getSubject } from "@/lib/curriculum";
import { createStudySession, readStudySession, saveStudySession, selectGameForSession } from "@/lib/study-session";
import { games } from "@/lib/games";
import { ctaMap } from "@/lib/cta-map";

export default function GameResultClient({ game, subjectSlug, conceptId, score, total }: { game: string; subjectSlug: string; conceptId: string; score: number; total: number }) {
  const router = useRouter();
  const { learner, attempts } = useLearning();
  const subject = getSubject(subjectSlug);
  const concept = subject?.concepts.find(item => item.id === conceptId);
  const gameName = games.find(item => item.slug === game)?.name || "your game";

  useEffect(() => {
    const session = readStudySession();
    if (session) saveStudySession({ ...session, status: "complete" });
  }, []);

  function continueStudying() {
    const session = selectGameForSession(createStudySession(learner, attempts));
    saveStudySession(session);
    router.push(ctaMap.gameIntro(session.selectedGame || "catch-catch", session.subjectSlug, session.conceptId));
  }

  function playAgain() {
    const session = readStudySession();
    if (session) saveStudySession({ ...session, status: "playing" });
    router.push(ctaMap.startGame(game, subjectSlug, conceptId));
  }

  return <main className="game-result-page">
    <span className="eyebrow">YOUR LEARNING STREET SESSION</span>
    <h1>Lovely work!</h1>
    <p className="result-score">You got <strong>{score} of {total}</strong> right in {gameName}.</p>
    <section className="result-progress"><span className="mint-tag">PROGRESS UPDATED</span><h2>{concept?.title || "Your topic"}</h2><p>{score >= Math.ceil(total / 2) ? "You’ve strengthened this topic with another round of recall." : "You’ve spotted a topic to revisit. Every round helps it get stronger."}</p></section>
    <div className="result-actions"><button className="black-button" onClick={continueStudying}>Continue studying <span>→</span></button><button className="result-secondary" onClick={playAgain}>Play again</button><Link className="result-secondary" href="/hub">Back to Learning Street</Link></div>
  </main>;
}
