"use client";

import { useRouter } from "next/navigation";
import FigmaScreen from "@/components/FigmaScreen";
import { useLearning } from "@/components/LearningProvider";

export default function Landing() {
  const router = useRouter();
  const { learner } = useLearning();

  return <FigmaScreen name="landing-page-v2" hotspots={[
    { label: "Open your progress", href: "/progress", x: 48, y: 1.9, width: 16, height: 2.2 },
    { label: "Browse subjects", href: "/subjects", x: 64.7, y: 1.9, width: 13.7, height: 2.2 },
    { label: "Visit Maths House and more", href: "/subjects", x: 7, y: 25.4, width: 51, height: 7.2 },
    { label: "Create free account", href: "/onboarding", x: 13.1, y: 88.8, width: 25.8, height: 3.1 },
    { label: learner ? "Log in and continue" : "Log in", onClick: () => router.push(learner ? "/hub" : "/onboarding"), x: 41.1, y: 88.8, width: 25.8, height: 3.1 }
  ]} />;
}
