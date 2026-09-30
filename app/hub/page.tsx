"use client";

import { useLearning } from "@/components/LearningProvider";
import FigmaScreen from "@/components/FigmaScreen";

export default function Hub() {
  const { learner, ready } = useLearning();
  const name = learner?.name.split(" ")[0] || "friend";

  if (!ready) return <main className="page-loading">Opening your street…</main>;

  return <FigmaScreen name="learners-hub" hotspots={[
    { label: "Open your progress", href: "/progress", x: 50, y: 2, width: 17, height: 7 },
    { label: "Browse subject houses", href: "/subjects", x: 68, y: 2, width: 17, height: 7 },
    { label: "Open Mathematics house", href: "/subjects/mathematics", x: 15, y: 27, width: 19, height: 18 },
    { label: "Open English house", href: "/subjects/english", x: 40, y: 27, width: 19, height: 18 },
    { label: "Open Biology house", href: "/subjects/biology", x: 65, y: 27, width: 19, height: 18 },
    { label: "Let’s Revise!", href: "/saa-boo-three?subject=science&from=%2Fhub", x: 65.6, y: 36.5, width: 29.5, height: 5.8 },
    { label: "Visit all subject houses", href: "/subjects", x: 7, y: 61, width: 25, height: 7 },
    { label: "Ask AI Aunty", href: "/ai-aunty", x: 7, y: 71, width: 25, height: 7 }
  ]}>
    <span className="sr-only">Learner’s Hub for {name}. Choose a house, start revision, view progress, or ask AI Aunty.</span>
  </FigmaScreen>;
}
