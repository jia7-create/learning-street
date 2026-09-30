"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FigmaScreen from "@/components/FigmaScreen";
import { useLearning } from "@/components/LearningProvider";
import { ctaMap } from "@/lib/cta-map";
import { games } from "@/lib/games";
import { readStudySession, saveStudySession, type StudySession } from "@/lib/study-session";
import { selectGameForSession } from "@/lib/study-session";

const instructions: Record<string, string> = {
  "catch-catch": "Catch the correct runner before it runs away.",
  "cops-robbers": "Spot what is wrong before the robber runs away.",
  "hide-seek": "Find the hidden concept that answers the question.",
  king: "Challenge a concept and strengthen your weakest topic.",
  "simon-says": "Follow the steps, but watch out for the fake one!",
  "rock-paper-scissors": "Compare concepts and choose the winning move."
};

export default function GameIntroClient({ game, subject, concept }: { game: string; subject: string; concept: string }) {
  const router = useRouter();
  const { ready } = useLearning();
  const config = games.find(item => item.slug === game) || games[0];

  useEffect(() => {
    if (!ready) return;
    const session = readStudySession();
    if (session && session.selectedGame !== game) saveStudySession({ ...session, selectedGame: game, subjectSlug: subject, conceptId: concept, status: "intro" });
  }, [ready, game, subject, concept]);

  function startGame() {
    const session = readStudySession();
    if (session) saveStudySession({ ...session, selectedGame: game, subjectSlug: subject, conceptId: concept, status: "playing" } satisfies StudySession);
    router.push(ctaMap.startGame(game, subject, concept));
  }

  function chooseDifferentGame() {
    const session = readStudySession();
    if (!session) {
      router.push("/saa-boo-three");
      return;
    }
    const next = selectGameForSession(session);
    saveStudySession(next);
    router.push(ctaMap.gameIntro(next.selectedGame || "catch-catch", next.subjectSlug, next.conceptId));
  }

  const artboardHotspots = [
    { label: "Let’s play", onClick: startGame, x: 6.5, y: 74.5, width: 27.5, height: 9.5 },
    { label: "Flip your hand again to choose a different game", onClick: chooseDifferentGame, x: 36, y: 74.5, width: 27.5, height: 9.5 }
  ];
  return <FigmaScreen name="game-chosen" hotspots={artboardHotspots}>
    <div className="game-intro-copy" aria-live="polite">
      <h1>It’s {config.name}!</h1>
      <p>{instructions[config.slug]}</p>
      <div><span>◴</span> 5 mins <i /> 5 QUESTIONS</div>
    </div>
  </FigmaScreen>;
}
